import { useState } from "react";

import { useMiningStore } from "../store/miningStore";
import { useInventoryStore } from "@/features/inventory/store/inventoryStore";
import { usePickaxeStore } from "@/features/pickaxe/store/pickaxeStore";
import { useCurrentPickaxe } from "@/features/pickaxe/hooks/useCurrentPickaxe";
import { useShallow } from "zustand/shallow";

import { generateOreDrop } from "@/shared/lib/drop";
import { questTrackers } from "@/features/quests/lib/questProgress";
import type { ItemId } from "@/data/items";

import styles from './MiningArea.module.css'
import { motion } from "framer-motion";

import { DropList } from "./DropList/DropList";
import { CurrentPickaxe } from "./CurrentPickaxe/CurrentPickaxe";


export const MiningArea = () => {
  const [rotateLeft, setRotateLeft] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const { currentOre, health, maxHealth, setCurrentDrop, damageOre, generateNewOre } = useMiningStore(
    useShallow(s => ({
      currentOre: s.currentOre,
      health: s.health,
      maxHealth: s.maxHealth,
      setCurrentDrop: s.setCurrentDrop,
      damageOre: s.damageOre,
      generateNewOre: s.generateNewOre
    }))
  );
  const currentPickaxe = useCurrentPickaxe();
  const addItem = useInventoryStore(state => state.addItem)
  const damagePickaxe = usePickaxeStore(state => state.damagePickaxe)
  const healthPercent = (health / maxHealth) * 100;


  const handleClick = () => {
    if(!currentPickaxe) return;
    handleAnimate();

    const damage = currentPickaxe.pickaxe.damage;
    const { destroyed } = damageOre(damage)

    if(destroyed){
      if(!currentOre) return;
      damagePickaxe(1)
      //Old ore drops
      const drops = generateOreDrop(currentOre)
      drops.forEach(drop => {
        const item = drop.item
        addItem(item, item.amount)
        questTrackers.collectItem(item.id as ItemId, item.amount) // Safe: item.id is guaranteed to be ItemId cuz its generated from ITEMS
      }) //add to inventory and track quest
      setCurrentDrop(drops)

      //mining quest tracker
      questTrackers.mineOre(currentOre.id)

      //New ore
      generateNewOre()
    }
  }


  const handleAnimate = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setRotateLeft(!rotateLeft)

    setTimeout(() => {
      setIsAnimating(false);
    }, 100);
  }


  if (!currentOre) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.mineArea}>
      <CurrentPickaxe/>
      <div className={styles.oreArea}>
        <h2>{currentOre.name}</h2>
        <motion.img 
          src={currentOre.src} 
          alt={currentOre.name} 
          animate={{ 
            rotate: isAnimating ? (rotateLeft ? -15 : 15) : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17
          }}
          onClick={handleClick} 
          width={128}
        />

        <div className={styles.hpWrapper}>
          <div
            className={styles.hpFill}
            style={{ width: `${healthPercent}%` }}
          />
          <span className={styles.hpText}>
            {health.toFixed(1)} / {maxHealth}
          </span>
        </div>

      </div>
      <DropList/>
    </div>
  )
}
