import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#141414",
    theme_color: "#141414",
    lang: "pt-BR",
    icons: [
      { src: "/assets/logo/favicon/mb-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/logo/favicon/mb-512.png", sizes: "512x512", type: "image/png" },
      { src: "/assets/logo/favicon/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
