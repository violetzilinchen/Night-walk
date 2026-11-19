const fs = require("node:fs");
const path = require("node:path");

const read = (file) => fs.readFileSync(path.join(__dirname, file), "utf8");
const names = {
  hero: "hero", "hero-wide": "hero-wide", "city-wide": "city-wide",
  reflection: "reflection", memorial: "memorial", flowers: "flowers",
  street: "wet-street", unlit: "unlit-road", c3: "c3-street",
  waiting: "waiting", vigilance: "vigilance", "window-scene": "window-scene",
};
const assets = Object.fromEntries(Object.entries(names).map(([name, file]) => [
  name, "data:image/jpeg;base64," + fs.readFileSync(path.join(__dirname, "assets", file + ".jpg")).toString("base64"),
]));
assets["map-preview"] = "data:image/svg+xml;base64," + Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 135"><rect width="540" height="135" fill="#241d34"/><g fill="none" stroke="#5c4a70" stroke-width="1.2" opacity=".9">' +
  Array.from({length:32}, (_,i) => `<path d="M${-60+i*23} -20l60 80 25 76"/>`).join("") +
  Array.from({length:13}, (_,i) => `<path d="M-15 ${i*19-36}Q151 ${i*19+10} 310 ${i*19-35}T553 ${i*19-51}"/>`).join("") +
  '</g><path d="M105 138Q260 47 341 88T542 24" fill="none" stroke="#51425e" stroke-width="14"/><path d="M78 117C190 103 220 113 271 82S351 89 386 46 435 34 495 13" fill="none" stroke="#efa3cf" stroke-width="3.8"/><g fill="#eea0cc"><circle cx="78" cy="117" r="6"/><circle cx="271" cy="82" r="6"/><circle cx="386" cy="46" r="6"/><circle cx="495" cy="13" r="6"/></g></svg>'
).toString("base64");

const js = ["content.js","map.js","app.js"].map(read).join("\n");
const html = read("index.html")
  .replace("<!-- STYLE -->", () => "<style>\n" + read("style.css") + "</style>")
  .replace("<!-- SCRIPT -->", () => "<script>\nconst assets = " + JSON.stringify(assets) + ";\n" + js + "</script>");
const output = path.resolve(__dirname, "../NightWalk.html");
fs.writeFileSync(output, html);
console.log(`${output} (${Buffer.byteLength(html)} bytes)`);
