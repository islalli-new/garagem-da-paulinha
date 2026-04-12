"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon } from "@hugeicons/core-free-icons"

import { useSearch } from "@/hooks/use-search"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSearch() {
  const { setOpen } = useSearch()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setOpen(true)}
            >
              <HugeiconsIcon icon={SearchIcon} size={16} strokeWidth={2} />
              <span className="group-data-[collapsible=icon]:hidden">Buscar</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
