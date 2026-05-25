import { Router } from 'express'
import { getTopScores, getMyScores, saveScore, deleteScore } from '../controllers/scoreController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/', getTopScores)
router.get('/me', protect, getMyScores)
router.post('/', protect, saveScore)
router.delete('/:id', protect, adminOnly, deleteScore)

export default router