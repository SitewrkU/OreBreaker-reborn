import { useEffect } from 'react'
import { useMiningStore } from './features/mining/store/miningStore'
import { useInitItems } from './app/InitInventory'
import { soundManager } from './shared/lib/audio/soundManager'
import { getSoundPath } from './shared/config/assets'

import { ModalRoot } from './app/ModalRoot'
import { Header } from './shared/ui/Header/Header'
import { MiningArea } from './features/mining/components/MiningArea'
import './App.css'

function App() {
  const generateNewOre = useMiningStore(state => state.generateNewOre);
  useInitItems()

  useEffect(() => {
    soundManager.initialize();
    generateNewOre();
    soundManager.playMusic(getSoundPath('cave-theme.ogg'));
  }, [])
  
  return (
    <>
      <Header/>
      <MiningArea/>
      
      <ModalRoot/>
    </>
  )
}

export default App
