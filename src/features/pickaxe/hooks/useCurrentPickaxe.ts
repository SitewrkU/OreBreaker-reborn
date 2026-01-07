import { usePickaxeStore } from "../store/pickaxeStore";
export const useCurrentPickaxe = () =>
  usePickaxeStore(state =>
    state.pickaxes.find(p => p.instanceId === state.currentPickaxeId) ?? null
  );
