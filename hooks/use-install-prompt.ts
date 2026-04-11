"use client"

import { useEffect, useState, useCallback } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

const DISMISS_KEY = "garagem-da-paulinha:pwa-banner-dismissed"
const isDev = process.env.NODE_ENV === "development"

function isStandaloneMode() {
  if (typeof window === "undefined") return false
  const nav = window.navigator as Navigator & { standalone?: boolean }
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  )
}

export function useInstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode())

  useEffect(() => {
    if (isStandaloneMode()) {
      setIsInstalled(true)
      return
    }

    if (window.localStorage.getItem(DISMISS_KEY) === "true") return

    // In dev, beforeinstallprompt never fires — show UI anyway for testing
    if (isDev) {
      setIsVisible(true)
      return
    }

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault()
      if (isStandaloneMode()) return
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

  const install = useCallback(async () => {
    if (isDev) {
      console.log("[PWA] Install triggered (dev mode — no real prompt)")
      dismiss()
      return
    }
    if (!installEvent) return
    await installEvent.prompt()
    const choice = await installEvent.userChoice
    if (choice.outcome === "accepted") {
      setIsVisible(false)
      setInstallEvent(null)
      return
    }
    dismiss()
  }, [installEvent])

  const dismiss = useCallback(() => {
    window.localStorage.setItem(DISMISS_KEY, "true")
    setIsVisible(false)
  }, [])

  return {
    isVisible: isVisible && !isInstalled,
    isInstalled,
    install,
    dismiss,
  }
}
