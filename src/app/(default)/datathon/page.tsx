import { EventPage } from "@/components/event-page";
import { metadata as makeMetadata } from "@/lib/metadata";

export const metadata = makeMetadata("en", "datathon");
export default function Page() { return <EventPage locale="en" />; }
