import express from 'express'
import { TypeSafeClient, choice } from '@typesafe-ai/sdk'
import { createServer as createViteServer } from 'vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { options, propertyNames, rankThemes } from '../src/theme.ts'

async function loadKey() {
  if (process.env.TYPESAFE_API_KEY) return process.env.TYPESAFE_API_KEY
  const raw = await readFile(resolve('.env.local'), 'utf8')
  const line = raw.split(/\r?\n/).find(value => /^TYPESAFE_API_KEY\s*=/.test(value))
  return line?.slice(line.indexOf('=') + 1).trim().replace(/^['"]|['"]$/g, '')
}

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '16kb' }))
app.post('/api/themes', async (req, res) => {
  const prompt = req.body?.prompt
  if (typeof prompt !== 'string' || prompt.trim().length < 3 || prompt.length > 600) {
    res.status(400).json({ error: 'Enter an aesthetic description of 3 to 600 characters.' })
    return
  }
  try {
    const apiKey = await loadKey()
    if (!apiKey) throw new Error('The TypeSafe API key is missing.')
    const client = new TypeSafeClient({ apiKey, timeout: 20000, retry: { maxRetries: 1 } })
    const questions = Object.fromEntries(propertyNames.map(key => [key, choice(`For a visual theme described by the state, which ${key.replace(/[A-Z]/g, m => ' '+m.toLowerCase())} best expresses this aesthetic? Choose by visual fit.`, options[key])]))
    const response = await client.systemOne({ state: prompt.trim(), questions })
    const distributions = Object.fromEntries(propertyNames.map(key => [key, response.answers[key]?.probabilities])) as Record<string, Record<string, number>>
    res.json({ themes: rankThemes(distributions) })
  } catch (error) {
    console.error('Theme generation failed:', error instanceof Error ? error.message : error)
    res.status(502).json({ error: 'Theme generation is unavailable. Try again in a moment.' })
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve('dist')))
  app.get('*all', (_req, res) => res.sendFile(resolve('dist/index.html')))
} else {
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' })
  app.use(vite.middlewares)
}
const port = Number(process.env.PORT || 5173)
app.listen(port, () => console.log(`Jev Theme Explorer is running on http://localhost:${port}`))
