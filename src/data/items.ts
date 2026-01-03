import type { Item } from "@/entities/item/type";
import type { PickaxeTemplate } from "@/entities/pickaxe/type";
import { getResourcePath, getToolPath } from "@/shared/config/assets";

export const items = {
  stonePart: {
    id: 'stone_part', name: 'Piece of stone', src: getResourcePath('stone-part.png')
  } satisfies Item,
  coal: {
    id: 'coal', name: 'Coal', src: getResourcePath('coal.png')
  } satisfies Item,
  
  stonePickaxe: {
    id: 'stone_pickaxe',
    name: 'Stone Pickaxe',
    src: getToolPath('stone-pickaxe.png'),
    pickaxe: {
      desc: 'A common stone pickaxe used by novice miners.',
      damage: 10,
      power: 2,
      maxDurability: 100
    }
  } satisfies PickaxeTemplate,

  hand: {
    id: 'hand',
    name: 'Hand',
    src: getToolPath('hand.png'),
    pickaxe: {
      desc: 'An instrument exalted beyond all. It demands no crafting and knows no repair. It is already yours — wield it with wisdom, warrior.',
      damage: 1,
      power: 2,
      maxDurability: Infinity
    }
  } satisfies PickaxeTemplate
}