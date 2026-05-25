import Score from '../models/Score.js'

// GET /api/scores — top 10 global
export const getTopScores = async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(10)
    res.json(scores)
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo scores', error: error.message })
  }
}

// GET /api/scores/me — scores del usuario logueado
export const getMyScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user._id })
      .sort({ score: -1 })
      .limit(10)
    res.json(scores)
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo tus scores', error: error.message })
  }
}

// POST /api/scores — guardar score al terminar partida
export const saveScore = async (req, res) => {
  try {
    const { score, level, lines } = req.body
    const newScore = await Score.create({
      user: req.user._id,
      username: req.user.username,
      score,
      level,
      lines,
    })
    res.status(201).json(newScore)
  } catch (error) {
    res.status(500).json({ message: 'Error guardando score', error: error.message })
  }
}

// DELETE /api/scores/:id — solo admin
export const deleteScore = async (req, res) => {
  try {
    const score = await Score.findByIdAndDelete(req.params.id)
    if (!score) return res.status(404).json({ message: 'Score no encontrado' })
    res.json({ message: 'Score eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando score', error: error.message })
  }
}