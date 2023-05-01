import { useState } from 'react'
// import { Icons } from '../components/Icons'
// import { getWordOfTheDay } from '../utils/words'
import { Mensaje } from '../components/Mensaje'
import { Header } from '../components/Header'
import { Instructions } from '../components/Instructions'
// import { Board } from '../components/Board'
import { Keyboard } from '../components/Keyboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Mensaje>

     </Mensaje>
     <Header />
     <Instructions />
     <Keyboard />
    </>
  )
}

export default App
