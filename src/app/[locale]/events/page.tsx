import { notFound } from "next/navigation";
import { EventsHub } from "@/components/events-hub";
import { metadata } from "@/lib/metadata";
import type { Locale } from "@/content/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return metadata(locale, "events");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return <EventsHub locale={locale as Locale} />;
}
