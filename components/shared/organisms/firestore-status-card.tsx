"use client"

import { usePublicFirestoreStatus } from "@/hooks/use-public-firestore-status"

export function FirestoreStatusCard() {
  const { loading, available, exists, error, data } = usePublicFirestoreStatus()

  return (
    <article className="border border-border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Firestore</p>
          <h2 className="mt-2 font-heading text-2xl">Leitura real do banco</h2>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            SDK: <strong className="text-foreground">{available ? "conectado" : loading ? "carregando" : "indisponivel"}</strong>
          </p>
          <p>
            Documento publico <strong className="text-foreground">app_public/status</strong>: <strong className="text-foreground">{loading ? "verificando" : exists ? "encontrado" : "ausente"}</strong>
          </p>
          {error ? <p className="text-destructive">{error}</p> : null}
        </div>

        {data ? (
          <pre className="overflow-x-auto border border-border bg-background p-4 text-xs text-muted-foreground">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : null}
      </div>
    </article>
  )
}