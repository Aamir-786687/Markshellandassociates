import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const backendRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..')
const resumeUploadDir = path.join(backendRoot, 'uploads/resumes')

if (!fs.existsSync(resumeUploadDir)) {
  fs.mkdirSync(resumeUploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: resumeUploadDir,
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, uniqueName + path.extname(file.originalname))
  },
})

export const uploadResume = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF, DOC and DOCX files are allowed'))
    }
  },
})

export { resumeUploadDir }
