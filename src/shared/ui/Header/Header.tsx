import { useUIStore } from "@/shared/store/uiStore"
import { 
  Stone, 
  Pickaxe,
  Scroll, 
  Settings,
} from "lucide-react"
import styles from './Header.module.css'

export const Header = () => {
  const openModal = useUIStore((s) => s.openModal)
  return (
    <div className={styles.header}>
      <button onClick={() => openModal('inventory')}><Stone/></button>
      <button onClick={() => openModal('inventory')}><Pickaxe/></button>
      <button><Scroll/></button>
      <button><Settings/></button>
    </div>
  )
}
