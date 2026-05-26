import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrominos'

// Crea un tablero vacío
export const createBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill({ value: 0, color: null })
  )

// Dibuja la pieza actual en el tablero
export const drawPieceOnBoard = (board, piece, position) => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })))

  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        const boardY = y + position.y
        const boardX = x + position.x
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = { value: 1, color: piece.color }
        }
      }
    })
  })

  return newBoard
}

// Elimina las filas completas y devuelve cuántas eliminó
export const clearFullRows = (board) => {
  let linesCleared = 0

  const newBoard = board.filter(row => {
    const isFull = row.every(cell => cell.value !== 0)
    if (isFull) linesCleared++
    return !isFull
  })

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill({ value: 0, color: null }))
  }

  return { newBoard, linesCleared }
}