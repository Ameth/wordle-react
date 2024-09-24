export const LetterState = {
  INITIAL: 0,
  CORRECT: "correct",
  PRESENT: "present",
  ABSENT: "absent",
};

export const resultWords = [
  'Genio',
  'Magnífico',
  'Impresionante',
  'Espléndido',
  'Bien',
  '¡Uf!',
]

export const icons = {
  [LetterState.CORRECT]: '🟩',
  [LetterState.PRESENT]: '🟨',
  [LetterState.ABSENT]: '⬜',
  [LetterState.INITIAL]: null
}