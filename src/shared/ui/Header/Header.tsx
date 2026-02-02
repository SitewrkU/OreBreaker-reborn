import { useUIStore } from "@/shared/store/ModalStore"
import { useQuestStore } from "@/features/quests/store/questStore"
import { useSound } from "@/shared/lib/audio/useSound"
import type { ModalType } from "@/shared/store/ModalStore"
import { 
  Stone, 
  Pickaxe,
  Anvil,
  Scroll, 
  ShoppingBag,
  Settings,
} from "lucide-react"
import styles from './Header.module.css'

export const Header = () => {
  const openModal = useUIStore((s) => s.openModal)

  const playHover = useSound('hover')
  const playOpen = useSound('open-modal')

  const newCompletedCount = useQuestStore(state => state.newCompletedCount)
  const clearNewCompletedCount = useQuestStore(state => state.clearNewCompletedCount)

  const handleOpen = (modalName: ModalType) => {
    openModal(modalName)
    playOpen()
    clearNewCompletedCount()
  }

  return (
    <div className={styles.header}>
      <button onMouseEnter={playHover} onClick={() => handleOpen('inventory')}><Stone/></button>
      <button onMouseEnter={playHover} onClick={() => handleOpen('pickaxes')}><Pickaxe/></button>
      <button onMouseEnter={playHover}><Anvil/></button>

      <button onMouseEnter={playHover} onClick={() => handleOpen('quests')}>
        {newCompletedCount > 0 && (
          <span className={styles.badge}>
            {newCompletedCount}
          </span>
        )}
        <Scroll/>
      </button>

      <button onMouseEnter={playHover}><ShoppingBag/></button>
      <button onMouseEnter={playHover}><Settings/></button>
    </div>
  )
}
