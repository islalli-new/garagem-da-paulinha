"use client"

import * as React from "react"

import type { Vehicle, VehicleFuelType, VehicleTransmission, VehicleStatus } from "@/types/crm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const fuelOptions: { value: VehicleFuelType; label: string }[] = [
  { value: "flex", label: "Flex" },
  { value: "gasolina", label: "Gasolina" },
  { value: "etanol", label: "Etanol" },
  { value: "diesel", label: "Diesel" },
  { value: "eletrico", label: "Elétrico" },
  { value: "hibrido", label: "Híbrido" },
]

const transmissionOptions: { value: VehicleTransmission; label: string }[] = [
  { value: "manual", label: "Manual" },
  { value: "automatico", label: "Automático" },
  { value: "cvt", label: "CVT" },
  { value: "automatizado", label: "Automatizado" },
]

const statusOptions: { value: VehicleStatus; label: string }[] = [
  { value: "disponivel", label: "Disponível" },
  { value: "reservado", label: "Reservado" },
  { value: "vendido", label: "Vendido" },
]

interface VehicleFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle?: Vehicle | null
  onSave: (data: Partial<Vehicle>) => void
}

export function VehicleFormDialog({
  open,
  onOpenChange,
  vehicle,
  onSave,
}: VehicleFormDialogProps) {
  const isEditing = !!vehicle

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data: Partial<Vehicle> = {
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      version: formData.get("version") as string,
      yearManufacture: Number(formData.get("yearManufacture")),
      yearModel: Number(formData.get("yearModel")),
      color: formData.get("color") as string,
      plate: formData.get("plate") as string,
      price: Number(formData.get("price")),
      salePrice: formData.get("salePrice") ? Number(formData.get("salePrice")) : undefined,
      mileage: Number(formData.get("mileage")),
      fuel: formData.get("fuel") as VehicleFuelType,
      transmission: formData.get("transmission") as VehicleTransmission,
      status: formData.get("status") as VehicleStatus,
      notes: formData.get("notes") as string,
    }

    if (vehicle) {
      data.id = vehicle.id
    }

    console.log("[VehicleFormDialog] save:", data)
    onSave(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar veículo" : "Novo veículo"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Altere os dados do veículo e salve."
              : "Preencha os dados do veículo para cadastrar."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="brand">Marca</FieldLabel>
                <Input
                  id="brand"
                  name="brand"
                  placeholder="Ex: Honda"
                  defaultValue={vehicle?.brand ?? ""}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="model">Modelo</FieldLabel>
                <Input
                  id="model"
                  name="model"
                  placeholder="Ex: Civic"
                  defaultValue={vehicle?.model ?? ""}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="version">Versão</FieldLabel>
                <Input
                  id="version"
                  name="version"
                  placeholder="Ex: EXL 2.0"
                  defaultValue={vehicle?.version ?? ""}
                  required
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="yearManufacture">Ano fab.</FieldLabel>
                <Input
                  id="yearManufacture"
                  name="yearManufacture"
                  type="number"
                  placeholder="2024"
                  defaultValue={vehicle?.yearManufacture ?? ""}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="yearModel">Ano mod.</FieldLabel>
                <Input
                  id="yearModel"
                  name="yearModel"
                  type="number"
                  placeholder="2025"
                  defaultValue={vehicle?.yearModel ?? ""}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="color">Cor</FieldLabel>
                <Input
                  id="color"
                  name="color"
                  placeholder="Ex: Prata"
                  defaultValue={vehicle?.color ?? ""}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="plate">Placa</FieldLabel>
                <Input
                  id="plate"
                  name="plate"
                  placeholder="ABC-1D23"
                  defaultValue={vehicle?.plate ?? ""}
                  required
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="price">Preço de (R$)</FieldLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="118000"
                  defaultValue={vehicle?.price ?? ""}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="salePrice">Preço por (R$)</FieldLabel>
                <Input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  placeholder="98000"
                  defaultValue={vehicle?.salePrice ?? ""}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="mileage">Quilometragem</FieldLabel>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  placeholder="32000"
                  defaultValue={vehicle?.mileage ?? ""}
                  required
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field>
                <FieldLabel>Combustível</FieldLabel>
                <Select
                  name="fuel"
                  defaultValue={vehicle?.fuel ?? "flex"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Combustível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {fuelOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Câmbio</FieldLabel>
                <Select
                  name="transmission"
                  defaultValue={vehicle?.transmission ?? "manual"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Câmbio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {transmissionOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Status</FieldLabel>
                <Select
                  name="status"
                  defaultValue={vehicle?.status ?? "disponivel"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="notes">Observações</FieldLabel>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Informações adicionais..."
                defaultValue={vehicle?.notes ?? ""}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? "Salvar alterações" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
