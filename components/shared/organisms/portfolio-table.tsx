import type { Vehicle, VehicleStatus } from "@/types/crm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HugeiconsIcon } from "@hugeicons/react"
import { MoreVerticalCircle01Icon, Edit02Icon, Delete02Icon, ViewIcon } from "@hugeicons/core-free-icons"

const statusMap: Record<VehicleStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
  disponivel: { label: "Disponível", variant: "default" },
  reservado: { label: "Reservado", variant: "secondary" },
  vendido: { label: "Vendido", variant: "outline" },
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 })
}

function formatMileage(value: number) {
  return `${value.toLocaleString("pt-BR")} km`
}

interface PortfolioTableProps {
  vehicles: Vehicle[]
  onEdit: (vehicle: Vehicle) => void
  onView: (vehicle: Vehicle) => void
  onDelete: (vehicle: Vehicle) => void
}

export function PortfolioTable({
  vehicles,
  onEdit,
  onView,
  onDelete,
}: PortfolioTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Veículo</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Cor</TableHead>
          <TableHead>Placa</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Km</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-12">
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => {
          const status = statusMap[vehicle.status]
          return (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">
                {vehicle.brand} {vehicle.model}
              </TableCell>
              <TableCell>{vehicle.yearManufacture}/{vehicle.yearModel}</TableCell>
              <TableCell>{vehicle.color}</TableCell>
              <TableCell className="font-mono text-xs">{vehicle.plate}</TableCell>
              <TableCell className="text-right">{formatCurrency(vehicle.price)}</TableCell>
              <TableCell className="text-right">{formatMileage(vehicle.mileage)}</TableCell>
              <TableCell>
                <Badge variant={status.variant}>{status.label}</Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" aria-label="Ações do veículo">
                      <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => onView(vehicle)}>
                        <HugeiconsIcon icon={ViewIcon} strokeWidth={2} data-icon="inline-start" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(vehicle)}>
                        <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} data-icon="inline-start" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete(vehicle)}
                      >
                        <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} data-icon="inline-start" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
