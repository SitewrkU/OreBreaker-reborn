import { Modal } from "@/shared/ui/Modal/Modal";
import { useUIStore } from "@/shared/store/uiStore";
import { usePickaxeStore } from "../store/pickaxeStore"
import { useCurrentPickaxe } from "../hooks/useCurrentPickaxe";
import { useSound } from "@/shared/lib/audio/useSound";
import useEmblaCarousel from 'embla-carousel-react'
import styles from './PickaxeInventory.module.css'

import { 
  Heart,
  Flame,
  ArrowBigUpDash,
  Infinity as InfinityIcon,
} from 'lucide-react';

export const PickaxeInventory = () => {
  const { modal, closeModal } = useUIStore()
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 'auto',
  })

  const pickaxes = usePickaxeStore(state => state.pickaxes)
  const currentPickaxe = useCurrentPickaxe();
  const setCurrentPickaxe = usePickaxeStore(state => state.setCurrentPickaxe)

  const playSelect = useSound('select');

  function handlePickaxeClick(Id: string) {
    if(currentPickaxe?.instanceId === Id) return
    setCurrentPickaxe(Id)
    playSelect()
  }

  return (
    <Modal
      open={modal === 'pickaxes'}
      onClose={closeModal}
      title="Кірки"
      className={styles.Modal}
    >
      {pickaxes.length === 0 ? (
        <p>Немає кірок!</p>
      ):(
        <>
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.pickaxesContainer}>
            {pickaxes.map(item => (
              <div 
                key={item.instanceId} 
                onClick={() => handlePickaxeClick(item.instanceId)}
                className={styles.pickaxeItem}
              >

                <div className={styles.mainStats}>
                <img src={item.src} alt={item.name} />
                  <div className={styles.stats}>
                    <p className={styles.hp}>
                      <Heart/>
                      {item.pickaxe.durability === Infinity ? 
                      <InfinityIcon className={styles.infIcon}/> : item.pickaxe.durability}
                      <span className={styles.hpDefPar}>
                        /
                        {item.pickaxe.maxDurability === Infinity ? 
                        <InfinityIcon className={styles.infIcon}/> : item.pickaxe.maxDurability}
                      </span>
                    </p>
                    <p className={styles.dmg}><Flame/>{item.pickaxe.damage}</p>
                    <p className={styles.pwr}><ArrowBigUpDash/>{item.pickaxe.power}</p>
                  </div>
                </div>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.desc}>{item.pickaxe.desc}</p>
                {currentPickaxe?.instanceId === item.instanceId ? (
                  <p>Вибрано!</p>
                ) : null}

              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </Modal>
  )
}
