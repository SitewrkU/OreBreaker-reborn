import { useQuestStore } from "../store/questStore";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useUIStore } from "@/shared/store/ModalStore";

import { QuestCard } from "./QuestCard/QuestCard";
import clsx from "clsx";
import styles from './QuestList.module.css'
import scroll from '@/shared/ui/Scrollbar/scrollbar.module.css'
import { 
  Scroll, 
} from "lucide-react"

export const QuestsList = () => {
  const { modal, closeModal } = useUIStore()
  
  const quests = useQuestStore(state => state.quests)
  const comletedQuests = quests.filter( quest => quest.status === 'completed' && !quest.hidden );

  const visibleQuests = 
    quests.filter( quest => (quest.status === 'active' || quest.status === 'completed') && !quest.hidden )
    .sort((a, b) => { //Pri system: first CompletedNotRewarded => Active => CompletedRewarded
      const priA = a.status === 'completed' 
        ? (a.isRewarded ? 2 : 0) 
        : 1; // active = 1

      const priB = b.status === 'completed' 
        ? (b.isRewarded ? 2 : 0) 
        : 1;

      return priA - priB;
    });

  return (
    <Modal
      open={modal === 'quests'}
      onClose={closeModal}
      title="Квести"
      className={styles.Modal}
    >
      <p className={styles.questsCount}><Scroll/>{comletedQuests.length}/{visibleQuests.length}</p>
      <div className={clsx(styles.questList, scroll.scroll)}>
        {visibleQuests.length === 0 ? (
          <p style={{textAlign: "center"}}>Доступних квестів немає!</p>
        ) : (
          visibleQuests.map(quest => (
            <QuestCard key={quest.instanceId} quest={quest}/>
          ))
        )}
      </div>
    </Modal>
  )
}
