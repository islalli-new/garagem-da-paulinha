export default function OfflinePage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-10">
      <section className="w-full max-w-xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Modo offline</p>
        <h1 className="mt-4 font-heading text-4xl leading-none">Sem conexao no momento.</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          O PWA continua carregando a interface basica, mas os recursos online da Garagem da Paulinha voltam a responder quando a conexao for restabelecida.
        </p>
      </section>
    </main>
  )
}