import type { MetadataRoute } from "next";
import { meta } from "@/content/site";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HALL 17.04 — банкетный зал в Барановичах",
    short_name: "HALL 17.04",
    description: meta.description,
    lang: "ru",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "browser",
    background_color: "#0b0b0a",
    theme_color: "#0b0b0a",
    icons: [
      { src: `${base}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${base}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}
