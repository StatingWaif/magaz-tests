import { bug_id } from "./bug_id";

it("Окошко о заказе появляется после нажатия кнопки Checkout(скриншот)", async ({
  browser,
}) => {
  await browser.url(
    "http://localhost:3000/hw/store/catalog/0" +
      (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
  await addToCartBtn.waitForClickable();
  await addToCartBtn.click();

  await browser.url(
    "http://localhost:3000/hw/store/cart" + (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const application = await browser.$(".Application");

  const inputName = await browser.$("#f-name");
  const phoneName = await browser.$("#f-phone");
  const textareaAddress = await browser.$("#f-address");

  await inputName.setValue("test");
  await phoneName.setValue("12345678900");
  await textareaAddress.setValue("test");

  const checkoutBtn = await browser.$(".Form-Submit");
  await checkoutBtn.waitForClickable();
  await checkoutBtn.click();

  await application.waitForDisplayed();

  const cartNumber = await browser.$(".Cart-Number");

  // await browser.execute((element: HTMLElement) => {
  //   element.innerText = "1";
  // }, cartNumber as any);
  await application.assertView("plain", {
    ignoreElements: ".Cart-Number",
    ignoreDiffPixelCount: "0.1%",
  });
});
