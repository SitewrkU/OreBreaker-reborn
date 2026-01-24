import type { QuestTemplate } from "@/entities/quest/type";

export const quests: Record<string, QuestTemplate> = {
  journey_start: {
    id: 'journey_start',
    title: 'Шлях шахтаря: Початок',
    objectives: [
      {
        id: 'obj_1',
        type: 'mine_ore',
        desc: 'Добудьте трохи камню',
        target: 'stone_ore',
        requiredCount: 10,
        currentCount: 0,
      },
      {
        id: 'obj_2',
        type: 'mine_ore',
        desc: 'Не забудьте про вугільну породу!',
        target: 'coal_ore',
        requiredCount: 5,
        currentCount: 0,
      }
    ],
    rewards: [
      { type: "pickaxe", id: 'hand', amount: 1},
      { type: "pickaxe", id: 'stonePickaxe', amount: 1}
    ]
  },

  journey_aprove: {
    id: 'journey_aprove',
    title: 'Шлях шахтаря: Розвиток',
    objectives: [
      {
        id: 'obj_1',
        type: 'collect_item',
        desc: 'Отримайте 35 кусочків камня',
        target: 'stonePart',
        requiredCount: 35,
        currentCount: 0,
      },
      {
        id: 'obj_2',
        type: 'break_pickaxe',
        desc: 'Зламайте одну кірку',
        target: null,
        requiredCount: 1,
        currentCount: 0,
      },
    ],
    rewards: [
      { type: "item", id: 'sparkles', amount: 50}
    ],
    requiresQuests: ['journey_start']
  },
}

export const getQuestTemplate = (id: string) => quests[id];
export type QuestId = keyof typeof quests;