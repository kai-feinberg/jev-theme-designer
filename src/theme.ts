export const options = {
  palette: {
    forest: 'Moss green and cream, organic and grounded', clay: 'Terracotta and oat, warm and handmade', olive: 'Olive and parchment, earthy and editorial', ink: 'Near black and paper, stark and graphic', cobalt: 'Strong blue and cool white, confident and modern', slate: 'Blue gray and mist, reserved and professional', lilac: 'Purple and pale lavender, playful and soft', coral: 'Coral and blush, lively and inviting', lemon: 'Gold and butter, bright and cheerful', plum: 'Deep plum and champagne, refined and luxurious', navy: 'Midnight navy and ivory, classic and premium', mint: 'Dark teal and mint, fresh and technical'
  },
  headingFont: { fraunces: 'Expressive rounded serif, warm editorial', dmSerif: 'High contrast display serif, elegant', archivo: 'Strong utilitarian sans serif', barlow: 'Condensed bold sans serif, poster like', manrope: 'Clean contemporary geometric sans serif', space: 'Distinct geometric sans serif, technical' },
  bodyFont: { dmSans: 'Neutral humanist sans serif', manrope: 'Precise contemporary sans serif', archivo: 'Direct and structured sans serif', outfit: 'Friendly rounded sans serif', plex: 'Monospaced technical type' },
  radius: { square: 'Sharp square corners', subtle: 'Barely softened corners', rounded: 'Clearly rounded corners', soft: 'Generously soft corners', pill: 'Fully rounded pills' },
  shadow: { flat: 'No shadow, crisp flat surfaces', fine: 'Very subtle low elevation', soft: 'Soft atmospheric elevation', deep: 'Distinct layered elevation', offset: 'Hard offset graphic shadow' },
  density: { compact: 'Compact dense spacing', measured: 'Measured efficient spacing', balanced: 'Balanced everyday spacing', airy: 'Open relaxed spacing', spacious: 'Expansive generous spacing' },
  border: { none: 'No visible borders', hairline: 'Very fine quiet rules', standard: 'Clear light borders', strong: 'Prominent dark borders', double: 'Graphic double-line borders' },
  button: { solid: 'Solid primary and outlined secondary', outline: 'Outlined primary with light fill', soft: 'Soft tinted primary and understated secondary', contrast: 'High contrast dark primary', graphic: 'Graphic border and offset shadow' },
  typeScale: { restrained: 'Restrained clear type hierarchy', balanced: 'Balanced medium type hierarchy', expressive: 'Large expressive headlines', monumental: 'Very large dramatic display type' },
  decoration: { none: 'No decorative ornament', line: 'Fine line geometry', arc: 'Gentle curved motif', grid: 'Precise grid motif', glow: 'Soft color wash' },
  gradient: { none: 'No gradient; use flat color fields', wash: 'Very soft color wash that fades into the page', diagonal: 'Clear diagonal transition between related palette colors', radial: 'A focused radial pool of color', bands: 'Broad graphic bands of related colors' },
  image: { natural: 'Natural true color imagery', muted: 'Reduced saturation imagery', vivid: 'Vivid high contrast imagery', monochrome: 'Black and white imagery', warm: 'Warm tinted imagery' },
  imageFrame: { open: 'Image fills its available area with no frame', inset: 'Image sits inside the layout with breathing room', outlined: 'Image has a fine visible outline', panoramic: 'Image is cropped into a low wide strip', captioned: 'Image has an attached caption label' },
  navigation: { plain: 'Plain quiet navigation', line: 'Navigation with fine divider', filled: 'Navigation on a tinted surface', bold: 'Strong graphic navigation' }
} as const

export type Property = keyof typeof options
export type Selection = { [K in Property]: keyof typeof options[K] & string }
export const propertyNames = Object.keys(options) as Property[]

