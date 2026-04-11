"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { CrmGarage } from "@/types/crm"

const GARAGE_COLORS = [
  "bg-violet-600",
  "bg-sky-600",
  "bg-amber-600",
  "bg-emerald-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-teal-600",
  "bg-orange-600",
]

function getGarageInitials(label: string) {
  const words = label.replace(/^Garagem\s+(da|do)\s+/i, "").trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return words[0].slice(0, 2).toUpperCase()
}

function getGarageColor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return GARAGE_COLORS[Math.abs(hash) % GARAGE_COLORS.length]
}

function GarageAvatar({ garage, size = "md" }: { garage: CrmGarage; size?: "sm" | "md" }) {
  const initials = getGarageInitials(garage.label)
  const color = getGarageColor(garage.id)
  const sizeClass = size === "md" ? "size-7 min-w-7 min-h-7 text-xs" : "size-6 min-w-6 min-h-6 text-[10px]"

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-sm font-semibold text-white ${color} ${sizeClass}`}
    >
      {initials}
    </div>
  )
}

export function GarageSwitcher({
  garages,
}: {
  garages: CrmGarage[]
}) {
  const { isMobile } = useSidebar()
  const [activeGarage, setActiveGarage] = React.useState(garages[0])

  if (!activeGarage) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:rounded-sm!"
            >
              <GarageAvatar garage={activeGarage} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeGarage.label}</span>
                <span className="truncate text-xs">{activeGarage.description}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Garagens
            </DropdownMenuLabel>
            {garages.map((garage) => (
              <DropdownMenuItem
                key={garage.id}
                onClick={() => setActiveGarage(garage)}
                className="gap-2 p-2"
              >
                <GarageAvatar garage={garage} size="sm" />
                {garage.label}
                <DropdownMenuShortcut>{garage.shortcut}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Nova garagem</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
