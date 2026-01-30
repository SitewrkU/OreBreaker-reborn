import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import type { Pickaxe, PickaxeTemplate } from "@/entities/pickaxe/type";
import { questTrackers } from "@/features/quests/lib/questProgress";

interface PickaxeState {
  currentPickaxeId: string | null;
  pickaxes: Pickaxe[];

  addPickaxe: (template: PickaxeTemplate) => void; //template - just link on items
  removePickaxe: (instanceId: string) => void;
  setCurrentPickaxe: (instanceId: string) => void;
  removeCurrentPickaxe: () => void;
  damagePickaxe: (amount: number) => void;
}

export const usePickaxeStore = create<PickaxeState>()(
  immer((set) => ({
    currentPickaxeId: null,
    pickaxes: [],

    addPickaxe: (template) => set((state) => {
      const newPickaxe: Pickaxe = {
        ...template,
        instanceId: nanoid(),
        pickaxe: {
          ...template.pickaxe,
          durability: template.pickaxe.maxDurability
        }
      };
      state.pickaxes.push(newPickaxe)
    }),

    removePickaxe: (instanceId) => set((state) => {
      state.pickaxes = state.pickaxes.filter(p => p.instanceId !== instanceId)
      if(state.currentPickaxeId === instanceId){
        state.currentPickaxeId = null;
      }
    }),

    setCurrentPickaxe: (instanceId) => set((state) => {
      const exist = state.pickaxes.some(p => p.instanceId === instanceId)
      state.currentPickaxeId = exist ? instanceId : null;
    }),

    removeCurrentPickaxe: () => set((state) => {
      state.currentPickaxeId = null;
    }),

    damagePickaxe: (amount = 1) => set((state) => {
      const id = state.currentPickaxeId;
      if(!id) return;

      const pickaxe = state.pickaxes.find(p => p.instanceId === id)
      if(!pickaxe){
        state.currentPickaxeId = null
        return;
      }

      pickaxe.pickaxe.durability -= amount;

      if(pickaxe.pickaxe.durability <= 0){
        state.pickaxes = state.pickaxes.filter(p => p.instanceId !== id)
        state.currentPickaxeId = null;

        questTrackers.breakPickaxe()
      }
    }) 
  }))
)