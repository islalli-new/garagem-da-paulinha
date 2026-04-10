import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <section className="flex max-w-2xl min-w-0 flex-col gap-6 border border-border bg-card p-8 text-sm shadow-sm">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Novo projeto base
          </p>
          <h1 className="font-heading text-4xl leading-none sm:text-5xl">
            Garagem da Paulinha
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            O repositório foi rebatizado e está pronto para começar a estrutura do novo produto com a identidade da Garagem da Paulinha.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Next.js</span>
          <span>shadcn/ui</span>
          <span>Tailwind CSS</span>
          <span>Docker</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button>Comecar a construir</Button>
          <span className="font-mono text-xs text-muted-foreground">
            Pressione <kbd>d</kbd> para alternar o tema
          </span>
        </div>
      </section>
    </main>
  )
}
