import mainScreen from '../assets/images/main-screen.png'
import buttonTexture from '../assets/images/button-texture.png'
import { useScores } from '../hooks/useScores'
import { useState } from 'react'

const ScoresPage = ({ onBack }) => {
  const { getScores, clearScores } = useScores()
  const [scores, setScores] = useState(getScores())

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${mainScreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg px-8">

        <h1
          className="text-5xl font-bold uppercase tracking-widest"
          style={{
            color: '#C0392B',
            textShadow: '0 0 30px rgba(192,57,43,0.8)',
          }}
        >
          Hall of Fame
        </h1>

        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-8 h-4 bg-gray-700 border border-gray-600" />
          ))}
        </div>

        {/* Tabla de scores */}
        <div className="w-full bg-black bg-opacity-60 border border-gray-700 rounded overflow-hidden">
          {scores.length === 0 ? (
            <p className="text-gray-600 text-center py-12 uppercase tracking-widest text-sm">
              No hay puntuaciones todavía
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-left">#</th>
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-left">Jugador</th>
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-right">Score</th>
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-right">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {index === 0 ? '👑' : index + 1}
                    </td>
                    <td className="py-3 px-4 text-white tracking-widest">
                      {entry.name}
                    </td>
                    <td
                      className="py-3 px-4 text-right font-bold"
                      style={{ color: index === 0 ? '#C0392B' : '#fff' }}
                    >
                      {entry.score.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600 text-sm">
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex gap-4 mt-2">
          <button
            onClick={onBack}
            className="px-10 py-4 text-white font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:brightness-110"
            style={{
              backgroundImage: `url(${buttonTexture})`,
              backgroundSize: 'cover',
              border: '2px solid #C0392B',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Volver
          </button>

          {scores.length > 0 && (
            <button
              onClick={() => { clearScores(); setScores([]) }}
              className="px-10 py-4 text-gray-600 font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:text-red-500"
              style={{
                background: 'transparent',
                border: '2px solid #333',
              }}
            >
              Borrar
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default ScoresPage