import { useUIStore } from "@/shared/store/uiStore"
import { useSound } from "@/shared/lib/audio/useSound"
import { 
  Stone, 
  Pickaxe,
  Scroll, 
  Settings,
} from "lucide-react"
import styles from './Header.module.css'

export const Header = () => {
  const openModal = useUIStore((s) => s.openModal)

  const playHover = useSound('hover')
  return (
    <div className={styles.header}>
      <button onMouseEnter={playHover} onClick={() => openModal('inventory')}><Stone/></button>
      <button onMouseEnter={playHover} onClick={() => openModal('inventory')}><Pickaxe/></button>
      <button onMouseEnter={playHover}><Scroll/></button>
      <button onMouseEnter={playHover}><Settings/></button>
    </div>
  )
}
