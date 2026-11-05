// src/pages/BrandToolkitPage.tsx
import React, { useState } from 'react';
import { BRAND_PERSONAS, BrandPersona, BrandTool, CodeSnippet } from '../data/brandToolkitData';
import { Copy, Check, ChevronDown, ChevronRight, ExternalLink, Zap, ArrowLeft } from 'lucide-react';

// ── Copy Button ────────────────────────────────────────────────────────────
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded
                 bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Đã sao chép' : 'Copy'}
    </button>
  );
};

// ── Syntax Highlight (simple token coloriser) ──────────────────────────────
const tokenize = (code: string, lang: string): React.ReactNode => {
  if (lang === 'md') return <span className="text-slate-300">{code}</span>;

  const lines = code.split('\n');
  const isComment = (l: string) =>
    l.trimStart().startsWith('#') || l.trimStart().startsWith('//') || l.trimStart().startsWith('--');
  const isString = (l: string) => /"[^"]*"|'[^']*'|`[^`]*`/.test(l);

  return (
    <>
      {lines.map((line, i) => {
        if (isComment(line)) {
          return <span key={i} className="text-slate-500">{line}{'\n'}</span>;
        }
        // keyword highlight
        const withKw = line
          .replace(/(const|let|var|export|import|from|interface|type|function|return|async|await|GET|POST|PATCH|DELETE|CREATE|SELECT|INSERT)\b/g,
            (m) => `\x01${m}\x02`)
          .replace(/("[^"]*"|'[^']*')/g, (m) => `\x03${m}\x04`);

        const parts = withKw.split(/(\x01[^\x02]*\x02|\x03[^\x04]*\x04)/g);
        return (
          <span key={i}>
            {parts.map((p, j) => {
              if (p.startsWith('\x01')) return <span key={j} className="text-violet-400">{p.slice(1, -1)}</span>;
              if (p.startsWith('\x03')) return <span key={j} className="text-amber-300">{p.slice(1, -1)}</span>;
              return <span key={j} className="text-slate-300">{p}</span>;
            })}
            {'\n'}
          </span>
        );
      })}
    </>
  );
};

// ── Code Snippet Block ─────────────────────────────────────────────────────
const CodeSnippetBlock: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const [open, setOpen] = useState(true);
  const langColors: Record<string, string> = {
    tsx: 'bg-violet-500/20 text-violet-300',
    ts: 'bg-blue-500/20 text-blue-300',
    js: 'bg-yellow-500/20 text-yellow-300',
    css: 'bg-pink-500/20 text-pink-300',
    json: 'bg-orange-500/20 text-orange-300',
    yaml: 'bg-cyan-500/20 text-cyan-300',
    sql: 'bg-blue-500/20 text-blue-200',
    bash: 'bg-green-500/20 text-green-300',
    md: 'bg-slate-500/20 text-slate-300',
  };
  const badgeClass = langColors[snippet.language] ?? 'bg-slate-500/20 text-slate-300';

  return (
    <div className="rounded-xl border border-slate-700/60 overflow-hidden mb-3 last:mb-0">
      {/* header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/80 hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          <span className="text-xs font-semibold text-slate-200">{snippet.label}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeClass}`}>
            {snippet.language}
          </span>
        </div>
        <CopyButton text={snippet.code} />
      </button>
      {/* body */}
      {open && (
        <div className="bg-slate-900 overflow-x-auto">
          <pre className="text-xs leading-5 p-4 font-mono whitespace-pre">
            {tokenize(snippet.code, snippet.language)}
          </pre>
        </div>
      )}
    </div>
  );
};

