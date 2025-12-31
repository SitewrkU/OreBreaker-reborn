import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { InventoryItem, Item } from '@/entities/item/type';

interface InventoryState {
  items: InventoryItem[];

  addItem: (item: Item, amount: number) => void;
  removeItem: (itemId: string, amount: number) => void;
  hasItem: (itemId: string, amount: number) => boolean;
  getItem: (itemId: string) => InventoryItem | undefined;
  clear: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  immer((set, get) => ({
    items: [],

    addItem: (item, amount) => set((state) => {
      const exist = state.items.find(i => i.id === item.id)

      if(exist){
        exist.amount += amount;
      }else{
        state.items.push({ ...item, amount })
      }
    }),

    removeItem: (itemId, amount) => set((state) => {
      const item = state.items.find(i => i.id === itemId)
      if(!item) return;
      
      item.amount -= amount
      if(item.amount === 0){
        state.items = state.items.filter(i => i.id !== itemId)
      }
    }),

    hasItem: (itemId, amount) => {
      const item = get().items.find(i => i.id === itemId)
      return item ? item.amount >= amount : false;
    },

    getItem: (itemId) => {
      return get().items.find(i => i.id === itemId);
    },

    clear: () => set({items: []})
  }))
)