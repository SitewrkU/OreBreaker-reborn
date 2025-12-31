import type { Ore } from "@/entities/ore/type";

export function selectRandomOre(ores: Ore[]): Ore{
  const totalChance = ores.reduce((sum, ore) => sum + ore.chance, 0)

  if(Math.abs(totalChance - 100) > 0.01){
    console.warn(`Total chances: ${totalChance}, expected 100`)
  }

  const random = Math.random() * 100
  let sum = 0;

  for(const ore of ores) {
    sum += ore.chance
    if(random <= sum){
      return ore;
    }
  }

  return ores[0];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}