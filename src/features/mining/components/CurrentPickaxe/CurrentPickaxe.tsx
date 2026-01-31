import { useCurrentPickaxe } from "@/features/pickaxe/hooks/useCurrentPickaxe";
import { usePickaxeStore } from "@/features/pickaxe/store/pickaxeStore";
import { getPercent } from "@/shared/lib/percent";

import { 
  Pickaxe,
  SquareMinus,

  Heart,
  InfinityIcon,
  Flame,
  ArrowBigUpDash
 } from "lucide-react";
import clsx from "clsx";
import styles from './CurrentPickaxe.module.css'

export const CurrentPickaxe = () => {
  const currentPickaxe = useCurrentPickaxe();
  const removeCurrPickaxe = usePickaxeStore(state => state.removeCurrentPickaxe)

  let percentNum = 100;
  if(currentPickaxe){
    percentNum = getPercent(currentPickaxe.pickaxe.durability, currentPickaxe.pickaxe.maxDurability)
  }
  
  return (
    <div className={styles.pickaxeInfoContainer}>

      <div className={styles.mainInfo}>
        <p className={clsx(!currentPickaxe && styles.noPickaxeName)}>
        {currentPickaxe?.name || 'Кірка не вибрана'}
        </p>

        <div className={styles.pickaxeImage}>
          {currentPickaxe ? (
            <>
              <img src={currentPickaxe?.src} alt={currentPickaxe?.name} />
              <SquareMinus onClick={removeCurrPickaxe} className={styles.removePickaxe}/>
            </>
          ) : (
            <Pickaxe/>
          )}
          
        </div>

        {currentPickaxe ? (
          <div className={styles.stats}>
            <p className={styles.hp}>
              <Heart/>
              {currentPickaxe.pickaxe.durability === Infinity ? 
              <InfinityIcon className={styles.infIcon}/> : currentPickaxe.pickaxe.durability}
              <span 
                className={clsx(
                  styles.hpPercent,
                  {
                    [styles.hpHigh]: percentNum >= 50, // 100-50
                    [styles.hpMid]: percentNum >= 25 && percentNum < 50, // 25-49
                    [styles.hpMidLow]: percentNum >= 6 && percentNum < 25, //6-24
                    [styles.hpLow]: percentNum >= 2 && percentNum < 6, // 2-5
                    [styles.hpSupLow]: percentNum < 2, // 0-5
                  }
                )}
              >
                ({percentNum}%)
              </span>
            </p>
            <p className={styles.dmg}><Flame/>{currentPickaxe.pickaxe.damage}</p>
            <p className={styles.pwr}><ArrowBigUpDash/>{currentPickaxe.pickaxe.power}</p>
          </div>
        ) : null}
        
      </div>
      
    
    </div>
  )
}
