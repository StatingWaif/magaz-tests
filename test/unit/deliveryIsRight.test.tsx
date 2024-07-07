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

it("Delivery имеет верный контент", async () => {
  const { store } = getMockStore();

  const application = (
    <MemoryRouter initialEntries={["/delivery"]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { container } = render(application);

  expect(container.outerHTML).toContain(
    `<div class="Delivery"><div class="row"><div class="col"><h1>Delivery</h1><p>Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely.</p><img class="Image w-25 mb-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="><p>Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games – know exactly when to expect your package and plan accordingly.</p><p>Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind.</p></div></div></div>`
  );
});
