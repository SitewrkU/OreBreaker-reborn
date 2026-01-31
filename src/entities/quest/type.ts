import type { ItemId } from "@/data/items";

//Quest types
export type ObjectiveTargetMap = {
  mine_ore: string;
  collect_item: ItemId;
  break_pickaxe: null;
};
export type QuestObjectiveType = keyof ObjectiveTargetMap;


export type QuestObjective = {
  [K in keyof ObjectiveTargetMap]: {
    id: string;
    type: K;
    target: ObjectiveTargetMap[K];
    requiredCount: number;
    currentCount: number;
    desc: string;
  }
}[keyof ObjectiveTargetMap];

export interface QuestReward {
  type: 'item' | 'pickaxe';
  id: ItemId;
  amount: number;
}

export interface QuestRewardInstance extends QuestReward {
  instanceId: string;
}

export interface Quest {
  id: string;
  title: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  status: 'locked' | 'active' | 'completed';
  requiresQuests?: string[];
}

export interface QuestInstance extends Quest {
  instanceId: string;
  isRewarded: boolean;
  hidden: boolean;
  rewards: QuestRewardInstance[];
}

export type QuestTemplate = Omit<Quest, 'status'>;