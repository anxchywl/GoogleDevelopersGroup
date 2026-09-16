import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const headers = JSON.parse(await readFile("security/headers.json", "utf8"));
const types = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".json":"application/json", ".txt":"text/plain; charset=utf-8", ".svg":"image/svg+xml", ".png":"image/png", ".webp":"image/webp", ".woff2":"font/woff2", ".ttf":"font/ttf", ".ico":"image/x-icon" };
createServer(async (request, response) => {
  for (const [key, value] of Object.entries(headers)) response.setHeader(key, value);
  response.setHeader("Cache-Control", "no-cache");
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname.includes("\0") || pathname.split("/").some(part => part.startsWith("."))) throw new Error("Invalid path");
    let file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) throw new Error("Invalid path");
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const data = await readFile(file);
    response.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
    if (pathname.startsWith("/_next/static/")) response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    response.writeHead(200);
    response.end(request.method === "HEAD" ? undefined : data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : await readFile(path.join(root,"404.html")));
  }
}).listen(Number(process.env.PORT || 3000), "127.0.0.1", () => console.log("Preview: http://127.0.0.1:" + (process.env.PORT || 3000)));

