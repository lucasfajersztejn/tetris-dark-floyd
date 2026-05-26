import { useState } from 'react'
import HomePage from './pages/HomePage'
import Game from './components/game/Game'
import GameOverPage from './pages/GameOverPage'
import ScoresPage from './pages/ScoresPage'
import { useSound } from './hooks/useSound'

function App() {
  const [screen, setScreen] = useState('home')
  const [finalScore, setFinalScore] = useState(0)

  const {
    playBg,
    stopBg,
    pauseBg,
    stopAll,
    playLineClear,
    playGameOver,
    setVolume,
  } = useSound()

  const handleGameOver = (score) => {
    setFinalScore(score)
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
          onStart={() => setScreen('game')}
          onScores={() => setScreen('scores')}
        />
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