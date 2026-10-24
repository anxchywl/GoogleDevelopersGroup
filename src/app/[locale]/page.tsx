import { notFound } from "next/navigation";
import { EventsHub } from "@/components/events-hub";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return <EventsHub locale={locale} />;
}

