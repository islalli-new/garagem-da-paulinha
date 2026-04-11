import type { Metadata, Viewport } from "next"
import { Geist, JetBrains_Mono, Merriweather, Roboto_Slab } from "next/font/google"

import "./globals.css"
import { InstallPromptBanner } from "@/components/shared/organisms/install-prompt-banner"
import { ThemeProvider } from "@/components/theme-provider"
import { metadataBase, siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const robotoSlab = Roboto_Slab({subsets:['latin'],variable:'--font-serif'});

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'})

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: siteConfig.themeColor,
}

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.seoTitle}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: [...siteConfig.keywords],
  category: siteConfig.category,
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.shortName,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.shareTitle,
    description: siteConfig.shareDescription,
    images: [
      {
        url: "/social/share-image-garagem-da-paulinha.webp",
        width: 1536,
        height: 1024,
        alt: siteConfig.shareImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.shareTitle,
    description: siteConfig.shareDescription,
    images: ["/social/share-image-garagem-da-paulinha.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  other: {
    "msapplication-TileColor": siteConfig.themeColor,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        jetbrainsMono.variable,
        "font-serif",
        robotoSlab.variable,
        merriweatherHeading.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <InstallPromptBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
