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
    expect(result.tokens.color.contrastAccent.background).toBe('#e1a928')
    expect(result.tokens.color.contrastAccent.name).toBe('citrus')
    expect(result.cssVariables['--p-pop-ink']).toBe('#241d1b')
  })
})

describe('palette-aware accent pairings', () => {
  it('uses five distinct accents for each palette, away from the primary hue', async () => {
    const { accentColors, accentPairings, palettes } = await import('./theme')
    const hue = (hex: string) => {
      const [red, green, blue] = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
      const max = Math.max(red, green, blue)
      const min = Math.min(red, green, blue)
      if (max === min) return 0
      const delta = max - min
      const sector = max === red ? ((green - blue) / delta) % 6 : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4
      return (sector * 60 + 360) % 360
    }
    for (const [palette, pairings] of Object.entries(accentPairings)) {
      expect(new Set(Object.values(pairings)).size).toBe(5)
      const primaryHue = hue(palettes[palette as keyof typeof palettes][2])
      for (const name of Object.values(pairings)) {
        const distance = Math.abs(primaryHue - hue(accentColors[name].background))
        expect(Math.min(distance, 360 - distance)).toBeGreaterThanOrEqual(29)
      }
    }
  })
})

describe('accent color contrast', () => {
  it('keeps every accent label above WCAG AA text contrast', async () => {
    const { accentColors } = await import('./theme')
    const luminance = (hex: string) => {
      const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
      const [red, green, blue] = channels.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue
    }
    for (const accent of Object.values(accentColors)) {
      const values = [luminance(accent.background), luminance(accent.foreground)].sort((a, b) => a - b)
      expect((values[1] + 0.05) / (values[0] + 0.05)).toBeGreaterThanOrEqual(4.5)
    }
  })
})
