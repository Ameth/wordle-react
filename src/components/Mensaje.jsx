export const Mensaje = ({ children, grid = null }) => {
  return (
    <div className='message'>
      {children}
      {grid && <pre>{grid}</pre>}
    </div>
  )
}
