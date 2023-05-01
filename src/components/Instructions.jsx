import { Icons } from './Icons'

export const Instructions = ({}) => {
  return (
    <div className='icons'>
      <a id='instructions' href='#' title='Instrucciones' className='icon-link'>
        <Icons.Instruction />
      </a>
      <a id='send' href='#' title='Retar a un amigo' className='icon-link'>
        <Icons.Send />
      </a>
    </div>
  )
}
