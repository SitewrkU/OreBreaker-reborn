import { useQuestStore } from "../../store/questStore"
import type { QuestInstance } from "@/entities/quest/type"
import { useShallow } from "zustand/shallow"
import { RewardItem } from "./RewardItem/RewardItem"

import styles from './QuestCard.module.css'
import clsx from "clsx"
import { 
  Trash2,
  Check,
} from "lucide-react"

export const QuestCard = ({ quest }: { quest: QuestInstance }) => {
  const { checkUnlocks, claimReward, setHidden } = useQuestStore(
    useShallow(s => ({
      checkUnlocks: s.checkUnlocks,
      claimReward: s.claimReward,
      setHidden: s.setHidden
    }))
  );
  const canClaim = quest.status === 'completed' && !quest.isRewarded

  const handleClaimReward = () => {
    claimReward(quest.id)
    checkUnlocks()
  }

  const handleSetHidden = () => {
    setHidden(quest.id)
  }

  return (
    <div className={clsx(styles.quest, quest.isRewarded && styles.rewarded)}>
      <h2><span>#</span> {quest.title}</h2>
      <Trash2 className={clsx(styles.hideQuest, quest.isRewarded && styles.canHide)} onClick={handleSetHidden}/>

      {quest.objectives.map(obj => (
        <div className={clsx( 
          styles.objective, 
          obj.currentCount > 0 && styles.objInProgress,
          obj.currentCount >= obj.requiredCount && styles.objCompleted
        )} key={obj.id}>
          <p className={styles.progress}>{obj.currentCount}/{obj.requiredCount}</p>
          <p className={styles.desc}>{obj.desc}</p>
        </div>
      ))}

      <hr />

      <div className={styles.rewards}>
        <p className={styles.rewardsHead}>Винагороди</p>
        <div className={styles.rewardsList}>
          {quest.rewards.map(reward => (
            <RewardItem key={reward.instanceId} reward={reward}/>
          ))}
        </div>
      </div>
      <button 
        onClick={handleClaimReward} 
        disabled={!canClaim} 
        className={clsx(styles.claimButton)}
      >
        <Check/>
      </button>
    </div>
  )
}
