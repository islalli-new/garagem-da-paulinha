import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AjudaPage() {
  return (
    <Card className="border border-border/80 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle>Ajuda</CardTitle>
        <CardDescription>
          Espaço reservado para suporte, dúvidas frequentes e orientação de uso.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A shell oficial já está pronta. O conteúdo desta área entra no próximo passo.
        </p>
      </CardContent>
    </Card>
  )
}