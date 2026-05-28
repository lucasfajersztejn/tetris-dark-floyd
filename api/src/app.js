import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import scoreRoutes from './routes/scoreRoutes.js'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/scores', scoreRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Tetris Dark Floyd API funcionando' })
})

export default app