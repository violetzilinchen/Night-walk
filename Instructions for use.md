# NightWalk‑Night‑Time City

## Opening the web version
After unzipping the ZIP archive, double‑click `NightWalk.html` to open it in Edge, Chrome or another modern web browser. Images and interactive scripts are embedded; the webpage works offline. Use the **中文 / EN** toggle in the top‑right corner to switch languages. Court‑reference hyperlinks within case details require an internet connection.

## Modifying design and content

| File | Purpose |
|---|---|
| `source/index.html` | Page shell and generation template |
| `source/style.css` | Colour palette, typography, card components, layout and mobile‑responsive styling |
| `source/app.js` | Page navigation, story filtering, carousel, check‑in preview and reflection notes |
| `source/map.js` | Schematic routes, observation‑point notes and map interactions |
| `source/content.js` | Bilingual stories, source hyperlinks, glossary terms and experiential snippets |
| `source/assets/` | Image assets used by the webpage |
| `source/build.cjs` | Build script that compiles templates, styles, scripts and assets into a single‑file webpage |

## Rebuilding from source code
If Node.js is installed on your computer, open a terminal inside your extracted `NightWalk` project folder and run:

```sh
node source/build.cjs
```

This script regenerates the output `NightWalk.html` file in the same directory.
Always edit source files under the `source/` folder before rebuilding, to preserve your changes.
The build process only uses Node.js built‑in modules.