"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

const DISMISS_KEY = "garagem-da-paulinha:pwa-banner-dismissed"

function isStandaloneMode() {
  if (typeof window === "undefined") {
    return false
  }

  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean }

  return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true
}

export function InstallPromptBanner() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode())

  useEffect(() => {
    if (window.localStorage.getItem(DISMISS_KEY) === "true") {
      return
    }

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault()

      if (isStandaloneMode()) {
        return
      }

      setInstallEvent(event as BeforeInstallPromptEvent)
      setIsVisible(true)
    }

    function handleInstalled() {
      setIsInstalled(true)
      setIsVisible(false)
      setInstallEvent(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleInstalled)
    }
  }, [])

  async function handleInstall() {
    if (!installEvent) {
      return
    }

    await installEvent.prompt()
    const choice = await installEvent.userChoice

    if (choice.outcome === "accepted") {
      setIsVisible(false)
      setInstallEvent(null)
      return
    }

    dismissBanner()
  }

  function dismissBanner() {
    window.localStorage.setItem(DISMISS_KEY, "true")
    setIsVisible(false)
  }

  if (!isVisible || isInstalled) {
    return null
  }

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Instalar webapp</p>
          <p className="mt-1 text-sm text-foreground">
            Adicione a Garagem da Paulinha a tela inicial para abrir mais rapido e usar a experiencia de app.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={dismissBanner}>
            Agora nao
          </Button>
          <Button onClick={handleInstall}>Instalar</Button>
        </div>
      </div>
    </div>
  )
}