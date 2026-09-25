import { TypeSafeClient, choice } from '@typesafe-ai/sdk'
import { options, propertyNames, rankThemes } from '../../src/theme.ts'

interface Env {
  TYPESAFE_API_KEY?: string
}

type PagesContext = {
  request: Request
  env: Env
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

export async function onRequestPost({ request, env }: PagesContext) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Send a JSON request body.' }, 400)
  }

  const prompt = body && typeof body === 'object' && 'prompt' in body
    ? body.prompt
    : undefined
  if (typeof prompt !== 'string' || prompt.trim().length < 3 || prompt.length > 600) {
    return json({ error: 'Enter an aesthetic description of 3 to 600 characters.' }, 400)
  }

  if (!env.TYPESAFE_API_KEY) {
    return json({ error: 'Theme generation is not configured.' }, 503)
  }

  try {
    const client = new TypeSafeClient({
      apiKey: env.TYPESAFE_API_KEY,
      timeout: 20000,
      retry: { maxRetries: 1 }
    })
    const questions = Object.fromEntries(propertyNames.map(key => [
      key,
      choice(`For a visual theme described by the state, which ${key.replace(/[A-Z]/g, match => ` ${match.toLowerCase()}`)} best expresses this aesthetic? Choose by visual fit.`, options[key])
    ]))
    const response = await client.systemOne({ state: prompt.trim(), questions })
    const distributions = Object.fromEntries(propertyNames.map(key => [
      key,
      response.answers[key]?.probabilities
    ])) as Record<string, Record<string, number>>
    return json({ themes: rankThemes(distributions) })
  } catch (error) {
    console.error('Theme generation failed:', error instanceof Error ? error.message : error)
    return json({ error: 'Theme generation is unavailable. Try again in a moment.' }, 502)
  }
}
