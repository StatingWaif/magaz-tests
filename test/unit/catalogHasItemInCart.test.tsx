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
import {
  CartItem,
  CartState,
  Product,
  ProductShortInfo,
} from "../../src/common/types";
import axios, { AxiosResponse } from "axios";
import { getMockStore } from "./getMockStore";
jest.mock("axios");

it("В каталоге есть пометки Item in cart", async () => {
  const mockData: any = {
    data: [
      {
        id: 0,
        name: "mock name",
        price: 100,
      },
      {
        id: 1,
        name: "mock name 2",
        price: 200,
      },
      {
        id: 2,
        name: "mock name 3",
        price: 300,
      },
      {
        id: 3,
        name: "mock name 4",
        price: 500,
      },
    ],
  };
  const basename = "/";

  let myLocalStorage = new Map();
  const LOCAL_STORAGE_CART_KEY = "example-store-cart";

  const mockMethod = jest
    .fn<() => Promise<AxiosResponse<ProductShortInfo[], any>>>()
    .mockResolvedValue(mockData);

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
  api.getProducts = mockMethod;

  const cart = new CartApiMock();
  const localStorageState: { [key: number]: CartItem } = {
    0: { name: mockData.data[0].name, count: 2, price: mockData.data[0].price },
    1: { name: mockData.data[1].name, count: 3, price: mockData.data[1].price },
  };
  cart.setState(localStorageState);
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={[`/catalog`]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  let { container, queryByText } = render(application);
  await waitFor(() => {
    expect(api.getProducts).toHaveBeenCalledTimes(1);
  });

  const cards = container.querySelectorAll(
    `div[data-testid][class~="ProductItem"]`
  );

  cards.forEach((card, index) => {
    const id = card.getAttribute("data-testid");
    if (localStorageState[Number(id)]) {
      expect(card).toHaveTextContent("Item in cart");
    } else {
      expect(card).not.toHaveTextContent("Item in cart");
    }
  });
});
