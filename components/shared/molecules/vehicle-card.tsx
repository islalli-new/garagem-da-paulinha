import type { Vehicle, VehicleStatus } from "@/types/crm"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ViewIcon,
  Settings02Icon,
  Bookmark01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

const statusConfig: Record<VehicleStatus, { label: string; bg?: string }> = {
  disponivel: { label: "Disponível" },
  reservado: { label: "Reservado", bg: "oklch(65% 0.15 250)" },
  vendido: { label: "Vendido", bg: "oklch(50% 0.05 250)" },
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  })
}

interface VehicleCardProps {
  vehicle: Vehicle
  onView?: (vehicle: Vehicle) => void
  onEdit?: (vehicle: Vehicle) => void
  onBookmark?: (vehicle: Vehicle) => void
  onNextCondition?: (vehicle: Vehicle) => void
  /** Number of configured params in active condition (badge on gear) */
  configCount?: number
  /** Total condition versions for this vehicle */
  versionCount?: number
  /** Current active version (1-based) */
  currentVersion?: number
  className?: string
}

export function VehicleCard({
  vehicle,
  onView,
  onEdit,
  onBookmark,
  onNextCondition,
  configCount = 0,
  versionCount = 0,
  currentVersion = 1,
  className,
}: VehicleCardProps) {
  const status = statusConfig[vehicle.status]
  const hasSale = vehicle.salePrice != null && vehicle.salePrice < vehicle.price
  const ratio = vehicle.image.width / vehicle.image.height

  const showSecondaryFooter = vehicle.status !== "disponivel"

  return (
    <div className={cn("relative", className)}>
      <Card className="relative z-10 overflow-hidden p-0">
        {/* Toolbar do card */}
        <div className="flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2">
          <ToggleGroup type="multiple" variant="outline" size="sm" className="h-7 sm:h-8">
            <ToggleGroupItem
              value="settings"
              onClick={() => onEdit?.(vehicle)}
              aria-label={`Condição comercial de ${vehicle.brand} ${vehicle.model}`}
              className="relative size-7 px-0 sm:size-8"
            >
              <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} size={16} />
              {configCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {configCount}
                </span>
              )}
            </ToggleGroupItem>
            {versionCount >= 2 && (
              <ToggleGroupItem
                value="next"
                onClick={() => onNextCondition?.(vehicle)}
                aria-label={`Próxima condição de ${vehicle.brand} ${vehicle.model}`}
                className="relative size-7 px-0 sm:size-8"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} size={16} />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {currentVersion}/{versionCount}
                </span>
              </ToggleGroupItem>
            )}
          </ToggleGroup>
          <div className="flex gap-0.5">
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7 sm:size-8"
              onClick={() => onBookmark?.(vehicle)}
              aria-label={`Marcar ${vehicle.brand} ${vehicle.model}`}
            >
              <HugeiconsIcon icon={Bookmark01Icon} strokeWidth={2} />
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7 sm:size-8"
              onClick={() => onView?.(vehicle)}
              aria-label={`Ver detalhes de ${vehicle.brand} ${vehicle.model}`}
            >
              <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Imagem */}
        <AspectRatio ratio={ratio} className="overflow-hidden">
          <img
            src={vehicle.image.src}
            alt={vehicle.image.alt}
            className="block size-full object-cover object-center"
          />
        </AspectRatio>

        {/* Info */}
        <CardContent className="flex flex-col gap-1.5 p-2.5 sm:gap-2 sm:p-4">
          <Badge variant="secondary" className="w-fit px-2 py-0.5 text-xs">
            F {vehicle.yearManufacture} · M {vehicle.yearModel}
          </Badge>
          <CardTitle className="text-sm font-semibold sm:text-base">
            {vehicle.brand} {vehicle.model}
          </CardTitle>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {vehicle.version}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-1.5">
            {hasSale ? (
              <>
                <span className="text-xs text-muted-foreground line-through sm:text-sm">
                  {formatCurrency(vehicle.price)}
                </span>
                <span className="text-sm font-semibold sm:text-lg">
                  {formatCurrency(vehicle.salePrice!)}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold sm:text-lg">
                {formatCurrency(vehicle.price)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rodapé secundário — aparece "por trás" do card */}
      {showSecondaryFooter && (
        <div className="relative z-0 -mt-2 flex flex-wrap gap-1.5 rounded-b-xl border px-3 pt-5 pb-2.5">
          <Badge
            style={{ background: status.bg }}
            className="text-xs text-white"
          >
            {status.label}
          </Badge>
        </div>
      )}
    </div>
  )
}
