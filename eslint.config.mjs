import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "security/**", "tmp/**", "next-env.d.ts", "test-results/**", "playwright-report/**"]),
  // static export has no runtime image optimizer, so photos ship as pre-sized local srcsets
  { rules: { "@next/next/no-img-element": "off" } },
]);
