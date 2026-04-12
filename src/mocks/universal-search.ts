import type { UniversalSearchItem } from "@/types/crm"

export const mockUniversalSearchItems: UniversalSearchItem[] = [
  // Portfólio
  {
    id: "v-001",
    group: "portfolio",
    label: "Honda Civic EXL 2022",
    description: "Prata — R$ 98.000",
    href: "/portfolio",
  },
  {
    id: "v-002",
    group: "portfolio",
    label: "Toyota Corolla XEi 2023",
    description: "Branco — R$ 115.000",
    href: "/portfolio",
  },
  {
    id: "v-003",
    group: "portfolio",
    label: "Volkswagen T-Cross Highline 2023",
    description: "Preto — R$ 132.000",
    href: "/portfolio",
  },
  {
    id: "v-006",
    group: "portfolio",
    label: "Fiat Pulse Drive 2024",
    description: "Azul — R$ 95.000",
    href: "/portfolio",
  },
  // Negociações
  {
    id: "n-001",
    group: "negociacoes",
    label: "Proposta #42 — João Silva",
    description: "T-Cross Highline — Em análise",
    href: "/negociacoes",
  },
  {
    id: "n-002",
    group: "negociacoes",
    label: "Proposta #38 — Ana Costa",
    description: "Corolla XEi — Aguardando retorno",
    href: "/negociacoes",
  },
  // Contatos
  {
    id: "c-001",
    group: "contatos",
    label: "João Silva",
    description: "Lead quente — Interessado em SUV",
    href: "/contatos",
  },
  {
    id: "c-002",
    group: "contatos",
    label: "Maria Souza",
    description: "Cliente ativa — Última compra há 6 meses",
    href: "/contatos",
  },
  {
    id: "c-003",
    group: "contatos",
    label: "Ana Costa",
    description: "Lead morno — Orçamento em aberto",
    href: "/contatos",
  },
]
