import { useCurrentPickaxe } from "@/features/pickaxe/hooks/useCurrentPickaxe";
import { getPercent } from "@/shared/lib/percent";

import { 
  Heart,
  InfinityIcon
 } from "lucide-react";
import clsx from "clsx";
import styles from './CurrentPickaxe.module.css'

export const CurrentPickaxe = () => {
  const currentPickaxe = useCurrentPickaxe();

  let percentNum;
  if(currentPickaxe){
    percentNum = getPercent(currentPickaxe.pickaxe.durability, currentPickaxe.pickaxe.maxDurability)
  }
  
  return (
    <div className={styles.pickaxeInfoContainer}>

      <div className={styles.mainInfo}>
        {currentPickaxe?.name || 'Кірка не вибрана'}
        <div className={styles.pickaxeImage}>
          <img src={currentPickaxe?.src} alt={currentPickaxe?.name} />
        </div>
        {currentPickaxe ? (
          <div className={styles.stats}>
            <p className={styles.hp}>
              <Heart/>
              {currentPickaxe.pickaxe.durability === Infinity ? 
              <InfinityIcon className={styles.infIcon}/> : currentPickaxe.pickaxe.durability}
              <span className={styles.hpPercent}>
                ({percentNum}%)
              </span>
            </p>
          </div>
        ) : null}
        
      </div>
      
    
    </div>
  )
}
