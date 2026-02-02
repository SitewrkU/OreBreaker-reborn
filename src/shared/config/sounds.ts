import { getSoundPath } from "./assets";
import type { SoundId } from "../lib/audio/types";

export const SOUND_PATHS: Record<SoundId, string> = {
  hover: getSoundPath('hover.ogg'),
  select: getSoundPath('select.ogg'),
  "open-modal": getSoundPath('open-menu.ogg'),
  "unselect": getSoundPath('unselect.ogg')
}