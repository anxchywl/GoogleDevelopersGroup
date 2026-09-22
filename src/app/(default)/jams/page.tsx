import { JamsPage } from "@/components/jams-page";
import { metadata as makeMetadata } from "@/lib/metadata";
export const metadata = makeMetadata("en", "jams");
export default function Page() { return <JamsPage locale="en" />; }
