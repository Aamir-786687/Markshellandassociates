import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const backendRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..')
const clientsDir = path.join(backendRoot, '../frontend/public/Images/clients')

export function getClientLogoSrc(filename) {
  return `/Images/clients/${encodeURIComponent(filename)}`
}

export function readClientLogosFromDisk() {
  if (!fs.existsSync(clientsDir)) {
    throw new Error(`Client logos folder not found: ${clientsDir}`)
  }

  return fs
    .readdirSync(clientsDir)
    .filter((filename) => fs.statSync(path.join(clientsDir, filename)).isFile())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((filename, order) => ({
      filename,
      src: getClientLogoSrc(filename),
      order,
    }))
}
