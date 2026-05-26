const GameInfo = ({ score, level, lines, nextPiece }) => {
  return (
    <div className="flex flex-col gap-6 text-white ml-6 w-36">

      <div className="bg-gray-900 border border-gray-700 p-4 rounded">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Score</p>
        <p className="text-2xl font-bold text-red-500">{score}</p>
      </div>

      <div className="bg-gray-900 border border-gray-700 p-4 rounded">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Nivel</p>
        <p className="text-2xl font-bold text-gray-200">{level}</p>
      </div>

      <div className="bg-gray-900 border border-gray-700 p-4 rounded">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Líneas</p>
        <p className="text-2xl font-bold text-gray-200">{lines}</p>
      </div>

      <div className="bg-gray-900 border border-gray-700 p-4 rounded">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Siguiente</p>
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: `repeat(${nextPiece?.shape[0].length || 4}, 1fr)`,
          }}
        >
          {nextPiece?.shape.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: cell ? nextPiece.color : 'transparent',
                  border: cell ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              />
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default GameInfo