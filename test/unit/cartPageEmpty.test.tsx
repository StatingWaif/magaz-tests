import React from "react";
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

it("Страница товара отрисовывает правильные данные", async () => {
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

  const { container } = render(application);
  await waitFor(() => {
    expect(api.getProductById).toHaveBeenCalledTimes(1);
  });

  const product = container?.querySelector(".Product");

  expect(product).toHaveTextContent(mockData.data.name);
  expect(product).toHaveTextContent(mockData.data.description);
  expect(product).toHaveTextContent(mockData.data.price);
  expect(product).toHaveTextContent(mockData.data.color);
  expect(product).toHaveTextContent(mockData.data.material);
  const button = product?.querySelector("button");
  expect(button?.textContent).toBe("Add to Cart");
});
