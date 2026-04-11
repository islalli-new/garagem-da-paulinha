import { CrmSectionOverview } from "@/components/shared/organisms/crm-section-overview"
import { crmSections } from "@/src/mocks/crm-shell"

export default function ContatosPage() {
  return <CrmSectionOverview section={crmSections.contatos} />
}