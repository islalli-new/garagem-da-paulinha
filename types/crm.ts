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

// ── Portfólio (Veículos) ──────────────────────────────────

export type VehicleFuelType = "flex" | "gasolina" | "etanol" | "diesel" | "eletrico" | "hibrido"
export type VehicleTransmission = "manual" | "automatico" | "cvt" | "automatizado"
export type VehicleStatus = "disponivel" | "reservado" | "vendido"

export interface Vehicle {
  id: string
  brand: string
  model: string
  version: string
  yearManufacture: number
  yearModel: number
  color: string
  plate: string
  price: number
  salePrice?: number
  mileage: number
  fuel: VehicleFuelType
  transmission: VehicleTransmission
  status: VehicleStatus
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  notes?: string
  createdAt: string
}

// ── Busca Universal ───────────────────────────────────────

export type UniversalSearchGroup = "portfolio" | "negociacoes" | "contatos"

export interface UniversalSearchItem {
  id: string
  group: UniversalSearchGroup
  label: string
  description: string
  href: string
}