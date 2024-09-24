import Markdown from 'react-markdown'

const txtInstructions = `## ¿Cómo jugar Wordle?
  
  El objetivo del juego es adivinar la palabra de 5 letras que ha generado el juego para ti. Tienes **6 intentos** para lograrlo.
  
  En cada intento se resaltarán las letras que coinciden o no con la palabra oculta.
  
  #### ¿Qué significa cada color de letra?
  
  ![Ok.png](https://static.platzi.com/media/user_upload/Ok-9b6e4564-22d2-44c9-9c9c-54bb58f182ee.jpg) 
  
  Indica que la letra está incluida en la palabra oculta y está en la posición correcta.
  
  ![Reg.png](https://static.platzi.com/media/user_upload/Reg-f8512a48-09f4-4826-b034-9916719c81ee.jpg) 
  
  Indica que la letra está incluida en la palabra oculta, pero no está en la posición correcta.
  
  ![No.png](https://static.platzi.com/media/user_upload/No-e3a912a5-60dd-475f-bf61-b576b24a607d.jpg) 
  
  Indica que la letra no está incluida en la palabra oculta.
  
  En el teclado del juego también se verán reflejados los colores de las letras, así sabrás si ya utilizaste alguna letra.
  
  Al finalizar el juego, y si adivinaste la palabra, te mostrará el camino que recorriste para lograrlo.
  
  ![result.png](https://static.platzi.com/media/user_upload/result-f1dcb107-3260-4958-aa82-c80331c518c1.jpg)
  
  Si no lo lograste, te mostrará cual era la palabra oculta.
  
  ¡Buena suerte!`

const render = () => {
  return <Markdown>{txtInstructions}</Markdown>
}

export const Instructions = () => {
  return render()
}
