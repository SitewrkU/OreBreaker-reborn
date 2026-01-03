import { useEffect } from 'react'
import { Header } from './shared/ui/Header/Header'
import { MiningArea } from './features/mining/components/MiningArea'
import { useMiningStore } from './features/mining/store/miningStore'
import { ModalRoot } from './app/ModalRoot'
import './App.css'

function App() {
  const generateNewOre = useMiningStore(state => state.generateNewOre);

  useEffect(() => {
    generateNewOre();
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
