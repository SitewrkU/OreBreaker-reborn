import { useEffect } from "react";
import { items } from "@/data/items";
import { usePickaxeStore } from "@/features/pickaxe/store/pickaxeStore";

export function useInitItems() {
  const addPickaxe = usePickaxeStore(state => state.addPickaxe)

  useEffect(() => {
    addPickaxe(items.hand)
    addPickaxe(items.stonePickaxe)
    addPickaxe(items.stonePickaxe)
  }, [])
}