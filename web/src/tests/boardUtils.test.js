import { describe, it, expect } from 'vitest'
import { createBoard, drawPieceOnBoard, clearFullRows } from '../utils/boardUtils'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrominos'

describe('createBoard', () => {
  it('should create a board with correct dimensions', () => {
    const board = createBoard()
    expect(board.length).toBe(BOARD_HEIGHT)
    expect(board[0].length).toBe(BOARD_WIDTH)
  })

  it('should create an empty board with all cells set to 0', () => {
    const board = createBoard()
    const allEmpty = board.every(row => row.every(cell => cell.value === 0))
    expect(allEmpty).toBe(true)
  })

  it('should create a board with null colors', () => {
    const board = createBoard()
    const allNull = board.every(row => row.every(cell => cell.color === null))
    expect(allNull).toBe(true)
  })
})

describe('drawPieceOnBoard', () => {
  it('should draw a piece on the board at the correct position', () => {
    const board = createBoard()
    const piece = {
      shape: [[1, 1], [1, 1]],
      color: '#ff0000'
    }
    const position = { x: 0, y: 0 }
    const newBoard = drawPieceOnBoard(board, piece, position)

    expect(newBoard[0][0].value).toBe(1)
    expect(newBoard[0][1].value).toBe(1)
    expect(newBoard[1][0].value).toBe(1)
    expect(newBoard[1][1].value).toBe(1)
  })

  it('should draw the piece with the correct color', () => {
    const board = createBoard()
    const piece = {
      shape: [[1]],
      color: '#ff0000'
    }
    const position = { x: 0, y: 0 }
    const newBoard = drawPieceOnBoard(board, piece, position)

    expect(newBoard[0][0].color).toBe('#ff0000')
  })

  it('should not modify the original board', () => {
    const board = createBoard()
    const piece = { shape: [[1]], color: '#ff0000' }
    drawPieceOnBoard(board, piece, { x: 0, y: 0 })
    expect(board[0][0].value).toBe(0)
  })
})

describe('clearFullRows', () => {
  it('should not clear rows that are not full', () => {
    const board = createBoard()
    const { linesCleared } = clearFullRows(board)
    expect(linesCleared).toBe(0)
  })

  it('should clear a full row and return linesCleared = 1', () => {
    const board = createBoard()
    board[BOARD_HEIGHT - 1] = Array(BOARD_WIDTH).fill({ value: 1, color: '#ff0000' })
    const { newBoard, linesCleared } = clearFullRows(board)
    expect(linesCleared).toBe(1)
    expect(newBoard.length).toBe(BOARD_HEIGHT)
  })

  it('should clear multiple full rows', () => {
    const board = createBoard()
    board[BOARD_HEIGHT - 1] = Array(BOARD_WIDTH).fill({ value: 1, color: '#ff0000' })
    board[BOARD_HEIGHT - 2] = Array(BOARD_WIDTH).fill({ value: 1, color: '#ff0000' })
    const { linesCleared } = clearFullRows(board)
    expect(linesCleared).toBe(2)
  })

  it('should maintain board height after clearing rows', () => {
    const board = createBoard()
    board[BOARD_HEIGHT - 1] = Array(BOARD_WIDTH).fill({ value: 1, color: '#ff0000' })
    const { newBoard } = clearFullRows(board)
    expect(newBoard.length).toBe(BOARD_HEIGHT)
  })
})