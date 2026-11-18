import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import { site } from './src/data/site.ts'

/** Inyecta en el <head> los tags de contracts/head-meta.md a partir de src/data/site.ts. */
function siteMeta(): Plugin {
  const missing = Object.entries(site).filter(([, value]) => !value)
  if (missing.length > 0) {
    throw new Error(`site.ts: faltan valores para ${missing.map(([key]) => key).join(', ')}`)
  }
  const url = `${site.siteUrl}/`
  const image = `${site.siteUrl}${site.ogImage}`
  // injectTo 'head' (no 'head-prepend'): el charset queda primero, dentro de los primeros 1024 bytes.
  const tag = (name: string, attrs: HtmlTagDescriptor['attrs'], children?: string): HtmlTagDescriptor =>
    ({ tag: name, attrs, children, injectTo: 'head' })
  const meta = (attr: 'name' | 'property', key: string, content: string) => tag('meta', { [attr]: key, content })

  const tags = [
    tag('title', {}, site.title),
    meta('name', 'description', site.description),
    tag('link', { rel: 'canonical', href: url }),
    meta('name', 'theme-color', site.themeColor),
    meta('name', 'color-scheme', 'dark'),
    tag('link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }),
    tag('link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:locale', site.locale),
    meta('property', 'og:url', url),
    meta('property', 'og:title', site.title),
    meta('property', 'og:description', site.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', site.ogImageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', site.title),
    meta('name', 'twitter:description', site.description),
    meta('name', 'twitter:image', image),
    tag('link', { rel: 'preload', href: '/fonts/GeistPixel-Square.woff2', as: 'font', type: 'font/woff2', crossorigin: true }),
  ]

  return { name: 'site-meta', transformIndexHtml: () => tags }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
})
