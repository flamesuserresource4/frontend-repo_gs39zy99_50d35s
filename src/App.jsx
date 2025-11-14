import { useEffect, useMemo, useState } from 'react'
import { QuoteTemplate, templateMeta } from './components/QuoteTemplates'

const templates = Object.keys(templateMeta)

function App() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('aurora')
  const [tag, setTag] = useState('')

  const backendBase = useMemo(() => (
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  ), [])

  const fetchRandom = async () => {
    setLoading(true)
    try {
      const url = new URL('/api/quotes/random', backendBase)
      if (tag.trim()) url.searchParams.set('tag', tag.trim())
      const res = await fetch(url.toString())
      const data = await res.json()
      setQuote(data)
      if (data.template) setSelectedTemplate(data.template)
    } catch (e) {
      setQuote({ text: 'Backend not reachable. Showing a demo quote.', author: 'System' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandom()
  }, [])

  const copyAsImage = async () => {
    try {
      const el = document.getElementById('quote-card')
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(el, { cacheBust: true, pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = 'quote.png'
      link.href = dataUrl
      link.click()
    } catch (e) {
      alert('Failed to export image')
    }
  }

  const nextTemplate = () => {
    const i = templates.indexOf(selectedTemplate)
    const next = templates[(i + 1) % templates.length]
    setSelectedTemplate(next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Quote Generator</h1>
          <p className="mt-2 text-gray-600">Generate beautiful quotes with stylish templates.</p>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
          <div className="flex gap-2">
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Filter by tag (e.g. motivation)"
              className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={fetchRandom}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'New Quote'}
            </button>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300"
            >
              {templates.map((t) => (
                <option key={t} value={t}>{templateMeta[t].name}</option>
              ))}
            </select>
            <button onClick={nextTemplate} className="px-3 py-2 rounded-lg border border-gray-300">Shuffle Style</button>
            <button onClick={copyAsImage} className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Export PNG</button>
          </div>
        </div>

        <div id="quote-card" className="px-2">
          {quote && (
            <QuoteTemplate template={selectedTemplate} text={quote.text} author={quote.author} />
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          Tips: Use the tag filter to find themed quotes. Export as image to share.
        </footer>
      </div>
    </div>
  )
}

export default App
