import React, { act } from "react";
import { Application } from "../../src/client/Application";
import { it, expect, jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import { initStore } from "../../src/client/store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import events from "@testing-library/user-event";
import {
  CartItem,
  CartState,
  CheckoutResponse,
  ProductShortInfo,
} from "../../src/common/types";
import axios, { AxiosResponse } from "axios";
import { getMockStore } from "./getMockStore";
jest.mock("axios");

it("При нажатии на Checkout происходит заказ", async () => {
  const mockData: any = {
    data: [
      {
        name: "mock name",
        price: 100,
        count: 1,
      },
      {
        name: "mock name 2",
        price: 200,
        count: 2,
      },
      {
        name: "mock name 3",
        price: 300,
        count: 4,
      },
    ],
  };
  const data: { [key: number]: CartItem } = {
    0: mockData.data[0],
    1: mockData.data[1],
    2: mockData.data[2],
  };
  const basename = "/";

  let myLocalStorage = new Map();
  const LOCAL_STORAGE_CART_KEY = "example-store-cart";

  class CartApiMock {
    getState(): CartState {
      try {
        const json = myLocalStorage.get(LOCAL_STORAGE_CART_KEY);
        return (JSON.parse(json) as CartState) || {};
      } catch {
        return {};
      }
    }

    setState(cart: CartState) {
      myLocalStorage.set(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }
  }
  const api = new ExampleApi(basename);
  const mockResponse: any = { data: { id: 1 } };

  const mockMethod = jest
    .fn<() => Promise<AxiosResponse<CheckoutResponse, any>>>()
    .mockResolvedValue(mockResponse);

  api.checkout = mockMethod;

  const cart = new CartApiMock();
  cart.setState(data);
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={["/cart"]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { container, getByRole } = render(application);

  const nameInput = container.querySelector("#f-name") as Element;
  const phoneInput = container.querySelector("#f-phone") as Element;
  const addressTextarea = container.querySelector("#f-address") as Element;

  const checkoutButton = getByRole("button", { name: "Checkout" });

  await act(async () => {
    await events.type(nameInput, "testName");
    await events.type(phoneInput, "81234567890");
    await events.type(addressTextarea, "testName");
    checkoutButton.click();
  });

  const confirmWindow = container.querySelector(".Cart-SuccessMessage");
  expect(confirmWindow).toBeInTheDocument();
});
