const fallbackSiteUrl = "http://localhost:3000"

function parseSiteUrl(value?: string) {
  try {
    return new URL(value?.trim() || fallbackSiteUrl)
  } catch {
    return new URL(fallbackSiteUrl)
  }
}

export const metadataBase = parseSiteUrl(process.env.NEXT_PUBLIC_APP_URL)

export const siteConfig = {
  name: "Garagem da Paulinha",
  shortName: "Garagem",
  seoTitle: "Garagem da Paulinha CRM",
  shareTitle: "Garagem da Paulinha | CRM automotivo para vendedores de carro",
  description:
    "CRM automotivo da Garagem da Paulinha para vendedores de carro acompanharem portfolio, contatos e negociacoes em uma experiencia instalavel, rapida e pronta para evoluir.",
  shareDescription:
    "Organize portfolio, contatos e negociacoes em um CRM automotivo pensado para vendedores de carro, com experiencia instalavel e estrutura pronta para crescer.",
  locale: "pt-BR",
  themeColor: "#9f275f",
  backgroundColor: "#ffffff",
  category: "business",
  keywords: [
    "garagem da paulinha",
    "crm automotivo",
    "vendedores de carro",
    "portfolio de veiculos",
    "negociacoes",
    "contatos comerciais",
    "gestao de vendas",
    "pwa",
  ],
  shareImageAlt:
    "Cartao de compartilhamento da Garagem da Paulinha com posicionamento de CRM automotivo para vendedores de carro.",
} as const
