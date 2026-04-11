"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen01Icon,
  BriefcaseDollarIcon,
  Car01Icon,
  CommandIcon,
  ContactBookIcon,
  HelpCircleIcon,
} from "@hugeicons/core-free-icons"

import { crmCurrentUser } from "@/src/mocks/crm-shell"

const data = {
  user: {
    name: crmCurrentUser.preferredName,
    email: crmCurrentUser.email,
    avatar: crmCurrentUser.avatarUrl,
  },
  navMain: [
    {
      title: "Portfólio",
      url: "/portfolio",
      icon: (
        <HugeiconsIcon icon={Car01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Negociações",
      url: "/negociacoes",
      icon: (
        <HugeiconsIcon icon={BriefcaseDollarIcon} strokeWidth={2} />
      ),
    },
    {
      title: "Contatos",
      url: "/contatos",
      icon: (
        <HugeiconsIcon icon={ContactBookIcon} strokeWidth={2} />
      ),
    },
  ],
  navSecondary: [
    {
      title: "Ajuda",
      url: "/ajuda",
      icon: (
        <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
      ),
    },
    {
      title: "Base de conhecimento",
      url: "/base-conhecimento",
      icon: (
        <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={2} />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
