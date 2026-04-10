import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Garagem da Paulinha",
    short_name: "Garagem",
    description: "PWA da Garagem da Paulinha para gestao e operacao diaria do negocio.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2ea",
    theme_color: "#8f1d1d",
    orientation: "portrait",
    categories: ["business", "productivity"],
    lang: "pt-BR",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  }
}