import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const hashes = new Set();
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await inspect(file);
    else if (entry.name.endsWith(".html")) {
      const html = await readFile(file, "utf8");
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (!/\bsrc\s*=/.test(match[1]) && match[2]) hashes.add("'sha256-" + createHash("sha256").update(match[2]).digest("base64") + "'");
      }
    }
  }
}
await inspect("out");
if (!hashes.size) throw new Error("No exported script hashes found");
const csp = [
  "default-src 'self'", "script-src 'self' " + [...hashes].sort().join(" "),
  "style-src 'self' 'unsafe-inline'", "img-src 'self' data:", "font-src 'self'",
  "connect-src 'self'", "object-src 'none'", "base-uri 'none'",
  "frame-src 'none'", "frame-ancestors 'none'", "form-action 'none'",
].join("; ");
const headers = {
  "Content-Security-Policy": csp,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};
await mkdir("security", { recursive: true });
await writeFile("security/headers.json", JSON.stringify(headers, null, 2) + "\n");
await writeFile("security/headers.caddy", "header {\n" + Object.entries(headers).map(([key, value]) => "  " + key + ' "' + value + '"').join("\n") + "\n  -Server\n}\n");
console.log("Generated CSP for " + hashes.size + " inline scripts");

