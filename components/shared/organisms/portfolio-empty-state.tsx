import { HugeiconsIcon } from "@hugeicons/react"
import { Car01Icon } from "@hugeicons/core-free-icons"

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

interface PortfolioEmptyStateProps {
  onAddVehicle: () => void
}

export function PortfolioEmptyState({
  onAddVehicle,
}: PortfolioEmptyStateProps) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Car01Icon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>Nenhum veículo encontrado</EmptyTitle>
        <EmptyDescription>
          Sua busca não retornou resultados. Tente outro termo ou cadastre um
          novo veículo.
        </EmptyDescription>
      </EmptyHeader>
      <Button onClick={onAddVehicle}>Cadastrar veículo</Button>
    </Empty>
  )
}
