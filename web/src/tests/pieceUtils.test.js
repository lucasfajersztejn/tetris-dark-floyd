import { describe, it, expect } from 'vitest'
import { rotatePiece, isValidPosition } from '../utils/pieceUtils'
import { createBoard } from '../utils/boardUtils'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrominos'

describe('rotatePiece', () => {
  it('should rotate a piece 90 degrees clockwise', () => {
    const shape = [
      [1, 0],
      [1, 0],
      [1, 1],
    ]
    const rotated = rotatePiece(shape)
    expect(rotated[0]).toEqual([1, 1, 1])
    expect(rotated[1]).toEqual([1, 0, 0])
  })

  it('should rotate a square piece and keep it the same', () => {
    const shape = [
      [1, 1],
      [1, 1],
    ]
    const rotated = rotatePiece(shape)
    expect(rotated).toEqual(shape)
  })

  it('should return a new array not the original', () => {
    const shape = [[1, 0], [1, 1]]
    const rotated = rotatePiece(shape)
    expect(rotated).not.toBe(shape)
  })
})

describe('isValidPosition', () => {
  it('should return true for a valid position', () => {
    const board = createBoard()
    const shape = [[1, 1], [1, 1]]
    const position = { x: 0, y: 0 }
    expect(isValidPosition(board, shape, position)).toBe(true)
  })

  it('should return false when piece goes out of left boundary', () => {
    const board = createBoard()
    const shape = [[1, 1]]
    const position = { x: -1, y: 0 }
    expect(isValidPosition(board, shape, position)).toBe(false)
  })

  it('should return false when piece goes out of right boundary', () => {
    const board = createBoard()
    const shape = [[1, 1]]
    const position = { x: BOARD_WIDTH, y: 0 }
    expect(isValidPosition(board, shape, position)).toBe(false)
  })

  it('should return false when piece goes out of bottom boundary', () => {
    const board = createBoard()
    const shape = [[1]]
    const position = { x: 0, y: BOARD_HEIGHT }
    expect(isValidPosition(board, shape, position)).toBe(false)
  })

  it('should return false when piece collides with existing cell', () => {
    const board = createBoard()
    board[0][0] = { value: 1, color: '#ff0000' }
    const shape = [[1]]
    const position = { x: 0, y: 0 }
    expect(isValidPosition(board, shape, position)).toBe(false)
  })

  it('should return true when piece is above the board', () => {
    const board = createBoard()
    const shape = [[1]]
    const position = { x: 0, y: -1 }
    expect(isValidPosition(board, shape, position)).toBe(true)
  })
})