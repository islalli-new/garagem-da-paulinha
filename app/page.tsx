import { Button } from "@/components/ui/button"
import { FirestoreStatusCard } from "@/components/shared/organisms/firestore-status-card"
import {
  getFirebaseDiagnostics,
  getFirebaseWebConfig,
  hasFirebaseWebConfig,
} from "@/lib/firebase/client"

export default function Page() {
  const diagnostics = getFirebaseDiagnostics()
  const firebaseConfig = getFirebaseWebConfig()
  const firebaseReady = hasFirebaseWebConfig()
  const analyticsReady = Boolean(firebaseConfig.measurementId)

  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,_var(--primary)_16%,_transparent),_transparent_34%),linear-gradient(180deg,_color-mix(in_oklab,_var(--background)_96%,_black_4%),_var(--background))] px-6 py-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="border border-border bg-card/90 p-8 shadow-sm backdrop-blur sm:p-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Firebase + PWA bootstrap
              </p>
              <h1 className="font-heading text-4xl leading-none sm:text-6xl">
                Garagem da Paulinha pronta para instalar.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                A base agora ja esta preparada para receber as credenciais do Firebase por ambiente e publicar o produto como Progressive Web App com manifest, service worker e prompt de instalacao.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>Next.js 16</span>
              <span>Firebase Web SDK</span>
              <span>PWA Install Prompt</span>
              <span>Offline Fallback</span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#firebase-status">Ver diagnostico</a>
              </Button>
              <span className="font-mono text-xs text-muted-foreground">
                Em producao, o navegador pode exibir a opcao de instalar o app automaticamente.
              </span>
            </div>
          </article>

          <aside className="border border-border bg-card/80 p-6 shadow-sm backdrop-blur">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Check rapido
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Credenciais do Firebase: <strong className="text-foreground">{firebaseReady ? "configuradas" : "pendentes"}</strong>
                </p>
                <p>
                  Manifesto PWA: <strong className="text-foreground">ativo</strong>
                </p>
                <p>
                  Service worker: <strong className="text-foreground">habilitado em producao</strong>
                </p>
                <p>
                  Instalacao: <strong className="text-foreground">banner client-side pronto</strong>
                </p>
                <p>
                  Google Analytics: <strong className="text-foreground">{analyticsReady ? "ativo" : "pendente"}</strong>
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section id="firebase-status" className="grid gap-6 lg:grid-cols-2">
          <article className="border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Firebase status
                </p>
                <h2 className="mt-2 font-heading text-2xl">Diagnostico das credenciais web</h2>
              </div>

              <div className="space-y-3 text-sm">
                {diagnostics.map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-4 border border-border px-4 py-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.key}
                    </span>
                    <span className={item.available ? "text-foreground" : "text-destructive"}>
                      {item.available ? "ok" : "ausente"}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Preencha o arquivo <code>.env.local</code> com as chaves publicas do seu projeto Firebase. A inicializacao do SDK acontece de forma singleton e segura para reutilizacao no client.
              </p>
            </div>
          </article>

          <article className="border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Preview da configuracao
                </p>
                <h2 className="mt-2 font-heading text-2xl">Valores detectados</h2>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="border border-border px-4 py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">apiKey</dt>
                  <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.apiKey ? `${firebaseConfig.apiKey.slice(0, 6)}...` : "nao definido"}</dd>
                </div>
                <div className="border border-border px-4 py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">authDomain</dt>
                  <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.authDomain || "nao definido"}</dd>
                </div>
                <div className="border border-border px-4 py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">projectId</dt>
                  <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.projectId || "nao definido"}</dd>
                </div>
                <div className="border border-border px-4 py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">messagingSenderId</dt>
                  <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.messagingSenderId || "nao definido"}</dd>
                </div>
                <div className="border border-border px-4 py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">measurementId</dt>
                  <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.measurementId || "nao definido"}</dd>
                </div>
              </dl>
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <FirestoreStatusCard />

          <article className="border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Proximo passo no console</p>
                <h2 className="mt-2 font-heading text-2xl">Crie o primeiro documento de teste</h2>
              </div>

              <ol className="space-y-3 text-sm leading-6 text-muted-foreground">
                <li>1. No Firebase Console, crie o Cloud Firestore em modo Production.</li>
                <li>2. Na colecao <strong className="text-foreground">app_public</strong>, crie o documento <strong className="text-foreground">status</strong>.</li>
                <li>3. Adicione os campos <strong className="text-foreground">message</strong> = &quot;Firestore online&quot; e <strong className="text-foreground">updatedAt</strong> = texto ou timestamp.</li>
                <li>4. Publique as regras deste repositório para liberar somente leitura publica desse documento.</li>
              </ol>
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="border border-border bg-card p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Passo 1</p>
            <h3 className="mt-3 font-heading text-xl">Credenciais por ambiente</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              O arquivo de exemplo ja lista todas as variaveis NEXT_PUBLIC necessarias para o Firebase Web SDK.
            </p>
          </article>
          <article className="border border-border bg-card p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Passo 2</p>
            <h3 className="mt-3 font-heading text-xl">Instalacao do app</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              O banner escuta o evento do navegador e oferece o CTA assim que o app fica elegivel para instalacao.
            </p>
          </article>
          <article className="border border-border bg-card p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Passo 3</p>
            <h3 className="mt-3 font-heading text-xl">Teste real</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Para validar o PWA, rode o app em producao. Em modo dev o service worker fica desligado para evitar cache enganoso.
            </p>
          </article>
        </section>
      </section>
    </main>
  )
}
