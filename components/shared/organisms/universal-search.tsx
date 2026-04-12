"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Car01Icon,
  MoneyBag02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons"

import type { UniversalSearchItem, UniversalSearchGroup } from "@/types/crm"
import { useSearch } from "@/hooks/use-search"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"

const groupConfig: Record<
  UniversalSearchGroup,
  { label: string; icon: typeof Car01Icon }
> = {
  portfolio: { label: "Portfólio", icon: Car01Icon },
  negociacoes: { label: "Negociações", icon: MoneyBag02Icon },
  contatos: { label: "Contatos", icon: UserMultiple02Icon },
}

interface UniversalSearchProps {
  items: UniversalSearchItem[]
}

export function UniversalSearch({
  items,
}: UniversalSearchProps) {
  const { open, setOpen: onOpenChange } = useSearch()
  const router = useRouter()

  const grouped = React.useMemo(() => {
    const groups: Record<UniversalSearchGroup, UniversalSearchItem[]> = {
      portfolio: [],
      negociacoes: [],
      contatos: [],
    }
    for (const item of items) {
      groups[item.group].push(item)
    }
    return groups
  }, [items])

  const groupKeys = (
    Object.keys(grouped) as UniversalSearchGroup[]
  ).filter((key) => grouped[key].length > 0)

  function handleSelect(item: UniversalSearchItem) {
    onOpenChange(false)
    console.log("[UniversalSearch] navigate to:", item.href, "item:", item.id)
    router.push(item.href)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Busca universal"
      description="Busque veículos, negociações e contatos"
    >
      <CommandInput placeholder="Buscar veículos, contatos, negociações..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        {groupKeys.map((groupKey, index) => {
          const config = groupConfig[groupKey]
          return (
            <React.Fragment key={groupKey}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={config.label}>
                {grouped[groupKey].map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.label} ${item.description}`}
                    onSelect={() => handleSelect(item)}
                  >
                    <HugeiconsIcon
                      icon={config.icon}
                      strokeWidth={2}
                      data-icon="inline-start"
                    />
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}
