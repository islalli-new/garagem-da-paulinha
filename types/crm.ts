export type CrmSectionKey = "portfolio" | "negociacoes" | "contatos"

export type CrmNavigationIconKey = "portfolio" | "negociacoes" | "contatos"

export interface CrmNavigationItem {
  href: `/${CrmSectionKey}`
  key: CrmSectionKey
  label: string
  summary: string
  iconKey: CrmNavigationIconKey
}

export interface CrmSectionMetric {
  label: string
  value: string
  tone?: "default" | "secondary" | "outline"
}

export interface CrmSectionCard {
  title: string
  description: string
}

export interface CrmSectionContent {
  key: CrmSectionKey
  label: string
  eyebrow: string
  description: string
  helperText: string
  metrics: CrmSectionMetric[]
  highlights: CrmSectionCard[]
}

export interface CrmGarage {
  id: string
  label: string
  description: string
  shortcut: string
}

export interface CrmUserProfile {
  fullName: string
  preferredName: string
  email: string
  avatarUrl?: string
}