import { useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler'

import bgMusic from '../assets/sounds/bg-music.mp3'
import lineClear from '../assets/sounds/line-clear.mp3'
import gameOver from '../assets/sounds/game-over.mp3'

export const useSound = () => {
  const bgRef = useRef(null)
  const gameOverRef = useRef(null)
  const lineClearRef = useRef(null)

  useEffect(() => {
    bgRef.current = new Howl({
      src: [bgMusic],
      loop: true,
      volume: 0.4,
    })

    gameOverRef.current = new Howl({
      src: [gameOver],
      loop: false,
      volume: 0.7,
    })

    lineClearRef.current = new Howl({
      src: [lineClear],
      loop: false,
      volume: 0.6,
    })

    return () => {
      bgRef.current.stop()
      gameOverRef.current.stop()
      lineClearRef.current.stop()
    }
  }, [])

  const playBg = () => {
    if (bgRef.current && !bgRef.current.playing()) {
      bgRef.current.play()
    }
  }

  const stopBg = () => {
    if (bgRef.current) bgRef.current.stop()
  }

  const pauseBg = () => {
    if (bgRef.current) bgRef.current.pause()
  }

  const stopAll = () => {
    if (bgRef.current) bgRef.current.stop()
    if (gameOverRef.current) gameOverRef.current.stop()
    if (lineClearRef.current) lineClearRef.current.stop()
  }

  const playLineClear = () => {
    if (lineClearRef.current) {
      lineClearRef.current.stop()
      lineClearRef.current.play()
    }
  }

  const playGameOver = () => {
    if (bgRef.current) bgRef.current.stop()
    if (gameOverRef.current && !gameOverRef.current.playing()) {
      gameOverRef.current.play()
    }
  }

  const setVolume = (vol) => {
    Howler.volume(vol)
  }

  return {
    playBg,
    stopBg,
    pauseBg,
    stopAll,
    playLineClear,
    playGameOver,
    setVolume,
  }
}