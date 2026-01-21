export interface Item {
  id: string;
  name: string;
  src: string;
}
export interface InventoryItem extends Item {
  amount: number;
}

//Full dropped item info
export interface DroppedItem {
  item: InventoryItem;
  dropChance: number;
}

// For data
export interface DropChance {
  minCount: number;
  maxCount: number;
  dropChance: number;
}
export interface ItemDrop extends Item {
  chance: DropChance[];
}