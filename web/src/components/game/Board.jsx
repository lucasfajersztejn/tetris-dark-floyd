import brickFace from '../../assets/images/brick-face (1).png'
import { useEffect } from 'react'

const Board = ({ board, wallRows = 0 }) => {
  const totalRows = board.length

  // Precargar la textura
  useEffect(() => {
    const img = new Image()
    img.src = brickFace
  }, [])

  return (
    <div
      className="grid border-2 border-gray-700"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
        width: '300px',
        height: '600px',
      }}
    >
      {board.map((row, y) =>
        row.map((cell, x) => {
          const isWall = wallRows > 0 && y >= totalRows - wallRows

          return (
            <div
              key={`${y}-${x}`}
              style={{
                backgroundColor: isWall ? '#e8e8e8' : cell.value ? cell.color : '#0a0a0a',
                backgroundImage: isWall || cell.value ? `url(${brickFace})` : 'none',
                backgroundSize: 'cover',
                backgroundBlendMode: isWall ? 'overlay' : 'multiply',
                border: isWall
                  ? '1px solid rgba(0,0,0,0.3)'
                  : cell.value
                  ? '1px solid rgba(0,0,0,0.5)'
                  : '1px solid #111111',
                boxShadow: isWall
                  ? 'inset 0 0 6px rgba(255,255,255,0.3)'
                  : cell.value
                  ? 'inset 0 0 4px rgba(0,0,0,0.6)'
                  : 'none',
                transition: 'background-color 0.05s ease',
              }}
            />
          )
        })
      )}
    </div>
  )
}

export default Board