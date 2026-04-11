import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FirestoreStatusCard } from "@/components/shared/organisms/firestore-status-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
          <Card className="bg-card/90 backdrop-blur sm:py-8">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.35em]">
                Firebase + PWA bootstrap
              </CardDescription>
              <CardTitle className="text-4xl leading-none sm:text-6xl">
                Garagem da Paulinha pronta para instalar.
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 sm:text-lg">
                A base agora ja esta preparada para receber as credenciais do Firebase por ambiente e publicar o produto como Progressive Web App com manifest, service worker e prompt de instalacao.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-3">
              <Badge variant="secondary">Next.js 16</Badge>
              <Badge variant="secondary">Firebase Web SDK</Badge>
              <Badge variant="secondary">PWA Install Prompt</Badge>
              <Badge variant="secondary">Offline Fallback</Badge>
            </CardContent>

            <CardFooter className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#firebase-status">Ver diagnostico</a>
              </Button>
              <p className="font-mono text-xs text-muted-foreground">
                Em producao, o navegador pode exibir a opcao de instalar o app automaticamente.
              </p>
            </CardFooter>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.3em]">
                Check rapido
              </CardDescription>
              <CardTitle>Resumo da base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                <CardContent className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-muted-foreground">Credenciais do Firebase</span>
                  <Badge variant={firebaseReady ? "default" : "outline"}>
                    {firebaseReady ? "configuradas" : "pendentes"}
                  </Badge>
                </CardContent>
              </Card>
              <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                <CardContent className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-muted-foreground">Manifesto PWA</span>
                  <Badge>ativo</Badge>
                </CardContent>
              </Card>
              <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                <CardContent className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-muted-foreground">Service worker</span>
                  <Badge variant="secondary">habilitado em producao</Badge>
                </CardContent>
              </Card>
              <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                <CardContent className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-muted-foreground">Instalacao</span>
                  <Badge variant="secondary">banner pronto</Badge>
                </CardContent>
              </Card>
              <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                <CardContent className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-muted-foreground">Google Analytics</span>
                  <Badge variant={analyticsReady ? "default" : "outline"}>
                    {analyticsReady ? "ativo" : "pendente"}
                  </Badge>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <section id="firebase-status" className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.3em]">
                Firebase status
              </CardDescription>
              <CardTitle className="text-2xl">Diagnostico das credenciais web</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              {diagnostics.map((item) => (
                <Card key={item.key} size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                  <CardContent className="flex items-center justify-between gap-4 py-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.key}
                    </span>
                    <Badge variant={item.available ? "default" : "destructive"}>
                      {item.available ? "ok" : "ausente"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}

              <Alert>
                <AlertTitle>Configuracao esperada</AlertTitle>
                <AlertDescription>
                  Preencha o arquivo .env.local com as chaves publicas do seu projeto Firebase. A inicializacao do SDK acontece de forma singleton e segura para reutilizacao no client.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.3em]">
                Preview da configuracao
              </CardDescription>
              <CardTitle className="text-2xl">Valores detectados</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="space-y-3 text-sm">
                <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                  <CardContent className="py-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">apiKey</dt>
                    <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.apiKey ? `${firebaseConfig.apiKey.slice(0, 6)}...` : "nao definido"}</dd>
                  </CardContent>
                </Card>
                <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                  <CardContent className="py-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">authDomain</dt>
                    <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.authDomain || "nao definido"}</dd>
                  </CardContent>
                </Card>
                <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                  <CardContent className="py-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">projectId</dt>
                    <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.projectId || "nao definido"}</dd>
                  </CardContent>
                </Card>
                <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                  <CardContent className="py-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">messagingSenderId</dt>
                    <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.messagingSenderId || "nao definido"}</dd>
                  </CardContent>
                </Card>
                <Card size="sm" className="rounded-3xl border border-border bg-background/70 shadow-none">
                  <CardContent className="py-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">measurementId</dt>
                    <dd className="mt-1 break-all text-muted-foreground">{firebaseConfig.measurementId || "nao definido"}</dd>
                  </CardContent>
                </Card>
              </dl>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <FirestoreStatusCard />

          <Card>
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.3em]">
                Proximo passo no console
              </CardDescription>
              <CardTitle className="text-2xl">Crie o primeiro documento de teste</CardTitle>
            </CardHeader>

            <CardContent>
              <ol className="space-y-3 text-sm leading-6 text-muted-foreground">
                <li>1. No Firebase Console, crie o Cloud Firestore em modo Production.</li>
                <li>2. Na colecao <strong className="text-foreground">app_public</strong>, crie o documento <strong className="text-foreground">status</strong>.</li>
                <li>3. Adicione os campos <strong className="text-foreground">message</strong> = &quot;Firestore online&quot; e <strong className="text-foreground">updatedAt</strong> = texto ou timestamp.</li>
                <li>4. Publique as regras deste repositorio para liberar somente leitura publica desse documento.</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card size="sm">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.3em]">Passo 1</CardDescription>
              <CardTitle className="text-xl">Credenciais por ambiente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                O arquivo de exemplo ja lista todas as variaveis NEXT_PUBLIC necessarias para o Firebase Web SDK.
              </p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.3em]">Passo 2</CardDescription>
              <CardTitle className="text-xl">Instalacao do app</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                O banner escuta o evento do navegador e oferece o CTA assim que o app fica elegivel para instalacao.
              </p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.3em]">Passo 3</CardDescription>
              <CardTitle className="text-xl">Teste real</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                Para validar o PWA, rode o app em producao. Em modo dev o service worker fica desligado para evitar cache enganoso.
              </p>
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  )
}
