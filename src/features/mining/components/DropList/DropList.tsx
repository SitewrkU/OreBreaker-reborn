import { motion, type Variants } from "framer-motion";
import { useMiningStore } from "../../store/miningStore";
import styles from './DropList.module.css'
import clsx from "clsx";

export const DropList = () => {
  const currentDrop = useMiningStore(state => state.currentDrop)

  const getRarityClass = (chance: number) => {
    if (chance >= 40) return styles.def;
    if (chance >= 15) return styles.rare;
    if (chance >= 5) return styles.epic;
    if (chance >= 1) return styles.legendary;
    return styles.mythic;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
        mass: 0.5,
      },
    },
    exit: { opacity: 0, scale: 0 },
  };

  const listKey = currentDrop && currentDrop.length > 0
    ? currentDrop.map(d => `${d.item.id}-${d.item.amount}`).join('_')
    : 'empty';

  const dropList = currentDrop && currentDrop.length > 0 ? (
    <motion.div
      key={listKey}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles.dropList}
    >
      {currentDrop.map((drop, index) => (
        <motion.div
          key={drop.item.id} 
          variants={itemVariants}
          custom={index}
          className={styles.dropItem}
        >
          <div className={styles.mainIndo}>
            <p>{drop.item.name}</p>
            <p>x{drop.item.amount}</p>
          </div>
          <img src={drop.item.src} alt={drop.item.name} />
          <p className={clsx(
            styles.dropChance, 
            getRarityClass(drop.dropChance))
          }>
            {drop.dropChance}%
          </p>
        </motion.div>
      ))}
    </motion.div>
  ) : (
    <p>Немає дропу!</p>
  );

  return (
    <div className={styles.DropListContainer}>
      <p className={styles.header}>Дроп</p>
      {dropList}
    </div>
  )
}
