"use client"

import type { ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { UniversalSearch } from "@/components/shared/organisms/universal-search"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SearchProvider } from "@/hooks/use-search"
import { mockUniversalSearchItems } from "@/src/mocks/universal-search"

interface CrmShellProps {
  children: ReactNode
}

export function CrmShell({ children }: CrmShellProps) {
  return (
    <TooltipProvider>
      <SearchProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,_var(--primary)_10%,_transparent),_transparent_38%),linear-gradient(180deg,_color-mix(in_oklab,_var(--background)_96%,_black_4%),_var(--background))] px-4 py-4 sm:px-6 sm:py-6">
              {children}
            </div>
          </SidebarInset>
          <UniversalSearch items={mockUniversalSearchItems} />
          </SidebarProvider>
      </SearchProvider>
    </TooltipProvider>
  )
}