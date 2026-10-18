import type { Metadata } from "next";

const ogImage = { url: "og.jpg", width: 1200, height: 630, alt: "Банкетный зал HALL 17.04 в Барановичах" };

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: "./" },
    openGraph: { type: "website", locale: "ru_BY", siteName: "HALL 17.04", url: "./", title, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
