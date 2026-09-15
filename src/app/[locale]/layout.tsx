import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Document } from "@/components/layout/document";
import { metadata } from "@/lib/metadata";

type Params = Promise<{ locale: string }>;
export function generateStaticParams() { return [{ locale: "kk" }, { locale: "ru" }]; }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return metadata(locale);
}
export default async function Layout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return <Document locale={locale}>{children}</Document>;
}

