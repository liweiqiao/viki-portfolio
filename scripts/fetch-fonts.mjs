/**
 * 把 Google Fonts 的西文字体（latin 子集）下载到 public/fonts/，
 * 并生成 src/styles/fonts.css。
 *
 * 为什么这么做：
 * 1. 国内访问 fonts.googleapis.com 不稳定，本地化后不受影响；
 * 2. 西文字体文件很小，本地托管几乎零成本；
 * 3. 中文字体（Noto Sans SC）按 unicode-range 分片、总体积大，
 *    仍保留 CDN 按需加载，同时在 CSS 回退栈里挂系统中文字体兜底。
 *
 * 重新抓取：node scripts/fetch-fonts.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
// 放在 src/assets 下，交给 Vite 当模块资源处理：自动加 hash + 重写相对路径，
// 这样无论部署到根路径还是子路径都不会 404。
const FONT_DIR = path.join(ROOT, 'src', 'assets', 'fonts')
const CSS_OUT = path.join(ROOT, 'src', 'styles', 'fonts.css')
// CSS 在 src/styles/ 下，字体在 src/assets/fonts/ 下
const CSS_URL_PREFIX = '../assets/fonts'

// 带现代 UA 才能拿到 woff2 而不是 ttf
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const FAMILIES = [
  {
    query: 'Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,800',
    slug: 'bricolage-grotesque',
    cssFamily: "'Bricolage Grotesque'",
    weights: '800'
  },
  {
    query: 'Inter:wght@300;400;500;600;700',
    slug: 'inter',
    cssFamily: "'Inter'",
    weights: null // 逐个 face 单独写出
  },
  {
    query: 'Roboto+Mono:wght@400;500',
    slug: 'roboto-mono',
    cssFamily: "'Roboto Mono'",
    weights: null
  }
]

// 只保留 latin 基础子集：覆盖英文、数字、常用标点
const isLatin = (range) => typeof range === 'string' && range.includes('U+0000-00FF')

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.text()
}

function parseFaces(css) {
  const faces = []
  const blockRe = /@font-face\s*\{([\s\S]*?)\}/g
  let m
  while ((m = blockRe.exec(css))) {
    const body = m[1]
    const pick = (prop) => {
      const r = new RegExp(`${prop}\\s*:\\s*([^;]+);`)
      const hit = r.exec(body)
      return hit ? hit[1].trim() : null
    }
    faces.push({
      family: pick('font-family'),
      weight: pick('font-weight'),
      style: pick('font-style'),
      url: (pick('src') || '').match(/url\((https:[^)]+\.woff2)\)/)?.[1] ?? null,
      range: pick('unicode-range')
    })
  }
  return faces
}

async function main() {
  await mkdir(FONT_DIR, { recursive: true })
  const out = [
    '/* 由 scripts/fetch-fonts.mjs 生成，请勿手改 */',
    '/* 西文：本地 woff2（latin 子集）；中文：见 index.html 的 Noto Sans SC CDN */',
    ''
  ]

  for (const fam of FAMILIES) {
    const url = `https://fonts.googleapis.com/css2?family=${fam.query}&display=swap`
    const css = await fetchText(url)
    const latinFaces = parseFaces(css).filter((f) => isLatin(f.range) && f.url)

    // 可变字体在 Google 的 CSS 里会对每个字重重复同一个 URL —— 按 URL 合并去重
    const byUrl = new Map()
    for (const face of latinFaces) {
      if (!byUrl.has(face.url)) {
        byUrl.set(face.url, { style: face.style || 'normal', weights: new Set(), range: face.range })
      }
      byUrl.get(face.url).weights.add(face.weight.trim())
    }

    console.log(`${fam.slug}: ${latinFaces.length} 个 face → ${byUrl.size} 个文件`)

    let i = 0
    for (const [faceUrl, meta] of byUrl) {
      const weights = [...meta.weights].map(Number).sort((a, b) => a - b)
      const weightCss =
        weights.length > 1 ? `${weights[0]} ${weights[weights.length - 1]}` : String(weights[0])

      const fileName = `${fam.slug}-${weightCss.replace(/\s+/g, '-')}${meta.style === 'italic' ? '-italic' : ''}.woff2`
      const buf = Buffer.from(await (await fetch(faceUrl, { headers: { 'User-Agent': UA } })).arrayBuffer())
      await writeFile(path.join(FONT_DIR, fileName), buf)
      console.log(`  ✓ ${fileName}  ${(buf.length / 1024).toFixed(1)} kB  (weight ${weightCss})`)

      out.push('@font-face {')
      out.push(`  font-family: ${fam.cssFamily};`)
      out.push(`  font-style: ${meta.style};`)
      out.push(`  font-weight: ${weightCss};`)
      out.push('  font-display: swap;')
      out.push(`  src: url('${CSS_URL_PREFIX}/${fileName}') format('woff2');`)
      out.push(`  unicode-range: ${meta.range};`)
      out.push('}')
      out.push('')
      i++
    }
  }

  await writeFile(CSS_OUT, out.join('\n'))
  console.log(`\n已写出 ${path.relative(ROOT, CSS_OUT)}`)
}

main().catch((err) => {
  console.error('字体抓取失败：', err.message)
  process.exit(1)
})
