# Markshell & Associates — Full Stack Website

Monorepo with a React frontend and Express + MongoDB backend.

## Structure

```
website/
├── frontend/   # Vite + React (UI)
├── backend/    # Express API + MongoDB
└── package.json
```

## Setup

1. Install dependencies:

```bash
cd website
npm run install:all
```

2. Configure MongoDB in `backend/.env`:

```bash
cp backend/.env.example backend/.env
# Add your MONGODB_URI
```

3. Seed the database (loads all content from seed data):

```bash
npm run seed
```

4. Start frontend + backend:

```bash
npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:5000/api  

In development, Vite proxies `/api` to the backend.

## Production

- **Frontend:** deploy `frontend/` (e.g. Vercel). Set `VITE_API_URL` to your deployed API URL.
- **Backend:** deploy `backend/` with `MONGODB_URI` and run `npm run seed` once after deploy.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/statistics` | About page stats |
| GET | `/api/team` | Team members |
| GET | `/api/blog` | All blog posts |
| GET | `/api/blog/:slug` | Single blog post |
| GET | `/api/services` | All services |
| GET | `/api/services/:slug` | Single service |
| GET | `/api/legal/:slug` | Legal page content |
| GET | `/api/testimonials` | Testimonials |
| GET | `/api/industries` | Industries |
| GET | `/api/careers` | Career listings |
| GET | `/api/faqs` | Home page FAQs |
| GET | `/api/trust-client-logos` | Client logo filenames and image paths |
| POST | `/api/messages` | Submit contact form message |
| GET | `/api/messages` | List all contact form submissions |

## Client logos

Logos are read from `frontend/public/Images/clients/` and stored in MongoDB (filename + public URL path).

After adding or removing files in that folder, sync to the database:

```bash
npm run sync:client-logos
```

Or re-run the full seed: `npm run seed`
