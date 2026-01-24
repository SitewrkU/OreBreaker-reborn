import { useQuestStore } from "../store/questStore";
import type { QuestObjectiveType, ObjectiveTargetMap } from "@/entities/quest/type";
import type { ItemId } from "@/data/items";

export const trackQuestProgress = <T extends QuestObjectiveType>
  (type: T, target: ObjectiveTargetMap[T], amount: number = 1) => {

  const { quests, updateObjective } = useQuestStore.getState()
  const activeQuests = quests.filter(q => q.status === 'active');

  activeQuests.forEach(quest => {
    quest.objectives.forEach(objective => {
      if(objective.type === type && objective.target === target){
        updateObjective(quest.id, objective.id, objective.currentCount + amount)
      }
    })
  })
}


export const questTrackers = {
  mineOre: (oreId: string) => {
    trackQuestProgress("mine_ore", oreId, 1)
  },
  collectItem: (itemId: ItemId, amount: number) => {
    trackQuestProgress("collect_item", itemId, amount)
  },
  breakPickaxe: () => {
    trackQuestProgress("break_pickaxe", null, 1)
  }
}