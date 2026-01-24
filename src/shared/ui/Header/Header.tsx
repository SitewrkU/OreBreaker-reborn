import { useUIStore } from "@/shared/store/uiStore"
import { useSound } from "@/shared/lib/audio/useSound"
import type { ModalType } from "@/shared/store/uiStore"
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

  const handleOpen = (modalName: ModalType) => {
    openModal(modalName)
    playOpen()
  }

  return (
    <div className={styles.header}>
      <button onMouseEnter={playHover} onClick={() => handleOpen('inventory')}><Stone/></button>
      <button onMouseEnter={playHover} onClick={() => handleOpen('pickaxes')}><Pickaxe/></button>
      <button onMouseEnter={playHover}><Anvil/></button>
      <button onMouseEnter={playHover} onClick={() => handleOpen('quests')}><Scroll/></button>
      <button onMouseEnter={playHover}><ShoppingBag/></button>
      <button onMouseEnter={playHover}><Settings/></button>
    </div>
  )
}
