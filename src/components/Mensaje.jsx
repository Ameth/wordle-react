export const Mensaje = ({ children, grid = null }) => {
  if (!children) return
  return (
    <div className='message'>
      {children}
      {grid && <pre>{grid}</pre>}
    </div>
  )
}
