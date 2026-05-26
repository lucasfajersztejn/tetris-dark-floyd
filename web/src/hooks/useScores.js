const SCORES_KEY = 'tetris-dark-floyd-scores'
const MAX_SCORES = 10

export const useScores = () => {

  const getScores = () => {
    try {
      const stored = localStorage.getItem(SCORES_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  const saveScore = (name, score) => {
    const scores = getScores()
    const newEntry = {
      id: Date.now(),
      name,
      score,
      date: new Date().toLocaleDateString('es-ES'),
    }
    const updated = [...scores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SCORES)

    localStorage.setItem(SCORES_KEY, JSON.stringify(updated))
    return updated
  }

  const clearScores = () => {
    localStorage.removeItem(SCORES_KEY)
  }

  return {
    getScores,
    saveScore,
    clearScores,
  }
}