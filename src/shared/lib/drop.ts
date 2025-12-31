import type { InventoryItem } from "@/entities/item/type";
import type { Ore } from "@/entities/ore/type";
import { getRandomInt } from "./random";

export function generateOreDrop(ore: Ore): InventoryItem[]{
  const drops: InventoryItem[] = []

  ore.drop?.forEach(dropItem => {
    dropItem.chance.forEach(chanceConfig => {
      const roll = Math.random() * 100

      if(roll <= chanceConfig.dropChance){
        const amount = getRandomInt(chanceConfig.minCount, chanceConfig.maxCount)

        drops.push({
          id: dropItem.id,
          name: dropItem.name,
          src: dropItem.src,
          amount
        })
      }
    })
  })

  return drops;
}