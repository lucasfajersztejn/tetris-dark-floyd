import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import Game from './components/game/Game'
import GameOverPage from './pages/GameOverPage'
import ScoresPage from './pages/ScoresPage'
import { useSound } from './hooks/useSound'

function App() {
  const { user, logoutUser } = useAuth()
  const [screen, setScreen] = useState('home')
  const [finalScore, setFinalScore] = useState(0)
  const [finalLevel, setFinalLevel] = useState(1)
  const [finalLines, setFinalLines] = useState(0)

  const {
    playBg,
    stopBg,
    pauseBg,
    stopAll,
    playLineClear,
    playGameOver,
    setVolume,
  } = useSound()

  const handleGameOver = (score, level, lines) => {
    setFinalScore(score)
    setFinalLevel(level)
    setFinalLines(lines)
    setScreen('gameover')
  }

  const handleRestart = () => {
    stopAll()
    setScreen('game')
  }

  const handleExit = () => {
    stopAll()
    setScreen('home')
  }

  return (
    <>
      {screen === 'home' && (
        <HomePage
          onStart={() => user ? setScreen('game') : setScreen('auth')}
          onScores={() => setScreen('scores')}
          onAuth={() => setScreen('auth')}
          onLogout={() => { logoutUser(); setScreen('home') }}
        />
      )}
      {screen === 'auth' && (
        <AuthPage onSuccess={() => setScreen('home')} />
      )}
      {screen === 'game' && (
        <Game
          onExit={handleExit}
          onGameOver={handleGameOver}
          playBg={playBg}
          pauseBg={pauseBg}
          stopAll={stopAll}
          playLineClear={playLineClear}
          playGameOver={playGameOver}
          setVolume={setVolume}
        />
      )}
      {screen === 'gameover' && (
        <GameOverPage
          score={finalScore}
          level={finalLevel}
          lines={finalLines}
          onRestart={handleRestart}
          onExit={handleExit}
        />
      )}
      {screen === 'scores' && (
        <ScoresPage onBack={() => setScreen('home')} />
      )}
    </>
  )
}

export default App