import { useSound } from "@/shared/lib/audio/useSound";

export const useMiningSound = () => {
  const playStoneKick1 = useSound('stone-kick1')
  const playStoneKick2 = useSound('stone-kick2')
  const playStoneKick3 = useSound('stone-kick3')

  const miningSounds = [playStoneKick1, playStoneKick2, playStoneKick3]

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * miningSounds.length);
    miningSounds[randomIndex]();
  }

  return playRandomSound;
}