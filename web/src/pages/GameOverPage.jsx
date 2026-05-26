import { useState, useEffect } from 'react'
import mainScreen from '../assets/images/main-screen.png'
import buttonTexture from '../assets/images/button-texture.png'
import { useAuth } from  '../context/useAuth'
import { useScores } from '../hooks/useScores'
import { saveScore } from '../services/api'

const GameOverPage = ({ score, level, lines, onRestart, onExit }) => {
  const { user } = useAuth()
  const { saveScore: saveLocalScore } = useScores()
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Si está logueado guardamos automáticamente en el backend
  useEffect(() => {
    if (user) {
      saveScore({ score, level, lines })
        .then(() => setSaved(true))
        .catch(() => setError('Error guardando el score'))
    }
  }, [])

  const handleSave = () => {
    if (!name.trim()) return
    saveLocalScore(name.trim(), score)
    setSaved(true)
  }

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

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">

        <h1
          className="text-7xl font-bold uppercase tracking-widest"
          style={{
            color: '#C0392B',
            textShadow: '0 0 40px rgba(192,57,43,0.9), 0 0 80px rgba(192,57,43,0.4)',
          }}
        >
          The Wall
        </h1>
        <h2 className="text-2xl uppercase tracking-[0.4em] text-gray-400 -mt-4">
          Is Complete
        </h2>

        <div className="flex gap-1 mt-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-8 h-4 bg-gray-700 border border-gray-600" />
          ))}
        </div>

        <div className="mt-4 bg-black bg-opacity-60 border border-gray-700 rounded px-12 py-6">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
            Score Final
          </p>
          <p
            className="text-6xl font-bold"
            style={{
              color: '#C0392B',
              textShadow: '0 0 20px rgba(192,57,43,0.6)',
            }}
          >
            {score}
          </p>
          <div className="flex gap-6 justify-center mt-3">
            <p className="text-gray-500 text-sm">
              Nivel <span className="text-white font-bold">{level}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Líneas <span className="text-white font-bold">{lines}</span>
            </p>
          </div>
        </div>

        {/* Guardar score */}
        {user ? (
          <div className="flex flex-col items-center gap-2">
            {saved ? (
              <p className="text-green-500 text-sm uppercase tracking-widest">
                ✓ Score guardado como <span className="font-bold">{user.username}</span>
              </p>
            ) : (
              <p className="text-gray-500 text-sm uppercase tracking-widest animate-pulse">
                Guardando score...
              </p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        ) : (
          !saved ? (
            <div className="flex flex-col items-center gap-3 mt-2">
              <p className="text-gray-400 text-sm uppercase tracking-widest">
                Guardá tu puntuación
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="Tu nombre"
                  maxLength={20}
                  className="px-4 py-2 bg-black border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 tracking-widest"
                />
                <button
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest rounded transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          ) : (
            <p className="text-green-500 text-sm uppercase tracking-widest mt-2">
              ✓ Puntuación guardada
            </p>
          )
        )}

        <p className="text-gray-500 text-sm italic tracking-widest">
          "We don't need no education..."
        </p>

        <div className="flex gap-4 mt-2">
          <button
            onClick={onRestart}
            className="px-10 py-4 text-white font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:brightness-110"
            style={{
              backgroundImage: `url(${buttonTexture})`,
              backgroundSize: 'cover',
              border: '2px solid #C0392B',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Otra vez
          </button>

          <button
            onClick={onExit}
            className="px-10 py-4 text-gray-400 font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:text-white"
            style={{
              background: 'transparent',
              border: '2px solid #444',
            }}
          >
            Salir
          </button>
        </div>

      </div>
    </div>
  )
}

export default GameOverPage