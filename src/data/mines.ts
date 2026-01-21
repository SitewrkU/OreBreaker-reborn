import type { Mine } from "@/entities/ore/type";
import { items } from "./items";
import { getOrePath } from "@/shared/config/assets";

export const mines: Record<string, Mine> = {
  standart: {
    id: 'standart',
    name: 'Стандартна шахта',
    ores: [
      {
        id: 'stone_ore',
        name: 'Груда каменю',
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
          },
          {
            ...items.bero,
            chance: [
              { minCount: 1, maxCount:1, dropChance: 4}
            ]
          }
        ]
      },
      {
        id: 'coal_ore',
        name: 'Вугільна порода',
        rarity: 'Default',
        src: getOrePath('coal-ore.png'),
        chance: 30,
        health: 60,
        powerToDestr: 1,
        drop: [
          {
            ...items.coal,
            chance: [
              { minCount: 4, maxCount:1002, dropChance: 100}
            ]
          },
          {
            ...items.stonePart,
            chance: [
              { minCount: 2, maxCount:3, dropChance: 30}
            ]
          }
        ]
      },
      {
        id: 'iron-ore',
        name: 'Залізна руда',
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