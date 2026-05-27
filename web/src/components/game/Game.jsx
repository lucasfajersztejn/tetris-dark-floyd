import { useEffect, useState } from 'react'
import mainScreen from '../../assets/images/main-screen.png'
import buttonTexture from '../../assets/images/button-texture.png'
import logoGameOver from '../../assets/images/logo_game_over.png'
import { useGameLogic } from '../../hooks/useGameLogic'
import Board from './Board'
import GameInfo from './GameInfo'

const Game = ({ onExit, onGameOver, playBg, pauseBg, stopAll, playLineClear, playGameOver, setVolume }) => {
  const {
    displayBoard,
    nextPiece,
    score,
    level,
    lines,
    gameOver,
    isPlaying,
    isPaused,
    startGame,
    linesJustCleared,
    wallRows,
  } = useGameLogic()
  const [muted, setMuted] = useState(false)

  const toggleMute = () => {
    setMuted(prev => {
      const next = !prev
      setVolume(next ? 0 : 1)
      return next
    })
  }

  useEffect(() => {
    if (isPlaying) {
      playBg()
    } else {
      pauseBg()
    }
  }, [isPlaying])

  useEffect(() => {
    if (linesJustCleared > 0) {
      playLineClear()
    }
  }, [linesJustCleared])

  useEffect(() => {
  if (gameOver) {
    playGameOver()
    setTimeout(() => onGameOver(score, level, lines), 5000) // Espera 5 segundos para mostrar el mensaje de muro completo
  }
}, [gameOver])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${mainScreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-75" />

      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="px-4 py-2 border border-gray-700 hover:border-red-800 text-gray-400 hover:text-red-500 text-sm uppercase tracking-widest rounded transition-colors"
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={(e) => {
            const vol = parseFloat(e.target.value)
            setVolume(vol)
            setMuted(vol === 0)
          }}
          className="w-24 accent-red-600"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">

        <h1
          className="text-red-500 text-4xl font-bold tracking-widest mb-8 uppercase"
          style={{ textShadow: '0 0 20px rgba(192,57,43,0.8)' }}
        >
          Tetris Dark Floyd
        </h1>

        <div className="flex items-start">
          <div className="relative">
            <Board board={displayBoard} wallRows={wallRows} />
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <img
                  src={logoGameOver}
                  alt="The Wall is Complete"
                  className="w-64"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(192,57,43,0.8))' }}
                />
                <p className="text-gray-700 text-lg tracking-widest uppercase animate-pulse">
                  The Wall is Complete
                </p>
              </div>
            )}

            {isPaused && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10"
                style={{ background: 'rgba(0,0,0,0.7)' }}
              >
                <p
                  className="text-4xl font-bold uppercase tracking-widest animate-pulse"
                  style={{ color: '#C0392B', textShadow: '0 0 30px rgba(192,57,43,0.8)' }}
                >
                  Pausa
                </p>
                <p className="text-gray-500 text-sm uppercase tracking-widest mt-2">
                  Presioná P para continuar
                </p>
              </div>
            )}
          </div>
          <GameInfo
            score={score}
            level={level}
            lines={lines}
            nextPiece={nextPiece}
          />
        </div>

        {!isPlaying && !gameOver && (
          <button
            onClick={() => { stopAll(); startGame() }}
            className="mt-8 px-12 py-4 text-white font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:brightness-110"
            style={{
              backgroundImage: `url(${buttonTexture})`,
              backgroundSize: 'cover',
              border: '2px solid #C0392B',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Jugar
          </button>
        )}

        {/* {gameOver && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <img
              src={logoGameOver}
              alt="The Wall is Complete"
              className="w-64 animate-pulse"
              style={{ filter: 'drop-shadow(0 0 20px rgba(192,57,43,0.8))' }}
            />
            <p className="text-gray-400 text-lg tracking-widest uppercase">
              Is Complete
            </p>
          </div>
        )} */}

        {!gameOver && (
          <button
            onClick={() => { stopAll(); onExit() }}
            className="mt-4 px-8 py-2 border border-gray-700 hover:border-red-800 text-gray-600 hover:text-red-500 text-sm uppercase tracking-widest rounded transition-colors"
          >
            Volver al inicio
          </button>
        )}

      </div>
    </div>
  )
}

export default Game