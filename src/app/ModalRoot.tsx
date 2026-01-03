import { useUIStore } from "@/shared/store/uiStore"
import { Inventory } from "@/features/inventory/components/Inventory"

const MODALS = {
  inventory: Inventory,
} as const

export const ModalRoot = () => {
  const modal = useUIStore((s) => s.modal)
  if (!modal) return null

  const ModalComponent = MODALS[modal]
  return ModalComponent ? <ModalComponent /> : null
}
