import { create } from "zustand";
import type { Ore } from "@/entities/ore/type";
import type { DroppedItem } from "@/entities/item/type";
import { immer } from "zustand/middleware/immer";
import { getCurrentMine } from "@/data/mines";
import { selectRandomOre } from "@/shared/lib/random";

interface MiningState {
  currentOre: Ore | null;
  currentDrop: DroppedItem[] | null;
  health: number;
  maxHealth: number;
  canSkip: boolean;

  setCurrentOre: (ore: Ore) => void;
  setCurrentDrop: (drop: DroppedItem[]) => void;
  damageOre: (damage: number) => { destroyed: boolean};
  setCanSkip: (value: boolean) => void;
  generateNewOre: () => void;
}

export const useMiningStore = create<MiningState>()(
  immer((set) => ({
    currentOre: null,
    currentDrop: null,
    health: 0,
    maxHealth: 0,
    canSkip: true,

    setCurrentOre: (ore) => set((state) => {
      state.currentOre = ore;
      state.health = ore.health;
      state.maxHealth = ore.health;
    }),

    setCurrentDrop: (drop) => set((state) => {
      state.currentDrop = drop;
    }),

    damageOre: (damage) => { 
      let destroyed = false;
      set((state) => {
        if (!state.currentOre) return;
        state.health = Math.max(0, state.health - damage);
        destroyed = state.health <= 0;
      })

      return {destroyed};
    },

    setCanSkip: (value) => set({ canSkip: value }),

    generateNewOre: () => set((state) => {
      const mine = getCurrentMine();  
      const newOre = selectRandomOre(mine.ores);
      console.log(newOre)
      state.currentOre = newOre;
      state.health = newOre.health;
      state.maxHealth = newOre.health;
    }),
  }))
)