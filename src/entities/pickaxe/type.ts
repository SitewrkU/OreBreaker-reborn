import type { Item } from "../item/type";

export interface PickaxeStats {
  desc: string;
  damage: number;
  maxDurability: number;
  durability: number;
  power: number;
}

export interface PickaxeTemplate extends Item {
  pickaxe: PickaxeStats;
}

export interface Pickaxe extends PickaxeTemplate {
  instanceId: string;
}