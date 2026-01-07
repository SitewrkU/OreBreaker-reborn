import { usePickaxeStore } from "../store/pickaxeStore"
import { useCurrentPickaxe } from "../hooks/useCurrentPickaxe";
import { useSound } from "@/shared/lib/audio/useSound";

export const PickaxeInventory = () => {
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
    <div>
      {pickaxes.length === 0 ? (
        <p>No pickaxes</p>
      ):(
        pickaxes.map(item => (
          <div key={item.instanceId} onClick={() => handlePickaxeClick(item.instanceId)}>
            <img src={item.src} alt={item.name} />
            <p>
              STATS:
            </p>
            {currentPickaxe?.instanceId === item.instanceId ? (
              <p>Selected!</p>
            ) : null}
            <p>info {item.pickaxe.desc}</p>
            <p>damage {item.pickaxe.damage}</p>
            <p>durability {item.pickaxe.durability}/{item.pickaxe.maxDurability}</p>
            <p>power {item.pickaxe.power}</p>
          </div>
        ))
      )}
    </div>
  )
}
