import dotenv from 'dotenv'
import { pathToFileURL } from 'url'
import { connectDB } from '../config/db.js'
import { TrustClientLogo } from '../models/index.js'
import { readClientLogosFromDisk } from '../utils/clientLogos.js'

dotenv.config()

export async function seedTrustClientLogos() {
  const logos = readClientLogosFromDisk()
  await TrustClientLogo.deleteMany({})
  await TrustClientLogo.insertMany(logos)
  return logos.length
}

async function syncClientLogos() {
  await connectDB()
  const count = await seedTrustClientLogos()
  console.log(`Synced ${count} client logos to MongoDB`)
  process.exit(0)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  syncClientLogos().catch((error) => {
    console.error('Client logo sync failed:', error)
    process.exit(1)
  })
}
