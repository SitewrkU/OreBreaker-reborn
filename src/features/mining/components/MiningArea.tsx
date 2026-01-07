import { useMiningStore } from "../store/miningStore";
import { useInventoryStore } from "@/features/inventory/store/inventoryStore";
import { usePickaxeStore } from "@/features/pickaxe/store/pickaxeStore";
import { useShallow } from "zustand/shallow";
import { generateOreDrop } from "@/shared/lib/drop";
import { useCurrentPickaxe } from "@/features/pickaxe/hooks/useCurrentPickaxe";

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
  const currentPickaxe = useCurrentPickaxe();
  const addItem = useInventoryStore(state => state.addItem)
  const damagePickaxe = usePickaxeStore(state => state.damagePickaxe)


  const handleClick = () => {
    if(!currentPickaxe) return;
    const damage = currentPickaxe.pickaxe.damage;
    const { destroyed } = damageOre(damage)

    if(destroyed){
      if(!currentOre) return;
      damagePickaxe(1)
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
