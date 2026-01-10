import type { Item } from "@/entities/item/type";
import type { PickaxeTemplate } from "@/entities/pickaxe/type";
import { getResourcePath, getToolPath } from "@/shared/config/assets";

export const items = {
  stonePart: {
    id: 'stone_part', name: 'Кусочок камня', src: getResourcePath('stone-part.png')
  } satisfies Item,
  coal: {
    id: 'coal', name: 'Вугілля', src: getResourcePath('coal.png')
  } satisfies Item,

  bero: {
    id: 'bero', name: 'Беро', src: getToolPath('bero.png')
  } satisfies Item,
  
  stonePickaxe: {
    id: 'stone_pickaxe',
    name: 'Кам\'яна кірка',
    src: getToolPath('stone-pickaxe.png'),
    pickaxe: {
      desc: 'Проста кам\'яна кірка, використовується початковими шахтарями',
      damage: 100,
      power: 2,
      maxDurability: 100,
      durability: 100,
    }
  } satisfies PickaxeTemplate,

  hand: {
    id: 'hand',
    name: 'Рука',
    src: getToolPath('hand.png'),
    pickaxe: {
      desc: 'Інструмент, звеличений понад усе суще. Він не був створений – і не може бути зламаний. Він уже належить тобі. Неси його з честю і мудрістю, воїне.',
      damage: 1,
      power: 2,
      maxDurability: Infinity,
      durability: Infinity,
    }
  } satisfies PickaxeTemplate
}