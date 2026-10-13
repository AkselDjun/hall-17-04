import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { meta, siteUrl } from "@/content/site";

const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "./" },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: "./",
    siteName: "HALL 17.04",
    title: meta.title,
    description: meta.description,
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: "HALL 17.04 — В главной роли — вы." }],
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["og.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
