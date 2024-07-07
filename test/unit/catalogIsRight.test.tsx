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
import { CartState, ProductShortInfo } from "../../src/common/types";
import axios, { AxiosResponse } from "axios";
import { getMockStore } from "./getMockStore";
jest.mock("axios");

it("Catalog имеет верный контент", async () => {
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
    ],
  };

  const { store, api, cart } = getMockStore(mockData, "getProducts");

  const application = (
    <MemoryRouter initialEntries={["/catalog"]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { container } = render(application);
  await waitFor(() => {
    expect(api.getProducts).toHaveBeenCalledTimes(1);
  });

  const cards = container.querySelectorAll(".card-body");
  expect(cards.length).toBe(mockData.data.length);

  mockData.data.forEach((item: ProductShortInfo, index: number) => {
    const card = cards[index];
    expect(card).toHaveTextContent(item.name);
    expect(card).toHaveTextContent(item.price.toString());

    const link = card.querySelector("a");
    expect(link).toHaveAttribute("href", `/catalog/${item.id}`);
  });
});
