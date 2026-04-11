"use client"

import { Button } from "@/components/ui/button"
import { useInstallPrompt } from "@/hooks/use-install-prompt"

export function InstallPromptBanner() {
  const { isVisible, install, dismiss } = useInstallPrompt()

  if (!isVisible) {
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
          <Button variant="outline" onClick={dismiss}>
            Agora nao
          </Button>
          <Button onClick={install}>Instalar</Button>
        </div>
      </div>
    </div>
  )
}