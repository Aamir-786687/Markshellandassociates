import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { submitCareerApplication } from './server/careerApply.js'
import { submitContactSubmission } from './server/contactSubmit.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const API_ROUTES = {
  '/api/career-apply': submitCareerApplication,
  '/api/contact': submitContactSubmission,
}

function apiRoutesPlugin() {
  return {
    name: 'api-routes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handler = req.url ? API_ROUTES[req.url] : undefined
        if (!handler) {
          return next()
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          try {
            const payload = body ? JSON.parse(body) : {}
            const env = loadEnv(server.config.mode, server.config.root, '')
            const result = await handler(payload, env)

            res.statusCode = result.ok ? 200 : (result.status || 400)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result.ok ? { success: true } : { error: result.error }))
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'SUBMIT_FAILED' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiRoutesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('gsap')) return 'motion'
            if (id.includes('swiper') || id.includes('lucide-react')) return 'ui'
            return 'vendor'
          }
        },
      },
    },
  },
})
