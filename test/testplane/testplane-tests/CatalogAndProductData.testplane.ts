import { bug_id } from "./bug_id";

it("При выборе в каталоге нужный товар, мы перейдем на страницу с этими же данными", async ({
  browser,
}) => {
  await browser.url(
    "http://localhost:3000/hw/store/catalog" +
      (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const application = await browser.$(".Application");

  await application.waitForDisplayed();
  const cards = await browser.$$(".card-body");

  const name = await cards[1].$(".ProductItem-Name");
  const nameText = await name.getText();
  const price = await cards[1].$(".ProductItem-Price");
  const priceText = await price.getText();
  const link = await cards[1].$(".ProductItem-DetailsLink");

  await link.waitForClickable();
  await link.click();

  const product = await browser.$(".Product");
  await product.waitForDisplayed();

  expect(await product.getText()).toContain(nameText);
  expect(await product.getText()).toContain(priceText);
});
