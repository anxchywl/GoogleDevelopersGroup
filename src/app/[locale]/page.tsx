import { notFound } from "next/navigation";
import { EventPage } from "@/components/event-page";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return <EventPage locale={locale} />;
}

