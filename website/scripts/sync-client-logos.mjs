import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const clientsDir = path.join(root, 'public', 'Images', 'clients')
const outFile = path.join(root, 'src', 'data', 'trustClientLogos.js')

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|svg)$/i

/** Show these clients first (in this order), then the rest alphabetically. */
const PRIORITY_NAMES = ['KT', 'Yaxon']

function displayName(filename) {
  return filename.replace(/\.[^.]+$/, '').trim()
}

const files = fs
  .readdirSync(clientsDir)
  .filter((f) => {
    const fullPath = path.join(clientsDir, f)
    return fs.statSync(fullPath).isFile() && IMAGE_EXT.test(f)
  })

const priorityRank = new Map(PRIORITY_NAMES.map((name, index) => [name.toLowerCase(), index]))

files.sort((a, b) => {
  const nameA = displayName(a)
  const nameB = displayName(b)
  const rankA = priorityRank.has(nameA.toLowerCase()) ? priorityRank.get(nameA.toLowerCase()) : Number.POSITIVE_INFINITY
  const rankB = priorityRank.has(nameB.toLowerCase()) ? priorityRank.get(nameB.toLowerCase()) : Number.POSITIVE_INFINITY

  if (rankA !== rankB) return rankA - rankB
  return nameA.localeCompare(nameB, undefined, { numeric: true })
})

const entries = files.map((file) => ({
  name: displayName(file),
  file,
}))

const body =
  `/** Auto-synced from public/Images/clients (${entries.length} logos). Run: npm run sync:client-logos */\n` +
  `export const trustClientLogos = [\n${entries
    .map(({ name, file }) => `  { name: ${JSON.stringify(name)}, file: ${JSON.stringify(file)} },`)
    .join('\n')}\n]\n`

fs.writeFileSync(
  outFile,
  body +
    `\nexport function getClientLogoSrc(file) {\n  return \`/Images/clients/\${encodeURIComponent(file)}\`\n}\n`,
)
console.log(`Synced ${entries.length} client logos → src/data/trustClientLogos.js`)
