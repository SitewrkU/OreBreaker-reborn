import { useUIStore } from "@/shared/store/uiStore"
import { Inventory } from "@/features/inventory/components/Inventory"
import { PickaxeInventory } from "@/features/pickaxe/components/PickaxeInventory"

const MODALS = {
  inventory: Inventory,
  pickaxes: PickaxeInventory
} as const

export const ModalRoot = () => {
  const modal = useUIStore((s) => s.modal)
  if (!modal) return null

  const ModalComponent = MODALS[modal]
  return ModalComponent ? <ModalComponent /> : null
}
