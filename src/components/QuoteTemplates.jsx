import React from 'react'

const TemplateWrapper = ({ children, className = '' }) => (
  <div className={`w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl shadow-xl transition-all ${className}`}>
    {children}
  </div>
)

export function AuroraTemplate({ text, author }) {
  return (
    <TemplateWrapper className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <p className="text-2xl sm:text-3xl font-semibold leading-snug tracking-tight drop-shadow-md">“{text}”</p>
      <p className="mt-6 text-right text-lg opacity-90">— {author || 'Unknown'}</p>
    </TemplateWrapper>
  )
}

export function PaperTemplate({ text, author }) {
  return (
    <TemplateWrapper className="bg-[#faf6ef] text-[#2b2b2b] border-2 border-[#e8dfcf] [background-image:radial-gradient(#e8dfcf_1px,transparent_1px)] [background-size:20px_20px]">
      <p className="text-2xl sm:text-3xl font-serif leading-relaxed">“{text}”</p>
      <p className="mt-6 text-right italic">— {author || 'Unknown'}</p>
    </TemplateWrapper>
  )
}

export function NeonTemplate({ text, author }) {
  return (
    <TemplateWrapper className="bg-[#0b1020] text-white ring-1 ring-indigo-600/30">
      <div className="relative">
        <p className="text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-300 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">“{text}”</span>
        </p>
        <div className="absolute inset-0 -z-10 blur-2xl bg-indigo-600/20 rounded-2xl" />
      </div>
      <p className="mt-6 text-right text-indigo-200">— {author || 'Unknown'}</p>
    </TemplateWrapper>
  )
}

export function SerifTemplate({ text, author }) {
  return (
    <TemplateWrapper className="bg-white text-gray-900 border border-gray-200">
      <p className="text-3xl sm:text-4xl font-serif leading-snug">“{text}”</p>
      <div className="mt-6 flex items-center justify-end gap-3">
        <span className="h-px w-12 bg-gray-300" />
        <p className="text-right text-gray-600">{author || 'Unknown'}</p>
      </div>
    </TemplateWrapper>
  )
}

export function MinimalTemplate({ text, author }) {
  return (
    <TemplateWrapper className="bg-gradient-to-br from-gray-50 to-white text-gray-900 border border-gray-100">
      <p className="text-2xl sm:text-3xl font-medium leading-tight">“{text}”</p>
      <p className="mt-6 text-right text-gray-500">— {author || 'Unknown'}</p>
    </TemplateWrapper>
  )
}

// New: Cosmic glassmorphism template with aurora glow and starfield
export function CosmicTemplate({ text, author }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-fuchsia-500/40 via-indigo-500/30 to-cyan-500/20 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_30%,rgba(255,255,255,0.06)_70%,transparent)]" />
      </div>
      <TemplateWrapper className="backdrop-blur-xl bg-white/10 border border-white/20 text-white">
        <p className="text-2xl sm:text-3xl font-semibold leading-snug tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">“{text}”</p>
        <p className="mt-6 text-right text-lg text-white/90">— {author || 'Unknown'}</p>
        <div className="mt-6 flex items-center justify-between text-xs text-white/70">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_12px_theme(colors.fuchsia.400)]" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_12px_theme(colors.indigo.400)]" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_theme(colors.cyan.400)]" />
          </span>
          <span>cosmic glass</span>
        </div>
      </TemplateWrapper>
    </div>
  )
}

export const templateMeta = {
  aurora: { name: 'Aurora' },
  paper: { name: 'Paper' },
  neon: { name: 'Neon' },
  serif: { name: 'Serif' },
  minimal: { name: 'Minimal' },
  cosmic: { name: 'Cosmic Glass' },
}

export function QuoteTemplate({ template = 'aurora', text, author }) {
  switch (template) {
    case 'paper':
      return <PaperTemplate text={text} author={author} />
    case 'neon':
      return <NeonTemplate text={text} author={author} />
    case 'serif':
      return <SerifTemplate text={text} author={author} />
    case 'minimal':
      return <MinimalTemplate text={text} author={author} />
    case 'cosmic':
      return <CosmicTemplate text={text} author={author} />
    case 'aurora':
    default:
      return <AuroraTemplate text={text} author={author} />
  }
}
