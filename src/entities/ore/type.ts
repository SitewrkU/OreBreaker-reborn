import type { ItemDrop } from "../item/type";

export type OreRarity =
  | 'Default' 
  | 'Rare'
  | 'Epic'
  | 'Legendary'
  | 'Mythical'

export interface Ore {
  id: string;
  name: string;
  chance: number;
  health: number;
  powerToDestr: number;
  rarity: OreRarity;
  src: string;
  drop: ItemDrop[]
}

export interface Mine {
  id: string;
  name: string;
  ores: Ore[];
}