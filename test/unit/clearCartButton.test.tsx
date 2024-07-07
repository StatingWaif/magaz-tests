import React from "react";
import { Application } from "../../src/client/Application";
import { it, expect, jest } from "@jest/globals";
import { act, render, screen, waitFor } from "@testing-library/react";
import { initStore } from "../../src/client/store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { CartItem, CartState, ProductShortInfo } from "../../src/common/types";
import axios, { AxiosResponse } from "axios";
import { getMockStore } from "./getMockStore";
jest.mock("axios");

it("Кнопка очистки корзины работает", async () => {
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
  const { store, api, cart } = getMockStore(mockData, "getProducts", data);

  const application = (
    <MemoryRouter initialEntries={["/cart"]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { container, getByRole } = render(application);
  expect(Object.keys(cart.getState()).length).toBeGreaterThan(0);
  const button = getByRole("button", { name: "Clear shopping cart" });
  act(() => button.click());
  expect(Object.keys(cart.getState()).length).not.toBeGreaterThan(0);
});
