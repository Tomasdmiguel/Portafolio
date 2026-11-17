// Verifica los links del sitio antes de cada deploy (Principio V, research R9).
// Uso: npm run check:links [-- https://<preview>.vercel.app]   (sin argumento: producción)
import { contactLinks } from '../src/data/contactLinks.ts'
import { site } from '../src/data/site.ts'

const LINKEDIN_BLOCKED = 999 // LinkedIn responde 999 a clientes automáticos.

const arg = process.argv[2] ?? site.siteUrl
let base: string
try {
  const parsed = new URL(arg)
  if (parsed.protocol !== 'https:') throw new Error('no es https')
  base = parsed.origin
} catch {
  console.error(`URL base inválida: "${arg}". Tiene que ser https://…`)
  process.exit(1)
}

const urls = [
  ...contactLinks.filter((link) => link.kind !== 'email').map((link) => link.href),
  `${base}/cv/tomas-de-miguel-cv.pdf`,
  `${base}${site.ogImage}`,
]

async function status(url: string): Promise<number> {
  const request = (method: 'HEAD' | 'GET') =>
    fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(10_000) })
  const head = await request('HEAD')
  // Algunos servidores no aceptan HEAD: se reintenta con GET.
  return head.status === 405 || head.status === 403 ? (await request('GET')).status : head.status
}

console.log(`Verificando links contra ${base}\n`)
let failed = 0

for (const url of urls) {
  try {
    const code = await status(url)
    if (code === LINKEDIN_BLOCKED) {
      console.log(`⚠️  ${code}  ${url}  (LinkedIn bloquea bots: verificar a mano)`)
    } else if (code >= 400) {
      failed++
      console.log(`❌ ${code}  ${url}`)
    } else {
      console.log(`✅ ${code}  ${url}`)
    }
  } catch (error) {
    failed++
    console.log(`❌ ERR  ${url}  (${error instanceof Error ? error.message : String(error)})`)
  }
}

console.log(failed > 0 ? `\n${failed} link(s) con problemas.` : '\nTodos los links responden.')
process.exit(failed > 0 ? 1 : 0)
