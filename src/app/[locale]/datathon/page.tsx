import { notFound } from "next/navigation";
import { EventPage } from "@/components/event-page";
import { metadata } from "@/lib/metadata";
import type { Locale } from "@/content/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return metadata(locale, "datathon");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return <EventPage locale={locale as Locale} />;
}
