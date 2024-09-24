import { useState, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

import { getWordOfTheDay } from '../utils/words'
import { Mensaje } from '../components/Mensaje'
import { Header } from '../components/Header'
import { Buttons } from '../components/Buttons'
import { Board } from '../components/Board'
import { Keyboard } from '../components/Keyboard'
import { LetterState, icons, resultWords } from '../utils/types'
import { Footer } from '../components/Footer'
import { Modal } from '../components/Modal'

function validarResult({ currentRow, board, currentRowIndex }) {
  //Validar el resultado
}

function App() {
  const answer = useRef('')

  // Board state. Each tile is represented as { letter, state }
  const [board, setBoard] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: '',
        state: LetterState.INITIAL,
      }))
    )
  )

  // console.log('render');

  // console.log(board);

  const currentRowIndex = useRef(0) // Index de la fila actual
  const [currentRow, setCurrentRow] = useState(board[currentRowIndex.current]) // Fila actual que se está mostrando
  const currentRowRef = useRef(currentRow)

  const [grid, setGrid] = useState('')
  const [shakeRowIndex, setShakeRowIndex] = useState(-1)
  const [sucess, setSucess] = useState(false) //Juego terminado
  const [isActiveModal, setIsActiveModal] = useState(false) // Mostrar modal
  const [modalInfo, setModalInfo] = useState('') //Mostrar mensajes en el modal
  const [letterStates, setLetterStates] = useState({}) // Realiza un seguimiento de las letras reveladas para el teclado virtual
  const [allowInput, setAllowInput] = useState(true) // Manejar el estado de la entrada del teclado
  const [message, setMessage] = useState('')

  // Get word of the day
  useEffect(() => {
    const wordOfTheDay = getWordOfTheDay()
    answer.current = wordOfTheDay
    console.log('Answer:', answer.current)
  }, [])

  useEffect(() => {
    currentRowRef.current = currentRow
  }, [currentRow])

  const onKeyup = (e) => {
    // console.log(e.key);
    onKey(e.key)
  }

  // Llamar una función dependiendo de la tecla presionada
  function onKey(key) {
    // console.log(`Se presiono la tecla ${key}`)

    if (!allowInput) return

    if (/^[a-zA-Z\u00f1\u00d1]$/.test(key)) {
      // console.log('Paso el test')

      fillTile(key.toLowerCase())
    } else if (key === 'Backspace') {
      clearTile()
    } else if (key === 'Enter') {
      completeRow()
    }
  }

  //Suscribirse al evento del navegador cuando renderice el componente
  useEffect(() => {
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])

  //Llenar la letra en la posición actual
  function fillTile(letter) {
    // console.log('currentRow antes', currentRowRef.current)
    // Clonar el tablero actual
    const newBoard = structuredClone(board)

    // Clonar la fila actual
    const newCurrentRow = structuredClone(currentRowRef.current)
    // console.log('newcurrent antes', newCurrentRow)

    let updated = false
    newCurrentRow.forEach((tile) => {
      if (!tile.letter && !updated) {
        tile.letter = letter
        updated = true
      }
    })

    // // Actualizar la fila en el tablero
    newBoard[currentRowIndex.current] = newCurrentRow

    // // Actualizar el estado
    setBoard(newBoard) // Actualizar el tablero completo
    setCurrentRow(newCurrentRow) // Actualizar la fila actual
    // console.log('newcurretn despues', newCurrentRow)
  }

  //Borrar la letra en la posición actual
  function clearTile() {
    const newCurrentRow = structuredClone(currentRowRef.current)
    const newCurrentRowReversed = [...newCurrentRow.reverse()]
    for (const tile of newCurrentRowReversed) {
      if (tile.letter) {
        tile.letter = ''
        break
      }
    }
    const newBoard = structuredClone(board)
    newBoard[currentRowIndex.current] = newCurrentRow

    // // Actualizar el estado
    setBoard(newBoard) // Actualizar el tablero completo
    setCurrentRow(newCurrentRow.reverse())
  }

  // Cuando se presiona la tecla Enter se ejecuta esta función
  function completeRow() {
    // const currentRow = board[currentRowIndex]
    const newBoard = structuredClone(board)
    const newCurrentRow = structuredClone(currentRowRef.current)

    // console.log('currentRowToValidate', newCurrentRow)

    if (newCurrentRow.every((tile) => tile.letter)) {
      //Dividir la palabra en letras
      const answerLetters = answer.current.split('')

      // console.log('respuesta a validar', answerLetters)

      // Primer paso: marcar las letras correctas
      newCurrentRow.forEach((tile, i) => {
        if (answerLetters[i] === tile.letter) {
          console.log('Entro en primer paso')
          tile.state = LetterState.CORRECT
          setLetterStates((prevState) => ({
            ...prevState,
            [tile.letter]: LetterState.CORRECT,
          }))
          //Borro la letra para saber que esta ausente en el tercer paso
          answerLetters[i] = null
        }
      })

      //Segundo paso: marcar las letras presentes
      newCurrentRow.forEach((tile) => {
        if (!tile.state && answerLetters.includes(tile.letter)) {
          console.log('Entro en segundo paso')
          tile.state = LetterState.PRESENT
          //Borro la letra para saber que esta ausente en el tercer paso
          answerLetters[answerLetters.indexOf(tile.letter)] = null

          if (!letterStates[tile.letter]) {
            setLetterStates((prevState) => ({
              ...prevState,
              [tile.letter]: LetterState.PRESENT,
            }))
          }
        }
      })

      //Tercer paso: marcar las letras ausentes
      newCurrentRow.forEach((tile) => {
        if (!tile.state) {
          console.log('Entro en tercer paso')
          tile.state = LetterState.ABSENT
          if (!letterStates[tile.letter]) {
            setLetterStates((prevState) => ({
              ...prevState,
              [tile.letter]: LetterState.ABSENT,
            }))
          }
        }
      })

      setAllowInput(false)

      //Actualizamos el board con la actual fila
      newBoard[currentRowIndex.current] = newCurrentRow
      setBoard(newBoard)

      if (newCurrentRow.every((tile) => tile.state === LetterState.CORRECT)) {
        // Ganaste!!
        // console.log('actual board', newBoard[currentRowIndex.current])

        setTimeout(() => {
          setGrid(genResultGrid({ board: newBoard }))
          showMessage(resultWords[currentRowIndex.current], -1)
          setSucess(true)
          confetti()
        }, 1600)
      } else if (currentRowIndex.current < board.length - 1) {
        // Ir a la siguiente fila
        console.log('Entro a la siguiente fila')
        console.log('actual board', newBoard)
        currentRowIndex.current = currentRowIndex.current + 1
        setCurrentRow(newBoard[currentRowIndex.current])
        setTimeout(() => {
          setAllowInput(true) //Seguir jugando
        }, 1600)
      } else {
        // Juego perdido :(
        setTimeout(() => {
          showMessage(answer.current.toUpperCase(), -1)
        }, 1600)
      }

      // setCurrentRow(currentRow)
    } else {
      shake()
      showMessage('No pueden faltar letras')
    }
  }

  function shake() {
    setShakeRowIndex(currentRowIndex.current)
    setTimeout(() => {
      setShakeRowIndex(-1)
    }, 1000)
  }

  function genResultGrid({ board }) {
    // const newBoard = structuredClone(board)
    const res = board
      .slice(0, currentRowIndex.current + 1)
      .map((row) => {
        return row.map((tile) => icons[tile.state]).join('')
      })
      .join('\n')

    // console.log('res', res)

    return res
  }

  function showMessage(msg, time = 1000) {
    setMessage(msg)
    if (time > 0) {
      setTimeout(() => {
        setMessage('')
      }, time)
    }
  }

  return (
    <>
      <Mensaje grid={grid}>{message}</Mensaje>
      <Header />
      <Buttons
        setIsActiveModal={setIsActiveModal}
        setModalInfo={setModalInfo}
      />
      <Board
        board={board}
        shakeRowIndex={shakeRowIndex}
        sucess={sucess}
        currentRowIndex={currentRowIndex}
      />
      <Keyboard onKey={onKey} letterStates={letterStates} />
      <Modal
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
        modalInfo={modalInfo}
      />
      {/* <Footer board={board} letterStates={null} currentRow={currentRow} /> */}
    </>
  )
}

export default App
