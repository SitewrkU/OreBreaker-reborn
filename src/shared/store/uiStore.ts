import { create } from "zustand";

type ModalType = 
  'inventory' 
  | null

type UIState = {
  modal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}))