import { items, type ItemId } from "@/data/items"
import styles from './RewardItem.module.css'

type RewardItemProps = {
  reward: {
    id: ItemId
    amount: number
  }
}

export const RewardItem = ({reward}: RewardItemProps) => {
  const item = items[reward.id]
  if(!item){
    return <div className={styles.rewardItem}>Невідомий предмет!</div>
  }

  return (
    <div className={styles.rewardItem}>
      <p className={styles.name}>{item.name}</p>
      <img src={item.src} alt={item.name} />
      <p className={styles.amount}>x{reward.amount}</p>
    </div>
  )
}
