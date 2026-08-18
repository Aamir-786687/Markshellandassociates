import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const clientsDir = path.join(root, 'public', 'Images', 'clients')
const outFile = path.join(root, 'src', 'data', 'trustClientLogos.js')

const files = fs
  .readdirSync(clientsDir)
  .filter((f) => fs.statSync(path.join(clientsDir, f)).isFile())
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

const body =
  `/** Auto-synced from public/Images/clients (${files.length} logos). Run: npm run sync:client-logos */\n` +
  `export const trustClientLogos = [\n${files.map((f) => `  ${JSON.stringify(f)},`).join('\n')}\n]\n`

fs.writeFileSync(
  outFile,
  body +
    `\nexport function getClientLogoSrc(filename) {\n  return \`/Images/clients/\${encodeURIComponent(filename)}\`\n}\n`,
)
console.log(`Synced ${files.length} client logos → src/data/trustClientLogos.js`)
