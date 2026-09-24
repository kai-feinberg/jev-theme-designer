import { useState, type CSSProperties, type FormEvent } from 'react'
import { createThemeExport, densityMap, fontMap, gradientMap, palettes, radiusMap, sampleSelections, shadowMap, typeScaleMap, validateSelections, type Selection } from './theme'

type PageKind = 'landing' | 'editorial' | 'storefront' | 'dashboard'
const pages: { id: PageKind; label: string; description: string }[] = [
  { id: 'landing', label: 'Landing page', description: 'Story and calls to action' },
  { id: 'editorial', label: 'Editorial', description: 'Long-form reading' },
  { id: 'storefront', label: 'Storefront', description: 'Products and purchase flow' },
  { id: 'dashboard', label: 'Dashboard', description: 'Dense product interface' }
]
const prompts = ['Earthy and warm', 'Stark Swiss modernism', 'Playful candy', 'Understated luxury', 'Futuristic technical']
const illustrations = [
  { title: 'Keep the thread', text: 'Bring scattered notes into one clear place.', glyph: '✳' },
  { title: 'See the pattern', text: 'Find the useful signal in every conversation.', glyph: '◌' },
  { title: 'Make it matter', text: 'Turn observations into your next good move.', glyph: '↗' }
]
function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={diagonal ? 'M3 13 13 3M5 3h8v8' : 'M2 8h11m-4-4 4 4-4 4'} /></svg> }
function EditorialPage() {
  return <div className="sample-page editorial-page">
    <nav className="sample-nav"><strong className="sample-logo">Margin<span>.</span></strong><span>Stories&nbsp;&nbsp; Culture&nbsp;&nbsp; Notes</span><button type="button" tabIndex={-1}>Subscribe <Arrow diagonal /></button></nav>
    <div className="editorial-hero"><span className="preview-label">ISSUE 04 / THE ART OF NOTICING</span><h3>Some places stay with us.</h3><p>On walking slowly, looking closer, and finding a new story in familiar streets.</p><div className="editorial-byline">WORDS BY THE MARGIN EDITORS <span>·</span> 6 MIN READ</div></div>
    <div className="editorial-image visual-media" data-caption="COVER STUDY" aria-label="Abstract landscape illustration"><div className="editorial-sun"/><div className="editorial-land land-one"/><div className="editorial-land land-two"/><span>THE LONG WAY HOME</span></div>
    <div className="editorial-body"><div className="editorial-aside"><span>IN THIS STORY</span><b>01 / A slower route</b><b>02 / What we keep</b><b>03 / Looking again</b></div><div className="editorial-article"><p className="editorial-lead">There is a kind of attention that changes a place. It starts when we leave the usual path and give ourselves time to look.</p><p>At the edge of a city, a street can become a record of small decisions. A doorway, a faded sign, a garden spilling over a wall: each detail asks for a second glance.</p><blockquote>“The route was familiar. The feeling was entirely new.”</blockquote><p>We collect these moments because they remind us that discovery does not always require distance. Sometimes it only asks for patience.</p></div></div>
    <div className="editorial-more"><span className="preview-label">KEEP READING</span><h4>More from the margin</h4><div><article><span className="more-art more-a"/><small>ESSAY / 5 MIN</small><h5>The shape of an afternoon</h5></article><article><span className="more-art more-b"/><small>FIELD NOTE / 4 MIN</small><h5>Where the light lands</h5></article></div></div><footer className="sample-footer"><strong>Margin.</strong><span>Illustrative publication.</span></footer>
  </div>
}
function StorefrontPage() {
  const products = [ ['Arc Vessel','A quiet shape for everyday stems.','$48','vessel'], ['Folded Tray','A useful place for small things.','$36','tray'], ['Soft Form Lamp','Warm light with a simple outline.','$124','lamp'], ['Everyday Cup','Made for the first pause of the day.','$28','cup'] ]
  return <div className="sample-page storefront-page"><nav className="sample-nav"><strong className="sample-logo">Form & Found<span>.</span></strong><span>Objects&nbsp;&nbsp; Journal&nbsp;&nbsp; About</span><button type="button" tabIndex={-1}>Bag (0) <Arrow diagonal /></button></nav><div className="store-hero"><div><span className="preview-label">OBJECTS FOR THE EVERYDAY</span><h3>Make space for the things you love.</h3><p>A small collection of thoughtful forms for your home.</p><button className="demo-primary" type="button" tabIndex={-1}>Explore the collection <Arrow /></button></div><div className="store-hero-art visual-media" data-caption="COLLECTION STUDY"><span className="store-object store-vase"/><span className="store-shadow"/></div></div><div className="store-filter"><strong>THE COLLECTION</strong><span>All objects&nbsp;&nbsp; / &nbsp;&nbsp;Living&nbsp;&nbsp; / &nbsp;&nbsp;Table</span><span>04 ITEMS</span></div><div className="product-grid">{products.map(([name, description, price, kind], index) => <article className="product-card" key={name}><div className={`product-art visual-media art-${kind}`} data-caption="OBJECT STUDY"><span className="product-shape"/><small>0{index+1}</small></div><div className="product-meta"><div><h4>{name}</h4><p>{description}</p></div><b>{price}</b></div></article>)}</div><div className="store-note"><span>CARE IN EVERY DETAIL</span><h4>Useful things can be beautiful things.</h4><p>Each object is chosen for its shape, purpose, and place in daily life.</p></div><footer className="sample-footer"><strong>Form & Found.</strong><span>Illustrative shop · No purchases.</span></footer></div>
}
function DashboardPage() {
  const rows = [ ['Website refresh','Design','In review','Today'], ['Autumn campaign','Marketing','In progress','Oct 18'], ['Client onboarding','Product','Planned','Oct 22'], ['Quarterly report','Research','In progress','Oct 28'] ]
  return <div className="sample-page dashboard-page"><nav className="sample-nav"><strong className="sample-logo">Current<span>.</span></strong><span>Workspace / Overview</span><button type="button" tabIndex={-1}>AB <Arrow diagonal /></button></nav><div className="dash-layout"><aside className="dash-sidebar"><b>WORKSPACE</b><span className="selected">Overview</span><span>Projects</span><span>Activity</span><span>Team</span><b>YOUR VIEWS</b><span>This week</span><span>Needs review</span></aside><div className="dash-main"><div className="dash-heading"><div><span className="preview-label">MONDAY, OCTOBER 12</span><h3>Good morning, Alex.</h3><p>Here is what is moving across your workspace.</p></div><button type="button" tabIndex={-1} aria-disabled="true" className="demo-primary">New project <Arrow /></button></div><div className="dash-stats"><article><span>ACTIVE PROJECTS</span><strong>08</strong><small>Across 3 teams</small></article><article><span>NEEDS REVIEW</span><strong>03</strong><small>2 due this week</small></article><article><span>COMPLETED</span><strong>24</strong><small>In the last 30 days</small></article></div><div className="dash-chart"><div className="dash-chart-head"><div><span className="preview-label">WORKLOAD</span><h4>Activity over time</h4></div><span>LAST 8 WEEKS</span></div><div className="dash-bars">{[35,51,43,62,58,78,66,91].map((height,i)=><div key={i}><span style={{height:`${height}%`}}/><small>{i+1}</small></div>)}</div></div><div className="dash-table"><div className="dash-table-head"><h4>Recent projects</h4><span>VIEW ALL <Arrow diagonal /></span></div><div className="dash-row dash-label"><span>PROJECT</span><span>TEAM</span><span>STATUS</span><span>DUE</span></div>{rows.map(([name,team,status,due])=><div className="dash-row" key={name}><strong>{name}</strong><span>{team}</span><span><i className={status==='In review'?'review':''}/>{status}</span><span>{due}</span></div>)}</div></div></div><footer className="sample-footer"><strong>Current.</strong><span>An illustrative workspace.</span></footer></div>
}

