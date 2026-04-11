import { CrmSectionOverview } from "@/components/shared/organisms/crm-section-overview"
import { crmSections } from "@/src/mocks/crm-shell"

export default function PortfolioPage() {
  return <CrmSectionOverview section={crmSections.portfolio} />
}