import type { QuestReward } from "@/entities/quest/type"
import { useInventoryStore } from "@/features/inventory/store/inventoryStore"
import { usePickaxeStore } from "@/features/pickaxe/store/pickaxeStore"
import { items } from "@/data/items"

export const giveQuestRewards = (rewards: QuestReward[]) => {
  const {addItem} = useInventoryStore.getState()
  const {addPickaxe} = usePickaxeStore.getState()

  rewards.forEach(reward => {
    switch (reward.type) {
      case "item":
        if(reward.id){
          const item = items[reward.id]
          addItem(item, reward.amount)
        }
        break;
      case "pickaxe":
        if(reward.id){
          const pickaxe = items[reward.id];
          if ('pickaxe' in pickaxe) {
            addPickaxe(pickaxe);
          }
        }

        break;
    }
  })
}