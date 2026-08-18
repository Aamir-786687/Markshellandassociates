import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import apiRoutes from './routes/index.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', apiRoutes)

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ error: 'Internal server error' })
})

async function start() {
  await connectDB()
  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})
