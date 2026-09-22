import { notFound } from "next/navigation";
import { JamsPage } from "@/components/jams-page";
import { metadata } from "@/lib/metadata";

type Params = Promise<{ locale: string }>;
export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return metadata(locale, "jams");
}
export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;
  if (locale !== "kk" && locale !== "ru") notFound();
  return <JamsPage locale={locale} />;
}
