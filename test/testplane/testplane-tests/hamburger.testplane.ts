import { bug_id } from "./bug_id";

it("Гамбургер при клике показывает ссылки(скриншот)", async ({ browser }) => {
  await browser.url(
    "http://localhost:3000/hw/store" + (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const application = await browser.$(".Application");

  const hamburger = await browser.$(".Application-Toggler");

  await application.waitForDisplayed();

  await browser.setWindowSize(575, 1200);

  await hamburger.click();

  // await application.assertView("plain", {threshold: 0.01});
  await application.assertView("plain", { ignoreDiffPixelCount: "0.1%" });
});
