import { Icons } from './Icons'

export const Header = () => {
  return (
    <header>
      <h1>WORDLE ESPAÑOL</h1>
      <a
        id='source-link'
        href='#'
        target='_blank'
        className='source-link'
        title='Github'
      >
        <Icons.github />
      </a>
    </header>
  )
}
