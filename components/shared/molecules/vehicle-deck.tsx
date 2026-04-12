"use client"

import { useState, useCallback } from "react"
import type { Vehicle } from "@/types/crm"
import type { VehicleCommercialConfig } from "@/components/shared/organisms/vehicle-config-sheet"
import { countConfiguredParams } from "@/components/shared/organisms/vehicle-config-sheet"
import { VehicleCard } from "./vehicle-card"
import { cn } from "@/lib/utils"

const TRANSITION_MS = 1000
const CARD_OFFSET = 12
const CARD_SCALE_STEP = 0.02
const MAX_VISIBLE_DEPTH = 2

interface VehicleDeckProps {
  vehicle: Vehicle
  configs: VehicleCommercialConfig[]
  activeIndex: number
  onNextCondition?: () => void
  onEdit?: (vehicle: Vehicle) => void
  onView?: (vehicle: Vehicle) => void
  onBookmark?: (vehicle: Vehicle) => void
  className?: string
}

export function VehicleDeck({
  vehicle,
  configs,
  activeIndex,
  onNextCondition,
  onEdit,
  onView,
  onBookmark,
  className,
}: VehicleDeckProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Ordena as configs: ativa primeiro, depois as demais em ordem circular
  const cardCount = Math.max(1, configs.length)
  const stackCount = cardCount - 1 // quantas ficam atrás

  const handleNext = useCallback(() => {
    if (isAnimating || !onNextCondition) return
    setIsAnimating(true)

    setTimeout(() => {
      onNextCondition()
      setIsAnimating(false)
    }, TRANSITION_MS)
  }, [isAnimating, onNextCondition])

  // Monta o deck na ordem circular a partir do ativo
  // depth 0 = topo (ativo), depth 1 = próximo a mostrar, depth 2 = depois, etc.
  const stack = Array.from({ length: cardCount }, (_, i) => {
    const configIndex = (activeIndex + i) % cardCount
    return {
      configIndex,
      config: configs[configIndex] as VehicleCommercialConfig | undefined,
      depth: i,
    }
  })

  return (
    <div
      data-slot="deck"
      className={cn("relative", className)}
      style={{ marginBottom: `${24 - Math.min(stackCount, MAX_VISIBLE_DEPTH) * CARD_OFFSET}px`, paddingBottom: stackCount > 0 ? `${Math.min(stackCount, MAX_VISIBLE_DEPTH) * CARD_OFFSET}px` : undefined }}
    >
      {/* Placeholder invisível que mantém a altura do container */}
      <div data-slot="deck-spacer" className="pointer-events-none invisible">
        <VehicleCard
          vehicle={vehicle}
          configCount={0}
          discountPercent={0}
          versionCount={cardCount}
          currentVersion={activeIndex + 1}
        />
      </div>

      {stack.map(({ configIndex, config, depth }) => {
        const isTop = depth === 0
        const isExiting = isTop && isAnimating

        // Posição visual com cap
        // Quando animando, os cards de trás sobem 1 nível (como no demo)
        let visualDepth: number
        if (isAnimating && !isExiting) {
          visualDepth = Math.min(depth - 1, MAX_VISIBLE_DEPTH)
        } else {
          visualDepth = Math.min(depth, MAX_VISIBLE_DEPTH)
        }

        // Card saindo: sobe e some (igual demo: -60px, scale 1.05, opacity 0)
        const translateY = isExiting ? -60 : visualDepth * CARD_OFFSET
        const scale = isExiting ? 1.05 : 1 - visualDepth * CARD_SCALE_STEP
        const opacity = isExiting ? 0 : 1
        // z-index NUNCA muda durante animação — sempre baseado no depth original
        const zIndex = cardCount - depth

        return (
          <div
            key={configIndex}
            data-slot={isTop && !isExiting ? "deck-card" : "deck-edge"}
            className="absolute inset-x-0 top-0"
            style={{
              transform: `translateY(${translateY}px) scale(${scale})`,
              zIndex,
              opacity,
              filter: isExiting ? undefined : `brightness(${1 - visualDepth * 0.25})`,
              transition: `all ${TRANSITION_MS}ms cubic-bezier(0.25, 0.8, 0.25, 1)`,
              pointerEvents: isTop && !isExiting ? undefined : "none",
            }}
          >
            <VehicleCard
              vehicle={vehicle}
              configCount={config ? countConfiguredParams(config) : 0}
              discountPercent={config?.discount ?? 0}
              versionCount={cardCount}
              currentVersion={configIndex + 1}
              onNextCondition={handleNext}
              onEdit={onEdit}
              onView={onView}
              onBookmark={onBookmark}
            />
          </div>
        )
      })}
    </div>
  )
}
