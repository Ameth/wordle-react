// import { useState, useMemo } from 'react'
import '../css/board.css'

export const Board = ({ board, shakeRowIndex, sucess, currentRowIndex }) => {
  return (
    <div id='board'>
      {board.map((row, index) => {
        return (
          <div
            className={`row ${shakeRowIndex === index ? 'shake' : ''} ${
              sucess && currentRowIndex.current === index ? 'jump' : ''
            }`}
            key={index}
          >
            {row.map((tile, index) => {
              return (
                <div
                  className={`tile ${tile.letter && 'filled'} ${
                    tile.state && 'revealed'
                  }`}
                  key={index}
                >
                  <div
                    className='front'
                    style={{ transitionDelay: `${index * 300}ms` }}
                  >
                    {tile.letter}
                  </div>
                  <div
                    className={`back ${tile.state}`}
                    style={{
                      transitionDelay: `${index * 300}ms`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {tile.letter}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
