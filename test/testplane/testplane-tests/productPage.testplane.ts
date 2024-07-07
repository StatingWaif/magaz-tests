import { bug_id } from "./bug_id";

it("Страница товара показывает данные(скриншот)", async ({ browser }) => {
  await browser.url(
    "http://localhost:3000/hw/store/catalog/0" +
      (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const application = await browser.$(".Application");

  await application.waitForDisplayed();

  await application.assertView("plain", {
    ignoreElements: [
      ".ProductDetails-Name",
      ".ProductDetails-Price",
      ".ProductDetails-Description",
      ".ProductDetails-Color",
      ".ProductDetails-Material",
    ],
    ignoreDiffPixelCount: "0.1%",
  });
});
