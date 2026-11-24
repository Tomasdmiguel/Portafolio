// Verifica los links del sitio antes de cada deploy (Principio V, research R9).
// Uso: npm run check:links [-- https://<preview>.vercel.app]   (sin argumento: producción)
import { certifications } from '../src/data/certifications.ts'
import { contactLinks } from '../src/data/contactLinks.ts'
import { site } from '../src/data/site.ts'
import { getValidCertifications } from '../src/lib/validateContent.ts'

const LINKEDIN_BLOCKED = 999 // LinkedIn responde 999 a clientes automáticos.
// Platzi responde 403 a clientes automáticos; los diplomas abren bien en el navegador (spec 005).
const isPlatziBlocked = (url: string, code: number) => code === 403 && new URL(url).hostname === 'platzi.com'

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

// Para los archivos propios se exige además el tipo: una página de login con 200 no cuenta.
const checks: { url: string; type?: string }[] = [
  ...contactLinks.filter((link) => link.kind !== 'email').map((link) => ({ url: link.href })),
  { url: `${base}/cv/tomas-de-miguel-cv.pdf`, type: 'application/pdf' },
  { url: `${base}${site.ogImage}`, type: 'image/png' },
  // Certificados (spec 005, FR-014).
  ...(certifications.profile ? [{ url: certifications.profile.url }] : []),
  ...getValidCertifications(certifications).map((item) => ({ url: item.url })),
]

async function probe(url: string): Promise<Response> {
  const request = (method: 'HEAD' | 'GET') =>
    fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(10_000) })
  const head = await request('HEAD')
  // Algunos servidores no aceptan HEAD: se reintenta con GET.
  return head.status === 405 || head.status === 403 ? request('GET') : head
}

console.log(`Verificando links contra ${base}\n`)
let failed = 0

for (const { url, type } of checks) {
  try {
    const response = await probe(url)
    const code = response.status
    const contentType = response.headers.get('content-type') ?? ''
    if (code === LINKEDIN_BLOCKED) {
      console.log(`⚠️  ${code}  ${url}  (LinkedIn bloquea bots: verificar a mano)`)
    } else if (isPlatziBlocked(url, code)) {
      console.log(`⚠️  ${code}  ${url}  (Platzi bloquea bots: verificar a mano)`)
    } else if (code >= 400) {
      failed++
      console.log(`❌ ${code}  ${url}`)
    } else if (type && !contentType.startsWith(type)) {
      failed++
      const hint = new URL(response.url).hostname === new URL(url).hostname ? '' : ` → redirige a ${new URL(response.url).hostname} (¿protegido?)`
      console.log(`❌ ${code}  ${url}  (se esperaba ${type}, llegó ${contentType || 'sin tipo'}${hint})`)
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
