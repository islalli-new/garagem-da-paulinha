import type { ReactNode } from "react"

import { CrmShell } from "@/components/layout/crm-shell"

interface CrmLayoutProps {
  children: ReactNode
}

export default function CrmLayout({ children }: CrmLayoutProps) {
  return <CrmShell>{children}</CrmShell>
}