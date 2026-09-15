import localFont from "next/font/local";
import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import "@/app/globals.css";

const bodyFont = localFont({ src: [{path:"../../assets/fonts/noto-sans-regular.ttf",weight:"400",style:"normal"},{path:"../../assets/fonts/noto-sans-semibold.ttf",weight:"600",style:"normal"}], variable: "--font-body", display: "swap" });
export function Document({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <html lang={locale} className={bodyFont.variable}><body>{children}</body></html>;
}

