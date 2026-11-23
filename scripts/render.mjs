// scripts/render.mjs — dev-time renderer (not part of the entry runtime).
// Opens assets/page.html in headless Chromium via playwright-core and
// screenshots it at exactly 1024x1024 into assets/news.png.
//
// Run: npm run render
// Requires: playwright-core (devDependency) + a Chromium build in the
// Playwright browser cache, or CHROMIUM_PATH pointing at a chrome binary.

import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const pagePath = resolve(root, "assets", "page.html");
const outPath = resolve(root, "assets", "news.png");

const launchOptions = { headless: true };
const chromiumPath = process.env.CHROMIUM_PATH;
if (chromiumPath && existsSync(chromiumPath)) {
  launchOptions.executablePath = chromiumPath;
}

const browser = await chromium.launch(launchOptions);
try {
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${pagePath}`);
  await page.waitForTimeout(400);
  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
  console.log(`ok: rendered ${outPath}`);
} finally {
  await browser.close();
}
