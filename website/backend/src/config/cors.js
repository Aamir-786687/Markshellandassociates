const devOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
]

function getAllowedOrigins() {
  const fromEnv = process.env.CORS_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean)

  if (process.env.NODE_ENV === 'production') {
    if (!fromEnv?.length) {
      throw new Error('CORS_ORIGINS must be set in production (comma-separated allowed origins).')
    }
    return fromEnv
  }

  return fromEnv?.length ? [...new Set([...fromEnv, ...devOrigins])] : devOrigins
}

export const allowedOrigins = getAllowedOrigins()

export const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests (no Origin header), e.g. health checks
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}
