import { chromium } from "playwright";

export async function scrapeURL(url: string): Promise<string> {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // console.log(page);

  await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 20000,
  });

  const html = await page.content();
  await browser.close();

  return html;
}
