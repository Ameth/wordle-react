import { Instructions } from './Instructions'
import { Send } from './Send'

export const Modal = ({ isActiveModal, setIsActiveModal, modalInfo }) => {
  return (
    <>
      <div
        className={`overlay ${isActiveModal ? 'active' : ''}`}
        id='overlay'
      ></div>
      <div className={`modal ${isActiveModal ? 'active' : ''}`} id='modal'>
        <div className='modal-content'>
          <button
            className='btn-close-modal'
            onClick={() => setIsActiveModal(false)}
          >
            X
          </button>
          <div>
            {modalInfo === 'Instrucciones' && <Instructions />}
            {modalInfo === 'Send' && <Send />}
          </div>
        </div>
      </div>
    </>
  )
}
