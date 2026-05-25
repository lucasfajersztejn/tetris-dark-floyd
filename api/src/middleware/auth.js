import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No autorizado, token requerido' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no encontrado' })
    }

    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado, se requiere rol admin' })
  }
  next()
}