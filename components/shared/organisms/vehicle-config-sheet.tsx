"use client"

import * as React from "react"
import type { Vehicle } from "@/types/crm"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

export type PaymentMethod = "dinheiro" | "financiado" | "troca"

export interface VehicleCommercialConfig {
  discount: number
  paymentMethod: PaymentMethod
}

const defaultConfig: VehicleCommercialConfig = {
  discount: 0,
  paymentMethod: "dinheiro",
}

/** Conta quantos parâmetros foram alterados em relação ao padrão */
export function countConfiguredParams(config: VehicleCommercialConfig): number {
  let count = 0
  if (config.discount > 0) count++
  if (config.paymentMethod !== "dinheiro") count++
  return count
}

interface VehicleConfigSheetProps {
  vehicle: Vehicle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Salva a versão atual (índice currentVersion) */
  onSave: (vehicleId: string, config: VehicleCommercialConfig) => void
  /** Cria nova versão copiando os valores atuais */
  onNew: (vehicleId: string, copiedConfig: VehicleCommercialConfig) => void
  onNext?: () => void
  /** Valores iniciais para o formulário */
  initialConfig?: VehicleCommercialConfig
  /** Versão sendo editada (1-based) */
  currentVersion?: number
  /** Total de versões existentes */
  totalVersions?: number
}

export function VehicleConfigSheet({
  vehicle,
  open,
  onOpenChange,
  onSave,
  onNew,
  onNext,
  initialConfig,
  currentVersion = 1,
  totalVersions = 0,
}: VehicleConfigSheetProps) {
  const isMobile = useIsMobile()
  const config = initialConfig ?? defaultConfig

  function getFormData(form: HTMLFormElement): VehicleCommercialConfig {
    const formData = new FormData(form)
    return {
      discount: Number(formData.get("discount")) || 0,
      paymentMethod: (formData.get("paymentMethod") as PaymentMethod) || "dinheiro",
    }
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!vehicle) return
    onSave(vehicle.id, getFormData(e.currentTarget))
    onOpenChange(false)
  }

  const formRef = React.useRef<HTMLFormElement>(null)

  function handleNew() {
    if (!vehicle || !formRef.current) return
    const data = getFormData(formRef.current)
    onNew(vehicle.id, data)
  }

  const versionLabel =
    totalVersions > 0
      ? `Condição ${currentVersion} de ${totalVersions}`
      : "Configuração comercial"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isMobile ? "bottom" : "right"}>
        <SheetHeader>
          <SheetTitle>{versionLabel}</SheetTitle>
          <SheetDescription>
            {vehicle
              ? `${vehicle.brand} ${vehicle.model} – ${vehicle.version}`
              : "Selecione um veículo"}
          </SheetDescription>
        </SheetHeader>

        {vehicle && (
          <form
            ref={formRef}
            onSubmit={handleSave}
            className="flex flex-1 flex-col gap-6 p-6"
          >
            <Field>
              <FieldLabel htmlFor="discount">Desconto (%)</FieldLabel>
              <Input
                id="discount"
                name="discount"
                type="number"
                min={0}
                max={100}
                step={0.5}
                placeholder="Ex: 5"
                defaultValue={config.discount || ""}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="paymentMethod">Condição de pagamento</FieldLabel>
              <Select name="paymentMethod" defaultValue={config.paymentMethod}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="financiado">Financiado</SelectItem>
                  <SelectItem value="troca">Troca</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <SheetFooter className="mt-auto flex-row items-center gap-2 p-0">
              <Button type="submit" className="flex-1">
                Salvar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleNew}
              >
                Novo
              </Button>
              {totalVersions >= 2 && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="relative shrink-0 rounded-full"
                  onClick={onNext}
                  aria-label="Próxima configuração"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                  <span className="absolute -top-2 -right-2 flex h-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {currentVersion}/{totalVersions}
                  </span>
                </Button>
              )}
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
