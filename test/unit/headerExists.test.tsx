import React from "react";
import { Application } from "../../src/client/Application";
import { it, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { initStore } from "../../src/client/store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { getMockStore } from "./getMockStore";

it("В Header есть все нужные ссылки", async () => {
  const { store } = getMockStore();

  const application = (
    <MemoryRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { getByRole } = render(application);
  const mainLink = getByRole("link", { name: "Kogtetochka store" });
  const catalogLink = getByRole("link", { name: "Catalog" });
  const deliveryLink = getByRole("link", { name: "Delivery" });
  const contactsLink = getByRole("link", { name: "Contacts" });
  const cartLink = getByRole("link", { name: "Cart" });

  expect(mainLink).toHaveAttribute("href", "/");
  expect(catalogLink).toHaveAttribute("href", "/catalog");
  expect(deliveryLink).toHaveAttribute("href", "/delivery");
  expect(contactsLink).toHaveAttribute("href", "/contacts");
  expect(cartLink).toHaveAttribute("href", "/cart");
});
