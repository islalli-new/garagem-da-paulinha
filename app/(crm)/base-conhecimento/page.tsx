import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function BaseConhecimentoPage() {
  return (
    <Card className="border border-border/80 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle>Base de conhecimento</CardTitle>
        <CardDescription>
          Área reservada para materiais, guias e referências operacionais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A navegação já está integrada à shell oficial do shadcn e o conteúdo pode ser evoluído depois.
        </p>
      </CardContent>
    </Card>
  )
}