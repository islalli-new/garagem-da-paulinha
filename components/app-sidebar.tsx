"use client"

import * as React from "react"

import { GarageSwitcher } from "@/components/garage-switcher"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen01Icon,
  BriefcaseDollarIcon,
  Car01Icon,
  ContactBookIcon,
  RocketIcon,
} from "@hugeicons/core-free-icons"

import { crmCurrentUser, crmGarages } from "@/src/mocks/crm-shell"

const data = {
  user: {
    name: crmCurrentUser.preferredName,
    email: crmCurrentUser.email,
    avatar: crmCurrentUser.avatarUrl,
  },
  navMain: [
    {
      title: "Negociações",
      url: "/negociacoes",
      icon: (
        <HugeiconsIcon icon={BriefcaseDollarIcon} size={16} strokeWidth={2} />
      ),
    },
    {
      title: "Portfólio",
      url: "/portfolio",
      icon: (
        <HugeiconsIcon icon={Car01Icon} size={16} strokeWidth={2} />
      ),
    },
    {
      title: "Contatos",
      url: "/contatos",
      icon: (
        <HugeiconsIcon icon={ContactBookIcon} size={16} strokeWidth={2} />
      ),
    },
  ],
  navSecondary: [
    {
      title: "Performance",
      url: "/performance",
      icon: (
        <HugeiconsIcon icon={RocketIcon} size={16} strokeWidth={2} />
      ),
    },
    {
      title: "Conhecimento",
      url: "/base-conhecimento",
      icon: (
        <HugeiconsIcon icon={BookOpen01Icon} size={16} strokeWidth={2} />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <GarageSwitcher garages={crmGarages} />
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
