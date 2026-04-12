import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

interface PortfolioToolbarProps {
  onAddVehicle: () => void
}

export function PortfolioToolbar({
  onAddVehicle,
}: PortfolioToolbarProps) {
  return (
    <div className="flex items-center justify-end gap-4">
      <Button onClick={onAddVehicle}>
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
        Novo veículo
      </Button>
    </div>
  )
}
