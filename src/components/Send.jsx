import { CopyToClipboard } from 'react-copy-to-clipboard'
import '../css/send.css'
import { useEffect, useState } from 'react'

const URL = 'https://vue-wordle-spanish.netlify.app/?'

export const Send = () => {
  const [word, setWord] = useState('')
  const [disableButton, setDisableButton] = useState(true)
  const [wordCodified, setWordCodified] = useState('')

  useEffect(() => {
    if (word.length === 5) {
      setDisableButton(false)
      setWordCodified(btoa(word))
    } else {
      setDisableButton(true)
      setWordCodified('')
    }
  }, [word])

  return (
    <div className='send-content'>
      <input
        className='send-input'
        type='text'
        name='word'
        id='word'
        placeholder='Escribe tu palabra'
        maxLength='5'
        autoComplete='off'
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <h3 className='send-h3'>Envíale este enlace a tu amigo</h3>
      <div className='send-link' id='link'>
        {URL}
        {wordCodified}
      </div>
      <CopyToClipboard text={`${URL}${wordCodified}`}>
        <button className='send-button' disabled={disableButton}>
          Copiar enlace
        </button>
      </CopyToClipboard>
    </div>
  )
}
