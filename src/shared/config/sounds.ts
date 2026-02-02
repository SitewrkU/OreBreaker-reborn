import { getSoundPath } from "./assets";
import type { SoundId } from "../lib/audio/types";

export const SOUND_PATHS: Record<SoundId, string> = {
  hover: getSoundPath('hover.ogg'),
  select: getSoundPath('select.ogg'),
  "open-modal": getSoundPath('open-menu.ogg'),
  "unselect": getSoundPath('unselect.ogg'),
  "stone-kick1": getSoundPath('stone-kick1.ogg'),
  "stone-kick2": getSoundPath('stone-kick2.ogg'),
  "stone-kick3": getSoundPath('stone-kick3.ogg'),
  "quest-complete": getSoundPath('quest-complete.ogg'),
}