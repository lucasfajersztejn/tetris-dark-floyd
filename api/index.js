import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/database.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Conectar a MongoDB
connectDB()

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Tetris Dark Floyd API funcionando' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})