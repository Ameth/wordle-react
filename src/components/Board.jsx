import { useState, useMemo } from 'react'
import { LetterState } from '../utils/types'

const [board, setBoard] = useState(
  Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: '',
      state: LetterState.INITIAL,
    }))
  )
)

const [currentRowIndex, setCurretnRowIndex] = useState(0)

function onKey(key) {
    if (!allowInput.value) return
    if (/^[a-zA-Z\u00f1\u00d1]$/.test(key)) {
      fillTile(key.toLowerCase())
    } else if (key === 'Backspace') {
      clearTile()
    } else if (key === 'Enter') {
      completeRow()
    }
  }

// useMemo(() => (),[])

export const Board = ({ board }) => {
  return (
    <div className='board'>
      {board.map((row, index) => {
        return (
          <div className='row' key={index}>
            {row.map((tile, index) => {
              return (
                <div className='front' key={index}>
                  {tile.letter}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
