"use client"

import { usePublicFirestoreStatus } from "@/hooks/use-public-firestore-status"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FirestoreStatusCard() {
  const { loading, available, exists, error, data } = usePublicFirestoreStatus()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardDescription className="text-xs uppercase tracking-[0.3em]">
            Firestore
          </CardDescription>
          <CardTitle className="text-2xl">Leitura real do banco</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-28 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-xs uppercase tracking-[0.3em]">
          Firestore
        </CardDescription>
        <CardTitle className="text-2xl">Leitura real do banco</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
          <CardContent className="flex items-center justify-between gap-4 py-4 text-sm">
            <span className="text-muted-foreground">SDK</span>
            <Badge variant={available ? "default" : "outline"}>
              {available ? "conectado" : "indisponivel"}
            </Badge>
          </CardContent>
        </Card>

        <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
          <CardContent className="flex items-center justify-between gap-4 py-4 text-sm">
            <span className="text-muted-foreground">Documento publico app_public/status</span>
            <Badge variant={exists ? "default" : "outline"}>
              {exists ? "encontrado" : "ausente"}
            </Badge>
          </CardContent>
        </Card>

        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Falha na leitura do Firestore</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {data ? (
          <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
            <CardContent className="py-4">
              <p className="mb-3 text-sm text-muted-foreground">Payload retornado</p>
              <pre className="overflow-x-auto text-xs text-muted-foreground">
                {JSON.stringify(data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ) : null}
      </CardContent>
    </Card>
  )
}