function Preview({ theme, index, page, onCopy, copied }: { theme: Selection; index: number; page: PageKind; onCopy: () => void; copied: boolean }) {
  const [bg, ink, primary, accent, subtle] = palettes[theme.palette]
  const style = {
    '--p-bg': bg, '--p-ink': ink, '--p-primary': primary, '--p-accent': accent, '--p-subtle': subtle,
    '--p-heading': fontMap[theme.headingFont], '--p-body': fontMap[theme.bodyFont],
    '--p-radius': radiusMap[theme.radius], '--p-shadow': shadowMap[theme.shadow],
    '--p-density': densityMap[theme.density], '--p-scale': typeScaleMap[theme.typeScale], '--p-gradient': gradientMap[theme.gradient]
  } as CSSProperties
  return <article className="theme-panel" aria-label={`Theme ${index+1} preview`}>
    <header className="panel-head"><div><span className="panel-number">0{index+1}</span><h2>Interpretation {index+1}</h2></div><div className="panel-actions"><button type="button" className="copy-theme" onClick={onCopy} aria-label={`Copy theme ${index+1} as JSON`}>{copied ? 'Copied' : 'Copy theme'} <Arrow diagonal /></button><span className="panel-dot" style={{ background: primary }} /></div></header>
    <div className={`preview theme-border-${theme.border} theme-button-${theme.button} theme-deco-${theme.decoration} theme-gradient-${theme.gradient} theme-image-${theme.image} theme-frame-${theme.imageFrame} theme-nav-${theme.navigation}`} style={style}>
      {page === 'landing' ? <>
      <div className="preview-nav"><strong className="brand-mark"><span className="brand-symbol">✳</span> fieldwork<span className="brand-period">.</span></strong><span className="preview-nav-links">How it works&nbsp;&nbsp;&nbsp; Notes&nbsp;&nbsp;&nbsp; About</span><button className="nav-action" type="button" tabIndex={-1}>Get started <Arrow diagonal /></button></div>
      <div className="preview-hero"><div className="hero-copy"><span className="preview-label">A clearer way to see</span><h3>Good ideas start with <em>paying attention.</em></h3><p>A thoughtful home for the things you notice, the questions you ask, and the ideas worth keeping.</p><div className="hero-actions"><button type="button" tabIndex={-1} aria-disabled="true" className="demo-primary">Start exploring <Arrow /></button><button type="button" tabIndex={-1} aria-disabled="true" className="demo-secondary">See how it works</button></div></div><div className="hero-art visual-media" data-caption="FIELD NOTE" aria-hidden="true"><div className="art-circle circle-back"/><div className="art-card"><span className="art-top">FIELD NOTE / 024</span><div className="art-sun"/><div className="art-horizon"/><div className="art-lines"><i/><i/><i/></div><span className="art-bottom">a new perspective</span></div><div className="art-circle circle-front"/></div></div>
      <div className="trust-row"><span>MADE FOR CURIOUS MINDS</span><div>STUDIO / FIELD <span>✦</span> NORTH / NOTE <span>✦</span> COMMON / GROUND</div></div>
      <div className="preview-section intro-section"><div className="section-heading"><span className="preview-label">The small things add up</span><h4>Space to think. Room to grow.</h4></div><p>Fieldwork helps you collect what matters and find your way back to it, whenever inspiration strikes.</p></div>
      <div className="features">{illustrations.map((item, i) => <div className="feature" key={item.title}><span className="feature-glyph">{item.glyph}</span><span className="feature-index">0{i+1}</span><h5>{item.title}</h5><p>{item.text}</p><Arrow diagonal /></div>)}</div>
      <div className="split-section"><div className="split-art visual-media" data-caption="OBSERVATION" aria-hidden="true"><div className="split-disc"/><div className="split-paper"><span>OBSERVATION 07</span><div/><div/><div/></div></div><div><span className="preview-label">From observation to action</span><h4>Notice more. Make more of it.</h4><p>Every note is a starting point. Follow an idea, add context, and let the next step come into focus.</p><a href="#" tabIndex={-1} aria-disabled="true" onClick={e => e.preventDefault()}>Explore the process <Arrow /></a></div></div>
      <div className="quote-section"><span className="quote-mark">“</span><blockquote>The best ideas have a way of finding you when you leave room to notice.</blockquote><span className="quote-credit">A NOTE FROM THE FIELDWORK TEAM</span></div>
      <div className="final-section"><div><span className="preview-label">Begin anywhere</span><h4>Make room for your next idea.</h4><p>A small practice can change how you see everything.</p></div><div className="mini-form"><label htmlFor={`email-${index}`}>Your email</label><div><input id={`email-${index}`} type="email" placeholder="you@example.com" disabled /><button type="button" tabIndex={-1} aria-label="Illustrative submit"><Arrow /></button></div><small>Illustrative form · No data is collected</small></div></div>
      <div className="preview-footer"><strong>fieldwork.</strong><span>Keep looking closer.</span><span>© 2026 Fieldwork</span></div>
      </> : page === 'editorial' ? <EditorialPage /> : page === 'storefront' ? <StorefrontPage /> : <DashboardPage />}
    </div>
  </article>
}
export default function App() {
  const [prompt, setPrompt] = useState('earthy, warm, organic, slightly editorial')
  const [themes, setThemes] = useState<Selection[]>(sampleSelections)
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState<PageKind>('landing')
  const [copied, setCopied] = useState<number | null>(null)
  const [copyError, setCopyError] = useState('')
  async function copyTheme(theme: Selection, index: number) {
    try {
      await navigator.clipboard.writeText(JSON.stringify(createThemeExport(theme, generatedPrompt), null, 2))
      setCopied(index); setCopyError('')
      window.setTimeout(() => setCopied(current => current === index ? null : current), 2200)
    } catch { setCopyError('Could not copy. Allow clipboard access and try again.') }
  }
  async function generate(event?: FormEvent) {
    event?.preventDefault()
    if (loading) return
    setError(''); setLoading(true)
    try {
      const response = await fetch('/api/themes', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({prompt:prompt.trim()}) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Theme generation failed.')
      if (!validateSelections(data.themes)) throw new Error('The theme response was incomplete. Try again.')
      setThemes(data.themes); setGeneratedPrompt(prompt.trim())
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Theme generation failed.') }
    finally { setLoading(false) }
  }
  return <main className="app-shell"><header className="app-header"><a className="app-logo" href="/" aria-label="Jev Theme Explorer home"><span className="logo-icon"><span/><span/><span/><span/></span><span>jev<span className="logo-slash">/</span>theme explorer</span></a><div className="header-right"><span className="header-mode"><span/> DESIGN WORKBENCH</span><span className="header-version">V1.0</span></div></header>
    <section className="workspace-intro"><div className="intro-copy"><div className="meta-line"><span>EXPLORE VISUAL DIRECTIONS</span><span className="meta-rule"/></div><h1>One idea.<br/><em>Three ways to see it.</em></h1><p>Describe a visual feeling. Jev selects from a curated design vocabulary and shows you three interpretations on the same page.</p></div><div className="intro-index"><span className="index-graphic"><i/><i/><i/></span><span>01 INPUT <b>→</b> 03 INTERPRETATIONS</span></div></section>
    <section className="prompt-section" aria-label="Theme prompt"><form onSubmit={generate}><label htmlFor="prompt">YOUR AESTHETIC</label><div className="prompt-row"><input id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} maxLength={600} minLength={3} placeholder="Describe a visual direction…" required/><button disabled={loading || prompt.trim().length < 3} type="submit">{loading ? 'Generating…' : 'Generate themes'} <Arrow /></button></div></form><div className="prompt-examples"><span>TRY A DIRECTION</span>{prompts.map(item => <button key={item} type="button" onClick={() => setPrompt(item.toLowerCase())}>{item} <span>↗</span></button>)}</div>{error && <p className="error" role="alert">{error}</p>}</section>
    <section className="results" aria-label="Theme results"><div className="results-header"><div><span className="meta-line">THE EXPLORATION</span><h2>Three interpretations<span className="results-period">.</span></h2></div><p>{loading ? 'Jev is choosing the details…' : generatedPrompt ? (generatedPrompt === prompt.trim() ? 'Generated from your latest prompt.' : 'Showing themes from your previous prompt.') : 'A sample set, ready to explore.'}<br/>Same page. Different design language.</p></div><div className="page-picker"><div><strong>PREVIEW PAGE</strong><span>Switch the content. Keep the three themes.</span></div><div className="page-tabs" role="tablist" aria-label="Preview page">{pages.map(item => <button key={item.id} type="button" role="tab" aria-selected={page === item.id} onClick={() => setPage(item.id)} title={item.description}>{item.label}</button>)}</div></div>{copyError && <p className="error" role="alert">{copyError}</p>}<div className={`preview-grid ${loading ? 'is-loading' : ''}`} aria-busy={loading}>{themes.map((theme,index) => <Preview key={index} theme={theme} index={index} page={page} onCopy={() => copyTheme(theme,index)} copied={copied === index} />)}</div></section>
    <footer className="app-footer"><span>JEV / THEME EXPLORER</span><span>DESCRIBE · GENERATE · COMPARE</span><span>BUILT FOR VISUAL EXPLORATION</span></footer>
  </main>
}
