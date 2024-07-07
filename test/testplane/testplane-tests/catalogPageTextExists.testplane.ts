import { bug_id } from "./bug_id";

it("У данных в каталоге есть текст", async ({ browser }) => {
  await browser.url(
    "http://localhost:3000/hw/store/catalog" +
      (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const application = await browser.$(".Application");

  await application.waitForDisplayed();

  const text = await browser.$(".ProductItem-Name");
  const price = await browser.$(".ProductItem-Price");

  await Promise.all([text.waitForDisplayed(), price.waitForDisplayed()]);

  expect(text.getText()).not.toBe("");
  expect(price.getText()).not.toBe("");
});
