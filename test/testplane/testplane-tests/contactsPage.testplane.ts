import { bug_id } from "./bug_id";

it("Cтраница Contacts правильно отрисована(скриншот)", async ({ browser }) => {
  await browser.url(
    "http://localhost:3000/hw/store/contacts" +
      (bug_id ? `?bug_id=${bug_id}` : "")
  );

  const application = await browser.$(".Application");

  await application.waitForDisplayed();

  await application.assertView("plain", { ignoreDiffPixelCount: "0.1%" });
});
