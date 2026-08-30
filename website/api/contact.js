import { submitContactSubmission } from '../server/contactSubmit.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await submitContactSubmission(req.body, process.env)

    if (!result.ok) {
      return res.status(result.status || 400).json({ error: result.error })
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(500).json({ error: 'SUBMIT_FAILED' })
  }
}
