import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PortfolioTableSkeletonProps {
  rows?: number
}

export function PortfolioTableSkeleton({
  rows = 5,
}: PortfolioTableSkeletonProps) {
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
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-36" /></TableCell>
            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            <TableCell className="text-right"><Skeleton className="ml-auto h-4 w-20" /></TableCell>
            <TableCell className="text-right"><Skeleton className="ml-auto h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
            <TableCell><Skeleton className="size-8 rounded-full" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
