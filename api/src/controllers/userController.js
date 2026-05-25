import User from '../models/User.js'
import Score from '../models/Score.js'

// GET /api/users — solo admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error: error.message })
  }
}

// PUT /api/users/:id — solo admin
export const updateUser = async (req, res) => {
  try {
    const { username, email, role, isActive } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role, isActive },
      { new: true, runValidators: true }
    )
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando usuario', error: error.message })
  }
}

// DELETE /api/users/:id — solo admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json({ message: 'Usuario desactivado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error desactivando usuario', error: error.message })
  }
}

// DELETE /api/users/me — el propio usuario elimina su cuenta
export const deleteMe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false })
    res.json({ message: 'Cuenta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando cuenta', error: error.message })
  }
}