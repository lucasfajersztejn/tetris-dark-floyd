import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrominos'

// Rota una pieza 90 grados en sentido horario
export const rotatePiece = (shape) => {
  const rotated = shape[0].map((_, colIndex) =>
    shape.map(row => row[colIndex]).reverse()
  )
  return rotated
}

// Verifica si una posición es válida (sin colisiones)
export const isValidPosition = (board, shape, position) => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const newY = y + position.y
        const newX = x + position.x

        // Fuera del tablero
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false
        }

        // Colisión con pieza fija (ignoramos si estamos por encima del tablero)
        if (newY >= 0 && board[newY][newX].value !== 0) {
          return false
        }
      }
    }
  }
  return true
}

// Elige una pieza aleatoria
export const randomPiece = (tetrominos) => {
  const keys = Object.keys(tetrominos)
  const key = keys[Math.floor(Math.random() * keys.length)]
  return { shape: tetrominos[key].shape, color: tetrominos[key].color, key }
}