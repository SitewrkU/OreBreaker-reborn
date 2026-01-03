import { useInventoryStore } from "../store/inventoryStore"
import { Modal } from "@/shared/ui/Modal/Modal";
import { useUIStore } from "@/shared/store/uiStore";
import { MoonStar } from "lucide-react";
import styles from './Inventory.module.css'

export const Inventory = () => {
  const items = useInventoryStore(state => state.items);
  const { modal, closeModal } = useUIStore()
  return (
    <Modal
      open={modal === 'inventory'}
      onClose={closeModal}
      title="Inventory"
      className={styles.inventoryModal}
    >
      {items.length === 0 ? (
        <div>
          <MoonStar/>
          <p>Inventory is empty.</p>
        </div>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id}>
              <img src={item.src} alt={item.name} />
              <p>x{item.amount}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
