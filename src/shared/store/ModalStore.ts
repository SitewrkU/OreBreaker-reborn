import { create } from "zustand";

export type ModalType = 
  'inventory' 
  | 'pickaxes'
  | 'quests'
  | null

type ModalState = {
  modal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

export const useUIStore = create<ModalState>((set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}))