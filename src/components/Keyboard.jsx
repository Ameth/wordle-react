import '../css/keyboard.css'
import { Icons } from './Icons'

export const Keyboard = ({ letterStates, onKey }) => {
  const rows = [
    'qwertyuiop'.split(''),
    'asdfghjklñ'.split(''),
    ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
  ]

  return (
    <div id='keyboard'>
      {rows.map((row, i) => {
        return (
          <div className='row-keyboard' key={i}>
            {i === 1 && <div className='spacer'></div>}
            {row.map((key, index) => (
              <button
                key={index}
                className={`${key.length > 1 ? 'big' : ''} ${
                  letterStates[key] ? letterStates[key] : ''
                }`}
                onClick={() => onKey(key)}
              >
                {key !== 'Backspace' ? <span>{key}</span> : <Icons.Backspace />}
              </button>
            ))}
            {i === 1 && <div className='spacer'></div>}
          </div>
        )
      })}
    </div>
  )
}
