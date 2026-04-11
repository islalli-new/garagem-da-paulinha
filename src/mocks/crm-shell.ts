import type {
  CrmGarage,
  CrmNavigationItem,
  CrmSectionContent,
  CrmSectionKey,
  CrmUserProfile,
} from "@/types/crm"

function getGarageArticle(preferredName: string) {
  return preferredName.trim().toLowerCase().endsWith("a") ? "da" : "do"
}

function buildGarageName(preferredName: string) {
  return `Garagem ${getGarageArticle(preferredName)} ${preferredName.trim()}`
}

export const crmCurrentUser: CrmUserProfile = {
  fullName: "Paula Nascimento",
  preferredName: "Paulinha",
  email: "paulinha@garagem.app",
}

export const crmGarages: CrmGarage[] = [
  {
    id: "minha-garagem",
    label: buildGarageName(crmCurrentUser.preferredName),
    description: "Sua operação principal",
    shortcut: "⌘1",
  },
  {
    id: "garagem-centro",
    label: "Garagem do Centro",
    description: "Estoque urbano",
    shortcut: "⌘2",
  },
  {
    id: "garagem-avenida",
    label: "Garagem da Avenida",
    description: "Linha premium",
    shortcut: "⌘3",
  },
]

export const crmNavigationItems: CrmNavigationItem[] = [
  {
    href: "/portfolio",
    key: "portfolio",
    label: "Portfólio",
    summary: "Catálogo e destaques dos carros ativos.",
    iconKey: "portfolio",
  },
  {
    href: "/negociacoes",
    key: "negociacoes",
    label: "Negociações",
    summary: "Oportunidades em andamento e próximas ações.",
    iconKey: "negociacoes",
  },
  {
    href: "/contatos",
    key: "contatos",
    label: "Contatos",
    summary: "Leads, clientes e relacionamentos ativos.",
    iconKey: "contatos",
  },
]

export const crmSections: Record<CrmSectionKey, CrmSectionContent> = {
  portfolio: {
    key: "portfolio",
    label: "Portfólio",
    eyebrow: "Entrada principal",
    description:
      "Visão inicial do vendedor para organizar o estoque, destacar os carros certos e preparar a conversa comercial.",
    helperText: "Organize o estoque, priorize destaques e mantenha a conversa comercial sempre pronta.",
    metrics: [
      { label: "Carros em destaque", value: "12", tone: "default" },
      { label: "Novidades da semana", value: "4", tone: "secondary" },
      { label: "Pendentes de foto", value: "3", tone: "outline" },
    ],
    highlights: [
      {
        title: "Curadoria rápida do estoque",
        description: "Liste os carros prioritários para o dia e deixe a abordagem comercial mais objetiva.",
      },
      {
        title: "Destaques por perfil de cliente",
        description: "Separe veículos com melhor giro, ticket ou oportunidade de upgrade para cada lead.",
      },
      {
        title: "Visão pronta para evoluir",
        description: "A estrutura já comporta filtros, cards de veículo e ações comerciais sem refazer a navegação.",
      },
    ],
  },
  negociacoes: {
    key: "negociacoes",
    label: "Negociações",
    eyebrow: "Pipeline comercial",
    description:
      "Espaço reservado para acompanhar propostas, etapas da negociação e alertas de follow-up sem depender do backend nesta fase.",
    helperText: "Acompanhe o que está quente, o que pede retorno rápido e o que precisa de próxima ação.",
    metrics: [
      { label: "Oportunidades abertas", value: "18", tone: "default" },
      { label: "Follow-ups hoje", value: "6", tone: "secondary" },
      { label: "Propostas paradas", value: "2", tone: "outline" },
    ],
    highlights: [
      {
        title: "Priorização diária",
        description: "Mostre as negociações mais quentes primeiro para reduzir perda de timing na resposta.",
      },
      {
        title: "Checklist de etapa",
        description: "Cada oportunidade pode evoluir com status claros, documentos e próximas ações bem definidas.",
      },
      {
        title: "Leitura rápida do pipeline",
        description: "A página está pronta para receber listas, prioridades e estados de carregamento de forma consistente.",
      },
    ],
  },
  contatos: {
    key: "contatos",
    label: "Contatos",
    eyebrow: "Relacionamento",
    description:
      "Área inicial para concentrar leads, clientes recorrentes e histórico de relacionamento em uma navegação consistente.",
    helperText: "Reúna contexto de atendimento, preferências e oportunidades em um ponto único da operação.",
    metrics: [
      { label: "Leads novos", value: "9", tone: "default" },
      { label: "Clientes ativos", value: "27", tone: "secondary" },
      { label: "Sem retorno", value: "5", tone: "outline" },
    ],
    highlights: [
      {
        title: "Histórico centralizado",
        description: "A estrutura já prepara um ponto único para interações, preferência de carro e contexto comercial.",
      },
      {
        title: "Ações sugeridas",
        description: "O fluxo pode crescer com alertas de retorno, tags de interesse e últimas conversas.",
      },
      {
        title: "Separação correta de responsabilidades",
        description: "A navegação permanece estável enquanto listas, detalhes e integrações entram nos próximos ciclos.",
      },
    ],
  },
}