import { bug_id } from "./bug_id";

it("Главная страница правильно отрисована для мобилок(скриншот)", async ({
  browser,
}) => {
  await browser.url(
    "http://localhost:3000/hw/store" + (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const application = await browser.$(".Application");

  await application.waitForDisplayed();

  await browser.setWindowSize(575, 1200);

  await application.assertView("plain", { ignoreDiffPixelCount: "0.1%" });
});
