import { useInventoryStore } from "../store/inventoryStore"
import { Modal } from "@/shared/ui/Modal/Modal";
import { useUIStore } from "@/shared/store/ModalStore";
import clsx from "clsx";
import { MoonStar } from "lucide-react";
import styles from './Inventory.module.css'
import scroll from '@/shared/ui/Scrollbar/scrollbar.module.css'

export const Inventory = () => {
  const items = useInventoryStore(state => state.items);
  const { modal, closeModal } = useUIStore()
  return (
    <Modal
      open={modal === 'inventory'}
      onClose={closeModal}
      title="Інвентар"
      className={styles.inventoryModal}
    >
      {items.length === 0 ? (
        <div className={styles.empty}>
          <MoonStar size={64}/>
          <p>Інвентар поки пустий.</p>
        </div>
      ) : (
        <div className={clsx(styles.inventory, scroll.scroll)}>
          {items.map(item => (
            <div key={item.id} className={styles.inventoryItem}>
              <img src={item.src} alt={item.name} />
              <p>x{item.amount}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
