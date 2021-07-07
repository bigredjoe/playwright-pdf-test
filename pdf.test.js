const { test, expect } = require("@playwright/test");
const fs = require("fs");
const extractPDF = require("pdf-extraction");

test.use({ acceptDownloads: true });

test("pdf test", async ({ page }) => {
  await page.goto(
    "https://file-examples.com/index.php/sample-documents-download/sample-pdf-download/"
  );

  const [download] = await Promise.all([
    page.waitForEvent("download"), // wait for download to start
    page.click("text=Download sample pdf file"),
  ]);

  let dataBuffer = fs.readFileSync(await download.path());

  let pdf = await extractPDF(dataBuffer);

  expect(pdf.text).toContain("Lorem ipsum");
});
