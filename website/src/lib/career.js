import { CAREER_APPLY_API } from '@/lib/env'
import { sanitizeEmail, sanitizePhone, sanitizeText } from '@/lib/sanitize'

const MAX_RESUME_BYTES = 2 * 1024 * 1024
const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

export function normalizeCareerFormPayload(raw, job) {
  return {
    jobSlug: job.slug,
    jobTitle: job.title,
    name: sanitizeText(raw.name, 120),
    email: sanitizeEmail(raw.email),
    phone: sanitizePhone(raw.phone || ''),
    linkedin: sanitizeText(raw.linkedin || '', 300),
    message: sanitizeText(raw.message, 5000),
    resume: raw.resumeFile
      ? {
          filename: sanitizeText(raw.resumeFile.name, 120),
          contentType: raw.resumeFile.type,
          data: raw.resumeFile.data,
        }
      : undefined,
  }
}

export async function readResumeFile(file) {
  if (!file || !(file instanceof File) || file.size === 0) {
    return null
  }

  if (file.size > MAX_RESUME_BYTES) {
    throw new Error('RESUME_TOO_LARGE')
  }

  if (!ALLOWED_RESUME_TYPES.has(file.type)) {
    throw new Error('RESUME_INVALID_TYPE')
  }

  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result.split(',')[1] : ''
      resolve(result)
    }
    reader.onerror = () => reject(new Error('RESUME_READ_FAILED'))
    reader.readAsDataURL(file)
  })

  return {
    name: file.name,
    type: file.type,
    data,
  }
}

export async function submitCareerApplicationForm(raw, job) {
  if (!CAREER_APPLY_API) {
    throw new Error('CAREER_APPLY_NOT_CONFIGURED')
  }

  let resumeFile = null
  if (raw.resume instanceof FileList && raw.resume[0]) {
    resumeFile = await readResumeFile(raw.resume[0])
  }

  const payload = normalizeCareerFormPayload({ ...raw, resumeFile }, job)

  const response = await fetch(CAREER_APPLY_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data.error || 'SUBMIT_FAILED')
    error.code = data.error
    throw error
  }

  return data
}
