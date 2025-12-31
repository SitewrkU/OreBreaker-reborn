import { create } from "zustand";
import type { Ore } from "@/entities/ore/type";
import { immer } from "zustand/middleware/immer";
import { getCurrentMine } from "@/data/mines";
import { selectRandomOre } from "@/shared/lib/random";

interface MiningState {
  currentOre: Ore | null;
  health: number;
  maxHealth: number;
  canSkip: boolean;

  setCurrentOre: (ore: Ore) => void;
  damageOre: (damage: number) => { destroyed: boolean};
  setCanSkip: (value: boolean) => void;
  generateNewOre: () => void;
}

export const useMiningStore = create<MiningState>()(
  immer((set) => ({
    currentOre: null,
    health: 20,
    maxHealth: 20,
    canSkip: true,

    setCurrentOre: (ore) => set((state) => {
      state.currentOre = ore;
      state.health = ore.health;
      state.maxHealth = ore.health;
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