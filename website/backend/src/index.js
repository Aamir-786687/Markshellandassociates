import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import multer from 'multer'
import { connectDB } from './config/db.js'
import { corsOptions } from './config/cors.js'
import apiRoutes from './routes/index.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(helmet())

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

app.use(cors(corsOptions))
app.use(express.json({ limit: '1mb' }))
app.use(mongoSanitize())

app.use('/api', apiRoutes)

app.use((error, _req, res, _next) => {
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Not allowed by CORS' })
  }

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' })
    }
    return res.status(400).json({ error: error.message })
  }

  if (error.message === 'Only PDF, DOC and DOCX files are allowed') {
    return res.status(400).json({ error: error.message })
  }

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
