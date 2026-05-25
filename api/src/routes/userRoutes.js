import { Router } from 'express'
import { getAllUsers, updateUser, deleteUser, deleteMe } from '../controllers/userController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/', protect, adminOnly, getAllUsers)
router.put('/:id', protect, adminOnly, updateUser)
router.delete('/me', protect, deleteMe)
router.delete('/:id', protect, adminOnly, deleteUser)

export default router