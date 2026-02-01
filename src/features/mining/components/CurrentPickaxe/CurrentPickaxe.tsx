import { useCurrentPickaxe } from "@/features/pickaxe/hooks/useCurrentPickaxe";
import { usePickaxeStore } from "@/features/pickaxe/store/pickaxeStore";
import { useUIHints } from "@/shared/store/uiHintsStore";
import { getPercent } from "@/shared/lib/percent";

import { motion } from "framer-motion";
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

  const highlightedElement = useUIHints(state => state.highlightedElement);
  const isHighlighted = highlightedElement === 'pickaxe-slot';
  
  return (
    <div className={styles.pickaxeInfoContainer}>

      <div className={styles.mainInfo}>
        <p className={clsx(!currentPickaxe && styles.noPickaxeName)}>
        {currentPickaxe?.name || 'Кірка не вибрана'}
        </p>

        <motion.div 
          className={styles.pickaxeImage}
          animate={isHighlighted ? {  
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 0px rgba(255, 255, 255, 0)',
              '0 0 10px rgba(255, 255, 255, 0.8)',
              '0 0 0px rgba(255, 255, 255, 0)',
            ],
          } : {
            scale: 1,
            boxShadow: 'none'
          }}
          transition={{ duration: 0.4, repeat: isHighlighted ? 2 : 0 }}
        >
          {currentPickaxe ? (
            <>
              <img src={currentPickaxe?.src} alt={currentPickaxe?.name} />
              <SquareMinus onClick={removeCurrPickaxe} className={styles.removePickaxe}/>
            </>
          ) : (
            <Pickaxe/>
          )}
          
        </motion.div>

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
                    [styles.hpSupLow]: percentNum < 2, // 0-1
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
