'use client';

import { useState, useMemo } from 'react';
import { Check, Copy, Linkedin, Instagram, Github, Heart } from 'lucide-react';
import { GridConfig, GridElement, Language } from '@/lib/types';
import { translations } from '@/lib/translations';
import Image from 'next/image';

export const Footer = ({ items, config, lang }: { items: GridElement[], config: GridConfig, lang: Language }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const t = translations[lang].footer;

  const htmlCode = useMemo(() => `<div class="parent">\n${items.map(i => `  <div class="div${i.number}">${i.number}</div>`).join('\n')}\n</div>`, [items]);
  const cssCode = useMemo(() => {
    const parent = `.parent {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  grid-template-rows: repeat(${config.rows}, 1fr);\n  gap: ${config.gap}px;\n}\n\n`;
    const children = items.map(i => `.div${i.number} { \n  grid-area: ${i.rowStart} / ${i.colStart} / span ${i.rowSpan} / span ${i.colSpan}; \n}`).join('\n');
    return parent + children;
  }, [items, config]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    /* CAMBIADO: bg-[#1E293B] -> bg-app-bg | border-slate-700 -> border-border-main */
    <footer className="bg-app-bg border-t border-border-main p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
        {/* BLOQUES DE CÓDIGO HTML Y CSS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {[{ l: 'HTML', c: htmlCode }, { l: 'CSS', c: cssCode }].map(b => (
            <div key={b.l} className="flex flex-col space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> {b.l} {t.html}
                </span>
                <button
                  onClick={() => copyToClipboard(b.c, b.l)}
                  /* CAMBIADO: bg-slate-800 -> bg-card-bg | border-slate-600 -> border-border-main | text-slate-300 -> text-text-body */
                  className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-[10px] font-black border transition-all uppercase tracking-tighter ${copyStatus === b.l ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-card-bg border-border-main text-text-body hover:bg-app-bg active:scale-95'}`}
                >
                  {copyStatus === b.l ? <Check size={14} /> : <Copy size={14} />}
                  <span className="hidden xs:inline">{copyStatus === b.l ? t.copied : t.copy}</span>
                </button>
              </div>
              {/* CAMBIADO: bg-[#0F172A] -> bg-card-bg | border-slate-700 -> border-border-main | text-slate-400 -> text-text-body */}
              <div className="bg-card-bg rounded-2xl p-4 md:p-6 border border-border-main text-[11px] md:text-[12px] font-mono text-text-body shadow-inner border-l-4 border-l-blue-500/50 overflow-hidden transition-colors">
                <pre className="whitespace-pre-wrap break-all leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                  <code>{b.c}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN FINAL: LOGO, CRÉDITOS Y REDES */}
        {/* CAMBIADO: border-slate-800 -> border-border-main */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end pt-8 md:pt-10 border-t border-border-main gap-8">
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="GridForge Logo"
                width={32}
                height={32}
                priority
                className="object-contain rounded-lg overflow-hidden md:w-[40px] md:h-[40px]"
              />
              <div>
                {/* CAMBIADO: text-white -> text-text-title */}
                <h3 className="text-text-title font-black text-sm uppercase tracking-tighter italic mb-1">GRIDFORGE</h3>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>{t.crafted}</span>
                  <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                  <span>{t.by}</span>
                  {/* CAMBIADO: text-slate-300 -> text-text-title */}
                  <a href="https://www.theribeor.com" target="_blank" rel="noopener noreferrer" className="text-text-title hover:text-blue-500 underline decoration-border-main underline-offset-4 transition-colors">The Ribeor</a>
                  <span className="hidden xs:inline">© {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* REDES SOCIALES */}
          {/* CAMBIADO: text-slate-500 -> text-text-body | hover:text-white -> hover:text-text-title */}
          <div className="flex gap-6 text-text-body pb-2 md:pb-0">
            <a href="https://github.com/Diegoberrio1601" target="_blank" rel="noopener noreferrer" className="hover:text-text-title transition-all transform hover:-translate-y-1">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/diegoberrio1601/" target="_blank" rel="noopener noreferrer" className="hover:text-text-title transition-all transform hover:-translate-y-1">
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/theribeor/" target="_blank" rel="noopener noreferrer" className="hover:text-text-title transition-all transform hover:-translate-y-1">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};