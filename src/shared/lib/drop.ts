import type { InventoryItem, DroppedItem } from "@/entities/item/type";
import type { Ore } from "@/entities/ore/type";
import { getRandomInt } from "./random";

export function generateOreDrop(ore: Ore): DroppedItem[]{
  const drops: DroppedItem[] = []

  ore.drop?.forEach(dropItem => {
    dropItem.chance.forEach(chanceConfig => {
      const roll = Math.random() * 100

      if(roll <= chanceConfig.dropChance){
        const amount = getRandomInt(chanceConfig.minCount, chanceConfig.maxCount)

        const inventoryItem: InventoryItem = {
          id: dropItem.id,
          name: dropItem.name,
          src: dropItem.src,
          amount
        }

        drops.push({
          item: inventoryItem,
          dropChance: chanceConfig.dropChance
        })
      }
    })
  })

  return drops;
}