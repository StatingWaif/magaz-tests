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
import { CartState, Product, ProductShortInfo } from "../../src/common/types";
import axios, { AxiosResponse } from "axios";
import { getMockStore } from "./getMockStore";
jest.mock("axios");

it("На странице нет надписи Item in cart, если этого предмета нет в корзине", async () => {
  const mockData: any = {
    data: {
      id: 1,
      name: "Unbranded kogtetochka",
      description: "Really Modern kogtetochka for British Shorthair",
      price: 677,
      color: "olive",
      material: "Cotton",
    },
  };
  const basename = "/";

  let myLocalStorage = new Map();
  const LOCAL_STORAGE_CART_KEY = "example-store-cart";

  const mockMethod = jest
    .fn<() => Promise<AxiosResponse<Product, any>>>()
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
  api.getProductById = mockMethod;

  const cart = new CartApiMock();
  cart.setState({ 2: { name: "name", count: 2, price: 54 } });
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={[`/catalog/${mockData.data.id}`]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  let { container, queryByText } = render(application);
  await waitFor(() => {
    expect(api.getProductById).toHaveBeenCalledTimes(1);
  });

  const product = container?.querySelector(".Product");
  const button = product?.querySelector("button");

  expect(queryByText("Item in cart")).not.toBeInTheDocument();
});
