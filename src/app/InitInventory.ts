import { useEffect } from "react";
import { items } from "@/data/items";
import { usePickaxeStore } from "@/features/pickaxe/store/pickaxeStore";
import { useInventoryStore } from "@/features/inventory/store/inventoryStore";

export function useInitItems() {
  const addPickaxe = usePickaxeStore(state => state.addPickaxe)
  const addItem = useInventoryStore(state => state.addItem)

  useEffect(() => {
    addPickaxe(items.hand)
    addPickaxe(items.stonePickaxe)
    addPickaxe(items.stonePickaxe)
  }, [])
}