export const palettes = {
  forest: ['#f0f0e7','#172923','#4d6357','#dae6d9','#bad1c1'], clay: ['#f6ede1','#3b2a26','#a95039','#efc9ad','#efddd0'], olive: ['#f2f0dd','#303727','#6e7443','#e3e6c2','#e9e5cb'], ink: ['#f5f4ef','#191a18','#303331','#e5e4de','#deddd6'], cobalt: ['#f0f4fb','#152745','#315cbd','#d4e2fa','#dfe8f6'], slate: ['#eef3f5','#24343e','#4d687b','#d9e5ea','#e2e9ed'], lilac: ['#f6f0fa','#342440','#8056a4','#e6d6f1','#e8def0'], coral: ['#fff2ed','#482a2b','#d15d52','#f9d1c8','#f7e1dc'], lemon: ['#fcf8df','#3d341e','#b58a13','#f4e59f','#f5ecc5'], plum: ['#f6efe9','#352139','#713c69','#e8cddd','#eee1df'], navy: ['#f1f1e8','#17243b','#344e73','#d7dce4','#e5e7e6'], mint: ['#edf8f3','#153b37','#277c72','#c1e8da','#d9f0e7']
} as const
export const fontMap = { fraunces:'Fraunces, Georgia, serif', dmSerif:'"DM Serif Display", Georgia, serif', archivo:'Archivo, sans-serif', barlow:'"Barlow Condensed", sans-serif', manrope:'Manrope, sans-serif', space:'"Space Grotesk", sans-serif', dmSans:'"DM Sans", sans-serif', outfit:'Outfit, sans-serif', plex:'"IBM Plex Mono", monospace' }
export const radiusMap = { square:'0px', subtle:'5px', rounded:'12px', soft:'22px', pill:'999px' }
export const shadowMap = { flat:'none', fine:'0 2px 8px rgba(20,25,20,.07)', soft:'0 10px 32px rgba(20,25,20,.12)', deep:'0 16px 34px rgba(20,25,20,.2)', offset:'5px 5px 0 rgba(20,25,20,.75)' }
export const densityMap = { compact: .78, measured: .9, balanced: 1, airy: 1.13, spacious: 1.26 }
export const typeScaleMap = { restrained: .85, balanced: 1, expressive: 1.15, monumental: 1.29 }
export const gradientMap = {
  none: 'none',
  wash: 'linear-gradient(145deg, color-mix(in srgb, var(--p-accent) 55%, var(--p-bg)), var(--p-bg) 85%)',
  diagonal: 'linear-gradient(135deg, var(--p-accent), var(--p-subtle))',
  radial: 'radial-gradient(circle at 72% 28%, var(--p-accent), var(--p-subtle) 70%)',
  bands: 'linear-gradient(155deg, var(--p-accent) 0 38%, var(--p-subtle) 38% 72%, var(--p-bg) 72%)'
} as const
export const imageFrameMap = {
  open: 'No frame',
  inset: 'margin: 10px; border-radius: var(--p-radius)',
  outlined: 'outline: 1px solid var(--p-ink); outline-offset: -1px',
  panoramic: 'clip-path: inset(13% 0 round 3px)',
  captioned: 'Attach a caption strip to the bottom of the image'
} as const
export const sampleSelections: Selection[] = [
  {palette:'clay',headingFont:'fraunces',bodyFont:'dmSans',radius:'soft',shadow:'soft',density:'airy',border:'hairline',button:'solid',typeScale:'expressive',decoration:'arc',gradient:'wash',image:'warm',imageFrame:'captioned',navigation:'plain'},
  {palette:'forest',headingFont:'archivo',bodyFont:'manrope',radius:'subtle',shadow:'flat',density:'measured',border:'strong',button:'contrast',typeScale:'balanced',decoration:'line',gradient:'none',image:'muted',imageFrame:'outlined',navigation:'line'},
  {palette:'plum',headingFont:'dmSerif',bodyFont:'outfit',radius:'rounded',shadow:'fine',density:'spacious',border:'standard',button:'soft',typeScale:'monumental',decoration:'glow',gradient:'radial',image:'natural',imageFrame:'inset',navigation:'filled'}
]
export function validateSelections(value: unknown): value is Selection[] {
  return Array.isArray(value) && value.length === 3 && value.every(item => item && typeof item === 'object' && propertyNames.every(key => Object.hasOwn(options[key], item[key])))
}
export function rankThemes(probabilities: Record<string, Record<string, number>>): Selection[] {
  const output = [{},{},{}] as Selection[]
  for (const property of propertyNames) {
    const weights = probabilities[property]
    if (!weights || typeof weights !== 'object') throw new Error(`Missing ${property} probabilities`)
    const allowed = Object.keys(options[property])
    if (allowed.some(key => typeof weights[key] !== 'number' || !Number.isFinite(weights[key]) || weights[key] < 0)) throw new Error(`Invalid ${property} probabilities`)
    const ranked = allowed.sort((a,b) => weights[b] - weights[a] || a.localeCompare(b))
    for (let i=0; i<3; i++) (output[i] as unknown as Record<string,string>)[property] = ranked[i]
  }
  return output
}

export function createThemeExport(selection: Selection, prompt: string | null) {
  const [background, foreground, primary, accent, muted] = palettes[selection.palette]
  return {
    format: 'jev-theme-explorer/v1',
    prompt,
    choices: selection,
    tokens: {
      color: { background, foreground, primary, accent, muted },
      typography: { heading: fontMap[selection.headingFont], body: fontMap[selection.bodyFont], scale: typeScaleMap[selection.typeScale] },
      shape: { radius: radiusMap[selection.radius], shadow: shadowMap[selection.shadow], border: selection.border },
      spacing: { density: densityMap[selection.density] },
      treatments: { button: selection.button, decoration: selection.decoration, gradient: { name: selection.gradient, css: gradientMap[selection.gradient] }, image: selection.image, imageFrame: { name: selection.imageFrame, css: imageFrameMap[selection.imageFrame] }, navigation: selection.navigation }
    },
    cssVariables: {
      '--p-bg': background, '--p-ink': foreground, '--p-primary': primary,
      '--p-accent': accent, '--p-subtle': muted,
      '--p-heading': fontMap[selection.headingFont], '--p-body': fontMap[selection.bodyFont],
      '--p-radius': radiusMap[selection.radius], '--p-shadow': shadowMap[selection.shadow],
      '--p-density': densityMap[selection.density], '--p-scale': typeScaleMap[selection.typeScale],
      '--p-gradient': gradientMap[selection.gradient]
    }
  }
}
