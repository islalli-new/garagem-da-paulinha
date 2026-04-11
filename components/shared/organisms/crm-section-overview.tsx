import { crmNavigationItems } from "@/src/mocks/crm-shell"
import type { CrmSectionContent } from "@/types/crm"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CrmSectionOverviewProps {
  section: CrmSectionContent
}

export function CrmSectionOverview({ section }: CrmSectionOverviewProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Card className="border border-border/80 bg-card/95 shadow-sm">
        <CardHeader>
          <CardDescription className="text-xs uppercase tracking-[0.3em]">
            {section.eyebrow}
          </CardDescription>
          <CardTitle className="text-3xl sm:text-4xl">{section.label}</CardTitle>
          <CardDescription className="max-w-3xl text-base leading-7">
            {section.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {section.metrics.map((metric) => (
              <Badge key={metric.label} variant={metric.tone ?? "default"}>
                {metric.label}: {metric.value}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{section.helperText}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {section.highlights.map((item) => (
          <Card key={item.title} size="sm" className="border border-border/70 bg-background shadow-none">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card size="sm" className="border border-border/70 bg-background shadow-none">
        <CardHeader>
          <CardTitle>Mapa inicial do shell</CardTitle>
          <CardDescription>
            Navegação principal preparada para as três áreas centrais da operação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {crmNavigationItems.map((item) => (
              <Card key={item.key} size="sm" className="border border-border/70 bg-card shadow-none">
                <CardHeader>
                  <CardTitle>{item.label}</CardTitle>
                  <CardDescription>{item.summary}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}