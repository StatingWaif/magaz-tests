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

it("Main page имеет верный контент", async () => {
  const { store } = getMockStore();

  const application = (
    <MemoryRouter initialEntries={["/"]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const { container } = render(application);

  expect(container.outerHTML).toContain(
    `<div class="Home"><div class="row"><div class="col bg-orange text-white py-4 bg-opacity-75"><p class="display-3">Welcome to Kogtetochka store!</p><p class="lead">We have a large assortment of scratching posts!</p></div></div><div class="row mb-4"><div class="col-12 col-md-4 bg-light py-3"><h1>Stability</h1><p class="lead">Our scratching posts are crafted with precision and designed for unparalleled stability. Made from high-quality materials, they provide a sturdy platform for your cat's scratching needs.</p></div><div class="col-12 col-md-4 bg-light py-3"><h1>Comfort</h1><p class="lead">Pamper your feline friend with the luxurious comfort of our scratching posts. Covered in soft, plush fabric, they offer a cozy retreat for your cat to relax and unwind.</p></div><div class="col-12 col-md-4 bg-light py-3"><h1>Design</h1><p class="lead">Engage your cat's natural instincts and keep them entertained for hours with our interactive scratching posts. Featuring built-in toys and enticing textures, they stimulate your cat's senses and encourage active play.</p></div></div><div class="row mb-4"><div class="col-12py-3"><p class="fs-1">Empower Your Coding Journey with Every Scratch – Get Your Paws on Our Purr-fect Scratchers Today!</p></div></div></div>`
  );
});
