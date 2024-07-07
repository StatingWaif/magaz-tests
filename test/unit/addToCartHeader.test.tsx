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

it("При добавлении в корзину в header появляется 1 в количестве", async () => {
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
  const { store, api, cart } = getMockStore(mockData, "getProductById");

  const application = (
    <MemoryRouter initialEntries={[`/catalog/${mockData.data.id}`]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { container, getByRole } = render(application);
  await waitFor(() => {
    expect(api.getProductById).toHaveBeenCalledTimes(1);
  });

  const product = container?.querySelector(".Product");

  const button = product?.querySelector("button");
  const cartLink = getByRole("link", { name: "Cart" });
  expect(cartLink.textContent).toBe("Cart");

  act(() => button?.click());
  expect(cartLink.textContent).toBe("Cart (1)");
  act(() => button?.click());
  expect(cartLink.textContent).toBe("Cart (1)");
});
