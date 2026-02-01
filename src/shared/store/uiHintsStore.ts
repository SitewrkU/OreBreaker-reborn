import { create } from "zustand";

interface UIHintsState {
  highlightedElement: string | null;
  highlightElement: (elementId: string, duration?: number) => void;
  clearHighlight: () => void;
}

export const useUIHints = create<UIHintsState>((set) => ({
  highlightedElement: null,
  
  highlightElement: (elementId: string, duration = 2000) => {
    set({ highlightedElement: elementId });
    
    setTimeout(() => {
      set({ highlightedElement: null });
    }, duration);
  },
  
  clearHighlight: () => set({ highlightedElement: null }),
}));