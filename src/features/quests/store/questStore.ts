import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import type { QuestInstance } from "@/entities/quest/type";
import { quests } from "@/data/quests";
import { giveQuestRewards } from "../lib/questReward";

interface QuestState {
  quests: QuestInstance[];
  
  initializeQuests: () => void;
  updateObjective: (questId: string, objectiveId: string, progress: number) => void;
  checkUnlocks: () => void;
  claimReward: (questId: string) => void;
  setHidden: (questId: string) => void;
  getActiveQuests: () => QuestInstance[];
  getCompletedQuests: () => QuestInstance[];
}

export const useQuestStore = create<QuestState>()(
  immer((set, get) => ({
    quests: [],


    initializeQuests: () => set((state) => {
      if (state.quests.length > 0) return;

      Object.values(quests).forEach(template => {
        const instance: QuestInstance = {
          ...template,
          instanceId: nanoid(),
          status: template.requiresQuests ? 'locked' : 'active',
          objectives: template.objectives.map(obj => ({ ...obj })),
          rewards: template.rewards.map(reward => ({ ...reward, instanceId: nanoid()})),
          isRewarded: false,
          hidden: false,
        }
        state.quests.push(instance)
      })
    }),


    updateObjective: (questId, objectiveId, progress) => set((state) => {
      const quest = state.quests.find(q => q.id === questId)
      if(!quest || quest.status === 'completed') return

      const objective = quest.objectives.find(o => o.id === objectiveId)
      if(!objective) return

      objective.currentCount = Math.min(progress, objective.requiredCount) //add progress with required limit

      const allCompleted = quest.objectives.every(
        obj => obj.currentCount >= obj.requiredCount
      )
      if(allCompleted && quest.status === 'active'){
        quest.status = 'completed'
        get().checkUnlocks
      }
    }),

    checkUnlocks: () => set((state) => {
      state.quests.forEach(quest => {
        if (quest.status !== 'locked') return;
        if (!quest.requiresQuests) return;
        
        const allRequired = quest.requiresQuests.every(reqId => {
          const reqQuest = state.quests.find(q => q.id === reqId);
          return reqQuest?.status === 'completed';
        });
        
        if (allRequired) {
          quest.status = 'active';
        }
      });
    }),

    claimReward: (questId) => set((state) => {
      const quest = state.quests.find(q => q.id === questId)
      if(!quest) return

      if(quest.status !== 'completed') return
      if(quest.isRewarded) return

      giveQuestRewards(quest.rewards)
      quest.isRewarded = true
    }),

    setHidden: (questId) => set((state) => {
      const quest = state.quests.find(q => q.id === questId)
      if(!quest) return
      if(quest.status !== 'completed') return
      if(!quest.isRewarded) return

      quest.hidden = true
    }),

    getActiveQuests: () => {
      return get().quests.filter(q => q.status === 'active');
    },
    getCompletedQuests: () => {
      return get().quests.filter(q => q.status === 'completed');
    },
  }))
)