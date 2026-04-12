"use client"

import * as React from "react"
import { toast } from "sonner"

import type { Vehicle } from "@/types/crm"
import { mockVehicles } from "@/src/mocks/portfolio"

import { VehicleDeck } from "@/components/shared/molecules/vehicle-deck"
import { PortfolioEmptyState } from "@/components/shared/organisms/portfolio-empty-state"
import {
  VehicleConfigSheet,
  countConfiguredParams,
  type VehicleCommercialConfig,
} from "@/components/shared/organisms/vehicle-config-sheet"

export default function PortfolioPage() {
  const [vehicles] = React.useState<Vehicle[]>(mockVehicles)

  // Config: array of versions per vehicle + active version index
  const [configOpen, setConfigOpen] = React.useState(false)
  const [configVehicle, setConfigVehicle] = React.useState<Vehicle | null>(null)
  const [configMap, setConfigMap] = React.useState<Record<string, VehicleCommercialConfig[]>>({})
  const [activeVersion, setActiveVersion] = React.useState<Record<string, number>>({})

  function getActiveIndex(vehicleId: string) {
    return activeVersion[vehicleId] ?? 0
  }

  function handleView(vehicle: Vehicle) {
    console.log("[Portfolio] view:", vehicle.id)
    toast.info(`Detalhes: ${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearManufacture}/${vehicle.yearModel}`)
  }

  function handleEdit(vehicle: Vehicle) {
    setConfigVehicle(vehicle)
    setConfigOpen(true)
  }

  function handleBookmark(vehicle: Vehicle) {
    console.log("[Portfolio] bookmark:", vehicle.id)
    toast.info(`Marcado: ${vehicle.brand} ${vehicle.model}`)
  }

  function handlePrevCondition(vehicle: Vehicle) {
    const versions = configMap[vehicle.id] ?? []
    if (versions.length < 2) return
    setActiveVersion((prev) => {
      const cur = prev[vehicle.id] ?? 0
      const next = cur <= 0 ? versions.length - 1 : cur - 1
      toast.info(`Condição ${next + 1} de ${versions.length}`)
      return { ...prev, [vehicle.id]: next }
    })
  }

  function handleNextCondition(vehicle: Vehicle) {
    const versions = configMap[vehicle.id] ?? []
    if (versions.length < 2) return
    setActiveVersion((prev) => {
      const cur = prev[vehicle.id] ?? 0
      const next = cur >= versions.length - 1 ? 0 : cur + 1
      toast.info(`Condição ${next + 1} de ${versions.length}`)
      return { ...prev, [vehicle.id]: next }
    })
  }

  function handleConfigSave(vehicleId: string, config: VehicleCommercialConfig) {
    const versions = configMap[vehicleId] ?? []
    const idx = getActiveIndex(vehicleId)

    if (versions.length === 0) {
      setConfigMap((prev) => ({ ...prev, [vehicleId]: [config] }))
      setActiveVersion((prev) => ({ ...prev, [vehicleId]: 0 }))
    } else {
      setConfigMap((prev) => {
        const updated = [...(prev[vehicleId] ?? [])]
        updated[idx] = config
        return { ...prev, [vehicleId]: updated }
      })
    }

    const params = countConfiguredParams(config)
    toast.success(`Condição salva (${params} parâmetro${params !== 1 ? "s" : ""})`)
  }

  function handleConfigNew(vehicleId: string, copiedConfig: VehicleCommercialConfig) {
    setConfigMap((prev) => {
      const versions = [...(prev[vehicleId] ?? []), copiedConfig]
      return { ...prev, [vehicleId]: versions }
    })
    setActiveVersion((prev) => {
      const newIdx = (configMap[vehicleId]?.length ?? 0)
      return { ...prev, [vehicleId]: newIdx }
    })
    const total = (configMap[vehicleId]?.length ?? 0) + 1
    toast.info(`Nova condição ${total} criada (cópia)`)
  }

  function getSheetProps() {
    if (!configVehicle) return {}
    const versions = configMap[configVehicle.id] ?? []
    const idx = getActiveIndex(configVehicle.id)
    return {
      initialConfig: versions[idx],
      currentVersion: versions.length > 0 ? idx + 1 : 1,
      totalVersions: versions.length,
    }
  }

  function handleSheetNext() {
    if (!configVehicle) return
    handleNextCondition(configVehicle)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {vehicles.length > 0 ? (
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4 [column-width:140px] sm:[column-width:200px]">
          {vehicles.map((vehicle) => (
              <VehicleDeck
                key={vehicle.id}
                vehicle={vehicle}
                configs={configMap[vehicle.id] ?? []}
                activeIndex={getActiveIndex(vehicle.id)}
                onNextCondition={() => handleNextCondition(vehicle)}
                onView={handleView}
                onEdit={handleEdit}
                onBookmark={handleBookmark}
                className="pb-10 break-inside-avoid"
              />
            ))}
        </div>
      ) : (
        <PortfolioEmptyState onAddVehicle={() => toast.info("Em breve")} />
      )}

      <VehicleConfigSheet
        vehicle={configVehicle}
        open={configOpen}
        onOpenChange={setConfigOpen}
        onSave={handleConfigSave}
        onNew={handleConfigNew}
        onNext={handleSheetNext}
        {...getSheetProps()}
      />
    </div>
  )
}