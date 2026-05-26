import brickFace from '../../assets/images/brick-face (1).png'

const Board = ({ board }) => {
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
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              backgroundColor: cell.value ? cell.color : '#0a0a0a',
              backgroundImage: cell.value ? `url(${brickFace})` : 'none',
              backgroundSize: 'cover',
              backgroundBlendMode: 'multiply',
              border: cell.value
                ? '1px solid rgba(0,0,0,0.5)'
                : '1px solid #111111',
              boxShadow: cell.value
                ? 'inset 0 0 4px rgba(0,0,0,0.6)'
                : 'none',
            }}
          />
        ))
      )}
    </div>
  )
}

export default Board