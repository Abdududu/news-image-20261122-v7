# The World in One Day — Sunday 22 November 2026

[![news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/Abdududu/news-image-20261122-v7/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/Abdududu/news-image-20261122-v7/reward.svg)](https://make.fun/bounty/news-image-20261122)

One image that sums up Sunday 22 November 2026: **35 stories from 7 regions**,
built as a clean illustrated digest — 3 big hero stories, 10 illustrated cards,
2 mini charts, and the rest of the day in a tight region-by-region list.

## The day in three headlines

- **COP31 collapses in Antalya.** After a record two days of overtime, the EU
  and allies refused a draft that never once mentioned fossil fuels. President
  Murat Kurum: "I understand that there is no agreement on this text."
- **Iran strikes US bases in Bahrain.** The IRGC says it hit two Patriot
  radars at Al-Riffa and Awali; Bahrain says a civilian industrial site was
  hit and two people were injured.
- **Peru counts the cost of a 6.7 quake.** One dead, 16 injured and 853 people
  displaced near Junín in the Andes.

## What's inside

- 35 stories, 7 regions: Europe 6 · Asia 6 · Middle East 5 · Africa 2 ·
  Americas 10 · Oceania 2 · Global 4
- 3 hero cards + 10 illustrated cards, all drawn as original SVG art
- 2 mini charts: Bitcoin's wild weekend ($59.0k → $55.1k → $60.8k) and the
  week's market rout (Nasdaq −10.0%, S&P 500 −8.6%, gold −8.9%)
- Sources: Reuters, AP, AFP, USGS, IMD, Cricinfo

## Build

```sh
npm install          # dev-only: playwright-core for the render step
npm run render       # renders assets/news.png (1024×1024) from assets/page.html
node main.ts         # validates the image and writes out/entry.png + out/manifest.json
```

`main.ts` uses only Node builtins. It checks the PNG signature, the 1 MiB size
limit and the 1024×1024 dimensions, then copies the image to
`$MAKEFUN_OUTPUT_DIR/entry.png` (or `out/` by default) and writes
`manifest.json` next to it.

## Bounty

[Sum up 22 November's world news in one image](https://make.fun/bounty/news-image-20261122)
— $100, 50 places paid. Entry by [@abdududu](https://github.com/Abdududu).
