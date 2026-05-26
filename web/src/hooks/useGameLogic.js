import { useState, useCallback, useEffect } from 'react'
import { useInterval } from './useIntervals'
import { TETROMINOS, BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrominos'
import { SPEEDS, POINTS } from '../constants/gameConfig'
import { createBoard, drawPieceOnBoard, clearFullRows } from '../utils/boardUtils'
import { rotatePiece, isValidPosition, randomPiece } from '../utils/pieceUtils'

export const useGameLogic = () => {
  const [board, setBoard] = useState(createBoard())
  const [currentPiece, setCurrentPiece] = useState(null)
  const [nextPiece, setNextPiece] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [linesJustCleared, setLinesJustCleared] = useState(0)

  // Genera la posición inicial de una pieza nueva
  const startPosition = (shape) => ({
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
    y: 0,
  })

  // Spawnea una nueva pieza
  const spawnPiece = useCallback((next = null) => {
    const piece = next || randomPiece(TETROMINOS)
    const newNext = randomPiece(TETROMINOS)
    const pos = startPosition(piece.shape)

    // Si la posición inicial ya colisiona, game over
    if (!isValidPosition(board, piece.shape, pos)) {
      setGameOver(true)
      setIsPlaying(false)
      return
    }

    setCurrentPiece(piece)
    setNextPiece(newNext)
    setPosition(pos)
  }, [board])

  // Inicia el juego
  const startGame = useCallback(() => {
    const newBoard = createBoard()
    const piece = randomPiece(TETROMINOS)
    const next = randomPiece(TETROMINOS)
    const pos = startPosition(piece.shape)

    setBoard(newBoard)
    setCurrentPiece(piece)
    setNextPiece(next)
    setPosition(pos)
    setScore(0)
    setLines(0)
    setLevel(1)
    setGameOver(false)
    setIsPlaying(true)
  }, [])

  // Fija la pieza en el tablero y spawnea la siguiente
  const lockPiece = useCallback(() => {
    if (!currentPiece) return

    const newBoard = drawPieceOnBoard(board, currentPiece, position)
    const { newBoard: clearedBoard, linesCleared } = clearFullRows(newBoard)

    if (linesCleared > 0) {
      const gained = POINTS[linesCleared] * level
      setScore(prev => prev + gained)
      setLines(prev => {
        const totalLines = prev + linesCleared
        setLevel(Math.floor(totalLines / 10) + 1)
        return totalLines
      })
      setLinesJustCleared(linesCleared)
    } else {
      setLinesJustCleared(0)
    }

    setBoard(clearedBoard)
    spawnPiece(nextPiece)
  }, [board, currentPiece, position, nextPiece, level, spawnPiece])

  // Caída automática
  const drop = useCallback(() => {
    if (!currentPiece || !isPlaying) return

    const newPos = { ...position, y: position.y + 1 }

    if (isValidPosition(board, currentPiece.shape, newPos)) {
      setPosition(newPos)
    } else {
      lockPiece()
    }
  }, [currentPiece, position, board, isPlaying, lockPiece])

  // Movimiento del jugador
  const moveLeft = useCallback(() => {
    if (!currentPiece || !isPlaying) return
    const newPos = { ...position, x: position.x - 1 }
    if (isValidPosition(board, currentPiece.shape, newPos)) {
      setPosition(newPos)
    }
  }, [currentPiece, position, board, isPlaying])

  const moveRight = useCallback(() => {
    if (!currentPiece || !isPlaying) return
    const newPos = { ...position, x: position.x + 1 }
    if (isValidPosition(board, currentPiece.shape, newPos)) {
      setPosition(newPos)
    }
  }, [currentPiece, position, board, isPlaying])

  const rotate = useCallback(() => {
    if (!currentPiece || !isPlaying) return
    const rotated = rotatePiece(currentPiece.shape)
    if (isValidPosition(board, rotated, position)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotated }))
    }
  }, [currentPiece, position, board, isPlaying])

  const hardDrop = useCallback(() => {
    if (!currentPiece || !isPlaying) return

    let newPos = { ...position }
    while (isValidPosition(board, currentPiece.shape, { ...newPos, y: newPos.y + 1 })) {
      newPos.y++
    }

    // Fijamos la pieza directamente desde la posición final sin pasar por setPosition
    const newBoard = drawPieceOnBoard(board, currentPiece, newPos)
    const { newBoard: clearedBoard, linesCleared } = clearFullRows(newBoard)

    if (linesCleared > 0) {
      const gained = POINTS[linesCleared] * level
      setScore(prev => prev + gained)
      setLines(prev => {
        const totalLines = prev + linesCleared
        setLevel(Math.floor(totalLines / 10) + 1)
        return totalLines
      })
    }

    setBoard(clearedBoard)
    spawnPiece(nextPiece)
  }, [currentPiece, position, board, isPlaying, level, nextPiece, spawnPiece])

  // Teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (!isPlaying) return
      switch (e.key) {
        case 'ArrowLeft':  moveLeft();  break
        case 'ArrowRight': moveRight(); break
        case 'ArrowDown':  drop();      break
        case 'ArrowUp':    rotate();    break
        case ' ':          hardDrop();  break
        default: break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isPlaying, moveLeft, moveRight, drop, rotate, hardDrop])

  // Intervalo de caída automática
  useInterval(drop, isPlaying ? SPEEDS[level] : null)

  // Tablero visible con la pieza actual dibujada
  const displayBoard = currentPiece
    ? drawPieceOnBoard(board, currentPiece, position)
    : board

  return {
    displayBoard,
    nextPiece,
    score,
    lines,
    level,
    gameOver,
    isPlaying,
    startGame,
    linesJustCleared,
  }
}