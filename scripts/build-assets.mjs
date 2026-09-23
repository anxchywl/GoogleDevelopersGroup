import { readFile, writeFile, copyFile } from "node:fs/promises";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";
import { event, jams } from "../src/content/event.ts";
import { copy } from "../src/content/copy.ts";

const font = await readFile("src/assets/fonts/noto-sans-semibold.ttf");
// satori has no SVG renderer, so the chapter mark is rasterised first and embedded
const mark = await sharp(await readFile("public/mark.svg"), { density: 600 }).resize({ width: 520 }).png().toBuffer();
const markUri = `data:image/png;base64,${mark.toString("base64")}`;

const card = (title, tagline) => h("div", { style: { display:"flex", flexDirection:"column", justifyContent:"space-between", width:"100%", height:"100%", padding:"58px 72px", background:"#fafafa", color:"#1c1f23", fontFamily:"Noto Sans" } },
  h("div", { style:{ display:"flex", justifyContent:"space-between", fontSize:18, letterSpacing:1 } },
    h("span", null, copy.en.byline),
    h("span", { style:{ color:"#1967d2" } }, event.location.toUpperCase())),
  h("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:48 } },
    h("div", { style:{ display:"flex", flexDirection:"column", gap:18 } },
      h("div", { style:{ fontSize:88, fontWeight:600, letterSpacing:-5 } }, title),
      h("div", { style:{ fontSize:30, color:"#174ea6" } }, tagline)),
    h("img", { src:markUri, width:260, height:144 })),
  h("div", { style:{ display:"flex", fontSize:19, color:"#5b6169", borderTop:"1px solid #e0e3e8", paddingTop:24 } }, event.organizer),
);
const shareCards = [["public/og.png", event.name, event.tagline], ["public/og-jams.png", jams.name, copy.en.jams.tagline]];
for (const [file, title, tagline] of shareCards) {
  const response = new ImageResponse(card(title, tagline), { width:1200, height:630, fonts:[{ name:"Noto Sans", data:font, weight:600, style:"normal" }] });
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
}
await sharp("public/icon.svg", { density: 600 }).resize(180, 180).png().toFile("public/apple-icon.png");
await copyFile("LICENSE", "public/LICENSE.txt");
