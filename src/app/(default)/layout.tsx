import type { ReactNode } from "react";
import { Document } from "@/components/layout/document";
import { metadata as makeMetadata } from "@/lib/metadata";
export const metadata = makeMetadata("en");
export default function Layout({ children }: { children: ReactNode }) { return <Document locale="en">{children}</Document>; }

