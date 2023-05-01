import { useState } from 'react'
import { Icons } from '../components/Icons'
import { getWordOfTheDay } from '../utils/words'
import { Mensaje } from '../components/Mensaje'
import { Header } from '../components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Mensaje>

     </Mensaje>
     <Header />
    </>
  )
}

export default App
