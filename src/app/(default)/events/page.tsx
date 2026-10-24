import { EventsHub } from "@/components/events-hub";
import { metadata as makeMetadata } from "@/lib/metadata";

export const metadata = makeMetadata("en", "events");
export default function Page() { return <EventsHub locale="en" />; }
