import { useMiningStore } from "../store/miningStore";
import { useInventoryStore } from "@/features/inventory/store/inventoryStore";
import { useShallow } from "zustand/shallow";
import { items } from "@/data/items";
import { generateOreDrop } from "@/shared/lib/drop";

export const MiningArea = () => {
  const { currentOre, health, maxHealth, damageOre, generateNewOre } = useMiningStore(
    useShallow(s => ({
      currentOre: s.currentOre,
      health: s.health,
      maxHealth: s.maxHealth,
      damageOre: s.damageOre,
      generateNewOre: s.generateNewOre
    }))
  );

  const addItem = useInventoryStore(state => state.addItem)


  const handleClick = () => {
    const damage = items.stonePickaxe.pickaxe.damage
    const { destroyed } = damageOre(damage)

    if(destroyed){
      if(!currentOre) return;
      //Old ore drops
      const drops = generateOreDrop(currentOre)
      drops.forEach(drop => addItem(drop, drop.amount))
      //New ore
      generateNewOre()
    }
  }


  if (!currentOre) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{currentOre.name}</h2>
      <img src={currentOre.src} alt={currentOre.name} onClick={handleClick} width={128}/>
      <div style={{ marginTop: '10px' }}>
        <progress 
          max={maxHealth} 
          value={health}
          style={{ width: '200px' }}
        />
        <p>{health.toFixed(1)} / {maxHealth}</p>
      </div>
    </div>
  )
}
