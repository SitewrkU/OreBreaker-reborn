import { useCallback } from "react";
import { soundManager } from "./soundManager";
import type { SoundId } from "./types";

export const useSound = (id: SoundId) => {
  const play = useCallback(() => {
    soundManager.play(id);
  }, [id]);
  
  return play;
};