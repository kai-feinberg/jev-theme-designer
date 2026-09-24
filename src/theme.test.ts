import { describe, expect, it } from 'vitest'
import { options, propertyNames, rankThemes, validateSelections } from './theme'

describe('theme ranking', () => {
  it('uses ranks one, two and three independently for every property', () => {
    const distributions = Object.fromEntries(propertyNames.map((property, index) => {
      const keys = Object.keys(options[property])
      const ordered = index % 2 ? [...keys].reverse() : keys
      return [property, Object.fromEntries(ordered.map((key, rank) => [key, keys.length-rank]))]
    }))
    const themes = rankThemes(distributions)
    expect(themes).toHaveLength(3)
    for (const property of propertyNames) {
      const ranked = Object.entries(distributions[property]).sort((a,b) => b[1]-a[1]).map(([key]) => key)
      themes.forEach((theme, index) => expect(theme[property]).toBe(ranked[index]))
    }
    expect(validateSelections(themes)).toBe(true)
  })
  it('rejects missing or invalid distributions', () => {
    expect(() => rankThemes({})).toThrow()
    const all = Object.fromEntries(propertyNames.map(property => [property, Object.fromEntries(Object.keys(options[property]).map(key => [key, .5]))]))
    all.palette.forest = Number.NaN
    expect(() => rankThemes(all)).toThrow()
  })
  it('rejects output outside the curated vocabulary', () => {
    expect(validateSelections([{palette:'invented'}, {}, {}])).toBe(false)
  })
})

describe('theme export', () => {
  it('includes selected choices and resolved tokens', async () => {
    const { createThemeExport, sampleSelections, palettes } = await import('./theme')
    const result = createThemeExport(sampleSelections[0], 'earthy and warm')
    expect(result.prompt).toBe('earthy and warm')
    expect(result.choices.palette).toBe('clay')
    expect(result.tokens.color.background).toBe(palettes.clay[0])
    expect(result.tokens.typography.heading).toContain('Fraunces')
    expect(result.choices.gradient).toBe('wash')
    expect(result.tokens.treatments.gradient.css).toContain('linear-gradient')
    expect(result.tokens.treatments.imageFrame.name).toBe('captioned')
    expect(result.cssVariables['--p-gradient']).toBe(result.tokens.treatments.gradient.css)
  })
})
