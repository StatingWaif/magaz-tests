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

it("Contacts имеет верный контент", async () => {
  const { store } = getMockStore();

  const application = (
    <MemoryRouter initialEntries={["/contacts"]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { container } = render(application);

  expect(container.outerHTML).toContain(
    `<div class="Contacts"><div class="row"><div class="col"><h1>Contacts</h1><p>Have a question about our scratchers or need help placing an order? Don't hesitate to reach out to us! Our dedicated team is here to provide you with top-notch service and support.</p><p>Our friendly representatives are available during business hours to assist you with any inquiries you may have.</p><p>At our store, customer satisfaction is our priority, and we're committed to ensuring you have a smooth and enjoyable shopping experience. Reach out to us today – we're here to help make your cat's scratching dreams a reality!</p></div></div></div>`
  );
});
