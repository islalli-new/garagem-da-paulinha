import type { Metadata } from "next"
import { Geist, JetBrains_Mono, Montserrat } from "next/font/google"

import "./globals.css"
import { FirebaseAnalytics } from "@/components/shared/organisms/firebase-analytics"
import { InstallPromptBanner } from "@/components/shared/organisms/install-prompt-banner"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const montserratHeading = Montserrat({ subsets: ["latin"], variable: "--font-heading" })

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Garagem da Paulinha",
  description: "Plataforma da Garagem da Paulinha para operar, organizar e evoluir o negocio.",
  applicationName: "Garagem da Paulinha",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Garagem da Paulinha",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.svg", type: "image/svg+xml", sizes: "192x192" },
      { url: "/icons/icon-512.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.svg", type: "image/svg+xml", sizes: "180x180" }],
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
        "font-mono",
        jetbrainsMono.variable,
        montserratHeading.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <FirebaseAnalytics />
          <InstallPromptBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
