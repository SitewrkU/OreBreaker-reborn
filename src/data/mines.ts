import type { Mine } from "@/entities/ore/type";
import { items } from "./items";
import { getOrePath } from "@/shared/config/assets";

export const mines: Record<string, Mine> = {
  standart: {
    id: 'standart',
    name: 'Standart Mine',
    ores: [
      {
        id: 'stone_ore',
        name: 'Stone ore',
        rarity: 'Default',
        src: getOrePath('stone-ore.png'),
        chance: 50,
        health: 50,
        powerToDestr: 1,
        drop: [
          {
            ...items.stonePart,
            chance: [
              { minCount: 1, maxCount:3, dropChance: 100}
            ]
          }
        ]
      },
      {
        id: 'coal_ore',
        name: 'Coal ore',
        rarity: 'Default',
        src: getOrePath('coal-ore.png'),
        chance: 30,
        health: 60,
        powerToDestr: 1,
        drop: [
          {
            ...items.stonePart,
            chance: [
              { minCount: 2, maxCount:6, dropChance: 100}
            ]
          }
        ]
      },
      {
        id: 'iron-ore',
        name: 'Iron ore',
        rarity: 'Rare',
        src: getOrePath('iron-ore.png'),
        chance: 20,
        health: 80,
        powerToDestr: 1,
        drop: [
          {
            ...items.stonePart,
            chance: [
              { minCount: 3, maxCount:9, dropChance: 100}
            ]
          }
        ]
      }
    ]
  }
}

export const getCurrentMine = () => mines.standart;
