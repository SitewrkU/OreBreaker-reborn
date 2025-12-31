import { useEffect } from 'react'
import { Header } from './shared/ui/Header/Header'
import { MiningArea } from './features/mining/components/MiningArea'
import { useMiningStore } from './features/mining/store/miningStore'
import './App.css'

function App() {
  const generateNewOre = useMiningStore(state => state.generateNewOre);

  useEffect(() => {
    generateNewOre();
  }, [])
  
  return (
    <>
      <Header/>
      <h1>hi twin (★‿★)</h1>
      <MiningArea/>
      <p>Someday, this project will become something big.</p>
    </>
  )
}

export default App