// ── Tool Card ──────────────────────────────────────────────────────────────
const ToolCard: React.FC<{ tool: BrandTool }> = ({ tool }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 overflow-hidden mb-4 last:mb-0 shadow-sm">
      {/* tool header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left flex items-start justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{tool.title}</span>
            {tool.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tool.badgeColor ?? 'bg-slate-100 text-slate-600'}`}>
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{tool.description}</p>
        </div>
        {expanded
          ? <ChevronDown className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
          : <ChevronRight className="w-4 h-4 text-slate-400 mt-1 shrink-0" />}
      </button>

      {/* snippets */}
      {expanded && tool.snippets && tool.snippets.length > 0 && (
        <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700/60 pt-4">
          {tool.snippets.map(s => <CodeSnippetBlock key={s.label} snippet={s} />)}
        </div>
      )}

      {/* links */}
      {expanded && tool.links && tool.links.length > 0 && (
        <div className="px-5 pb-4 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-700/60 pt-3">
          {tool.links.map(l => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Quickstart Checklist ───────────────────────────────────────────────────
const QuickstartChecklist: React.FC<{ steps: string[] }> = ({ steps }) => {
  const [checked, setChecked] = useState<boolean[]>(steps.map(() => false));
  const toggle = (i: number) => setChecked(c => { const n = [...c]; n[i] = !n[i]; return n; });
  const done = checked.filter(Boolean).length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">⚡ Quick Start</h4>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{done}/{steps.length} hoàn thành</span>
      </div>
      {/* progress bar */}
      <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-500 cursor-pointer shrink-0"
              />
              <span className={`text-xs leading-relaxed transition-colors ${
                checked[i]
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100'
              }`}>
                {step}
              </span>
            </label>
          </li>
        ))}
      </ol>
    </div>
  );
};

// ── Persona Hero Card ──────────────────────────────────────────────────────
const PersonaHero: React.FC<{ persona: BrandPersona; onBack: () => void }> = ({ persona, onBack }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Back */}
    <button
      onClick={onBack}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400
                 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" /> Chọn vai trò khác
    </button>

    {/* Hero */}
    <div className={`rounded-3xl bg-gradient-to-br ${persona.colorFrom} ${persona.colorTo} p-8 mb-8 text-white shadow-xl`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="text-6xl">{persona.emoji}</div>
        <div>
          <div className="text-sm font-semibold opacity-70 mb-1">Bộ Công Cụ Thương Hiệu</div>
          <h1 className="text-3xl font-black tracking-tight mb-1">{persona.titleVi}</h1>
          <p className="text-sm opacity-85 max-w-xl">{persona.descriptionVi}</p>
        </div>
      </div>
    </div>

    {/* 2-column layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tools — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-500" /> Công cụ & Tài nguyên
        </h2>
        {persona.tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
      </div>

      {/* Quickstart — 1 col */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">🚀 Bắt đầu ngay</h2>
        <QuickstartChecklist steps={persona.quickstartSteps} />

        {/* Brand Meta Card */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-5 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">🎨 WikiAlisa Brand</h4>
          <div className="space-y-2">
            {[
              { label: 'Primary', hex: '#10b981', cls: 'bg-emerald-500' },
              { label: 'Dark',    hex: '#059669', cls: 'bg-emerald-600' },
              { label: 'Solar',   hex: '#f59e0b', cls: 'bg-amber-500' },
              { label: 'Alert',   hex: '#ef4444', cls: 'bg-red-500' },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg ${c.cls} shadow-sm`} />
                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{c.label}</div>
                  <div className="text-[10px] font-mono text-slate-500">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="text-[11px] text-slate-500 mb-1">Typography</div>
            <div className="font-bold text-slate-800 dark:text-slate-100 text-sm" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Manrope / Inter
            </div>
            <div className="text-[10px] text-slate-400">8pt grid · Mobile-first 390px · WCAG 2.1 AA</div>
          </div>
        </div>

        {/* Figma link */}
        <a
          href="https://www.figma.com/file/eq0EA9dRSWfS2ivuFohJdg"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60
                     bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white text-xs font-black">
            F
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Figma Design System</div>
            <div className="text-[10px] text-slate-500 font-mono">eq0EA9dRSWfS2ivuFohJdg</div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
        </a>
      </div>
    </div>
  </div>
);

// ── Persona Selector Grid ──────────────────────────────────────────────────
const PersonaSelectorGrid: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Page header */}
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Brand Toolkit
        </span>
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
        Bộ Công Cụ Thương Hiệu
        <span className="block text-emerald-500">WikiAlisa</span>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
        Tài nguyên thiết kế, code snippets, và hướng dẫn được tùy chỉnh theo từng vai trò.
        Chọn vai trò của bạn để bắt đầu.
      </p>
    </div>

    {/* Persona grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {BRAND_PERSONAS.map(persona => (
        <button
          key={persona.id}
          onClick={() => onSelect(persona.id)}
          className={`group text-left p-5 rounded-2xl border ${persona.borderColor} bg-white dark:bg-slate-800/60
                      hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 shadow-sm`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${persona.colorFrom} ${persona.colorTo}
                            flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform`}>
              {persona.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-bold mb-0.5 ${persona.textColor}`}>
                {persona.title}
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {persona.titleVi}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                {persona.descriptionVi}
              </p>
            </div>
          </div>

          {/* Tool count pills */}
          <div className="flex items-center gap-2 mt-4">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${persona.bgLight} ${persona.textColor}`}>
              {persona.tools.length} công cụ
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              {persona.quickstartSteps.length} bước khởi đầu
            </span>
            <ChevronRight className={`w-3.5 h-3.5 ml-auto ${persona.textColor} group-hover:translate-x-0.5 transition-transform`} />
          </div>
        </button>
      ))}
    </div>

    {/* Bottom brand bar */}
    <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center">
      <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
        🏗️ WikiAlisa Solar Hub v2.4 — Design System Source
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        Figma file key: <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono text-[10px]">eq0EA9dRSWfS2ivuFohJdg</code>
        &nbsp;·&nbsp; Stack: React 19 + TypeScript + Tailwind + Vite + pnpm
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-[10px] font-semibold">
        {['Mobile-First 390px', 'Offline-First', 'WCAG 2.1 AA', 'MQTT 5.0', 'TimescaleDB', 'GitHub Pages'].map(tag => (
          <span key={tag} className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ── Main Page Export ───────────────────────────────────────────────────────
export const BrandToolkitPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPersona = BRAND_PERSONAS.find(p => p.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {selectedPersona ? (
        <PersonaHero persona={selectedPersona} onBack={() => setSelectedId(null)} />
      ) : (
        <PersonaSelectorGrid onSelect={setSelectedId} />
      )}
    </div>
  );
};
