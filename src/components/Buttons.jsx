import { Icons } from './Icons'

export const Buttons = ({ setIsActiveModal, setModalInfo }) => {
  const handleClickInstructions = () => {
    setIsActiveModal(true)
    setModalInfo('Instrucciones')
  }

  const handleClickSend = () => {
    setIsActiveModal(true)
    setModalInfo('Send')
  }
  return (
    <div className='icons'>
      <a
        id='instructions'
        href='#'
        title='Instrucciones'
        className='icon-link'
        onClick={handleClickInstructions}
      >
        <Icons.Instruction />
      </a>
      <a
        id='send'
        href='#'
        title='Retar a un amigo'
        className='icon-link'
        onClick={handleClickSend}
      >
        <Icons.Send />
      </a>
    </div>
  )
}
