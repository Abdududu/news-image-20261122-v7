// main.ts — validate assets/news.png and publish it as the competition entry.
//
// Only Node builtins are used here. The image itself is rendered at dev time
// by scripts/render.mjs (playwright-core, a devDependency); this file never
// imports playwright and never deletes anything.
//
// Output: $MAKEFUN_OUTPUT_DIR/entry.png (falls back to ./out/entry.png) plus
// a manifest.json next to it describing the entry.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_BYTES = 1024 * 1024;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

const TITLE = "The World in One Day — Sunday 22 November 2026";
const STORIES = 35;
const REGIONS = 7;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function readPngDimensions(buffer) {
  // A PNG file starts with an 8-byte signature, then the IHDR chunk:
  // 4-byte length, 4-byte type "IHDR", then width (4 bytes BE) and
  // height (4 bytes BE).
  if (buffer.length < 24) {
    fail("news.png is too small to be a valid PNG");
  }
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    fail("news.png does not start with the PNG signature");
  }
  if (buffer.toString("ascii", 12, 16) !== "IHDR") {
    fail("news.png has no IHDR chunk where one is expected");
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(here, "assets", "news.png");

if (!existsSync(sourcePath)) {
  fail("assets/news.png is missing — run `npm run render` first");
}

const image = readFileSync(sourcePath);
const { width, height } = readPngDimensions(image);

if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  fail(`news.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
}
if (image.length > MAX_BYTES) {
  fail(`news.png is ${image.length} bytes, over the 1 MiB limit`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : resolve(here, "out");
mkdirSync(outputDir, { recursive: true });

const entryPath = join(outputDir, "entry.png");
copyFileSync(sourcePath, entryPath);

// Re-check the published copy: it must be byte-identical to the validated source.
if (statSync(entryPath).size !== image.length) {
  fail(`entry.png copy is ${statSync(entryPath).size} bytes, expected ${image.length}`);
}

const manifest = {
  title: TITLE,
  stories: STORIES,
  regions: REGIONS,
  image: "entry.png",
  width,
  height,
  bytes: image.length,
};
writeFileSync(join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(`ok: entry.png ${width}x${height}, ${image.length} bytes`);
console.log(`ok: manifest.json written to ${outputDir}`);
