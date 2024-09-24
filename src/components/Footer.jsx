import '../css/footer.css'

export function Footer({ board, letterStates, currentRow }) {
  return (
    <footer className='footer'>
      <h5>board: {JSON.stringify(board, null, 2)}</h5>
      {/* <h5>letterState:{JSON.stringify(letterStates, null, 2)}</h5> */}
      <h5>currentRow:{JSON.stringify(currentRow, null, 2)}</h5>
    </footer>
  )
}
