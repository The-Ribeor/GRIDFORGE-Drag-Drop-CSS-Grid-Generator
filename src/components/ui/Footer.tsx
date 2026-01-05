'use client';

import { useState, useMemo } from 'react';
import { Check, Copy, Linkedin, Instagram, Github, Heart, Zap, Code2 } from 'lucide-react';
import { GridConfig, GridElement, Language } from '@/lib/types';
import { translations } from '@/lib/translations';
import Image from 'next/image';

export const Footer = ({ items, config, lang }: { items: GridElement[], config: GridConfig, lang: Language }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [isTailwindMode, setIsTailwindMode] = useState(false);
  const t = translations[lang].footer;

  // Sincronización precisa: El color depende del número del bloque (1-5)
  const getItemColor = (num: number) => {
    const colorIndex = ((num - 1) % 5) + 1;
    return {
      css: `var(--item-c${colorIndex})`,
      tw: `bg-item-${colorIndex}`
    };
  };

  // --- GENERADOR HTML ---
  const htmlCode = useMemo(() => 
    `<div class="grid-container">\n${items.map(i => `  <div class="item-${i.number}">${i.number}</div>`).join('\n')}\n</div>`, 
  [items]);

  // --- GENERADOR CSS ---
  const cssCode = useMemo(() => {
    const parent = `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  grid-template-rows: repeat(${config.rows}, 1fr);\n  gap: ${config.gap}px;\n  padding: 20px;\n  background-color: var(--app-bg);\n  border: 1px solid var(--border-main);\n  border-radius: 16px;\n  min-height: 500px;\n}\n\n`;
    
    const children = items.map((i) => {
      const color = getItemColor(i.number).css;
      return `.item-${i.number} {\n  grid-column: ${i.colStart} / span ${i.colSpan};\n  grid-row: ${i.rowStart} / span ${i.rowSpan};\n  background-color: ${color};\n  color: var(--text-title);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  border-radius: 8px;\n  border: 1px dashed #94a3b8;\n}`;
    }).join('\n\n');
    
    return parent + children;
  }, [items, config]);

  // --- GENERADOR TAILWIND ---
  const tailwindCode = useMemo(() => {
    const gapScale = Math.round(config.gap / 4);
    const container = `grid grid-cols-${config.columns} grid-rows-${config.rows} gap-${gapScale} w-full min-h-[500px] bg-app-bg p-6 border border-border-main rounded-2xl`;
    
    const children = items.map((i) => {
      const colorTw = getItemColor(i.number).tw;
      const colStart = i.colStart === 1 ? '' : `col-start-${i.colStart} `;
      const colSpan = `col-span-${i.colSpan}`;
      const rowStart = `row-start-${i.rowStart}`;
      const rowSpan = i.rowSpan > 1 ? ` row-span-${i.rowSpan}` : '';
      
      const finalClasses = `${colorTw} ${colStart}${colSpan} ${rowStart}${rowSpan} border border-dashed border-slate-400/50`.trim().replace(/\s+/g, ' ');

      return `  <div class="${finalClasses} rounded-lg flex items-center justify-center text-text-title font-bold">\n    ${i.number}\n  </div>`;
    }).join('\n');

    return `<div class="${container}">\n${children}\n</div>`;
  }, [items, config]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <footer className="bg-app-bg border-t border-border-main p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
        
        {/* CABECERA CON BOTÓN SWITCHER */}
        <div className="flex justify-between items-center px-1 border-b border-border-main pb-4">
          <div className="flex items-center gap-2">
             <Code2 size={18} className="text-blue-500" />
             <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
               {isTailwindMode ? t.titleTailwind : t.titleGrid}
             </span>
          </div>
          <button
            onClick={() => setIsTailwindMode(!isTailwindMode)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black border transition-all uppercase tracking-widest active:scale-95 ${
              isTailwindMode 
                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-card-bg border-border-main text-text-body hover:bg-app-bg'
            }`}
          >
            <Zap size={14} fill={isTailwindMode ? "white" : "none"} />
            {isTailwindMode ? t.switchStandard : t.switchTailwind}
          </button>
        </div>

        {/* BLOQUES DE CÓDIGO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {!isTailwindMode ? (
            <>
              {[{ l: 'HTML', c: htmlCode, t: t.html }, { l: 'CSS', c: cssCode, t: t.css }].map(b => (
                <div key={b.l} className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> {b.l} {b.t}
                    </span>
                    <button
                      onClick={() => copyToClipboard(b.c, b.l)}
                      className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-[10px] font-black border transition-all uppercase tracking-tighter ${copyStatus === b.l ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-card-bg border-border-main text-text-body hover:bg-app-bg active:scale-95'}`}
                    >
                      {copyStatus === b.l ? <Check size={14} /> : <Copy size={14} />}
                      <span className="hidden xs:inline">{copyStatus === b.l ? t.copied : t.copy}</span>
                    </button>
                  </div>
                  <div className="bg-card-bg rounded-2xl p-4 md:p-6 border border-border-main text-[11px] md:text-[12px] font-mono text-text-body shadow-inner border-l-4 border-l-blue-500/50 overflow-hidden transition-colors">
                    <pre className="whitespace-pre-wrap break-all leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                      <code>{b.c}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-span-1 md:col-span-2 flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-blue-500 tracking-[0.2em] uppercase flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> TAILWIND {t.tailwind}
                </span>
                <button
                  onClick={() => copyToClipboard(tailwindCode, 'TW')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black border transition-all uppercase tracking-tighter ${copyStatus === 'TW' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-card-bg border-border-main text-text-body hover:bg-app-bg active:scale-95'}`}
                >
                  {copyStatus === 'TW' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copyStatus === 'TW' ? t.copied : t.copy}</span>
                </button>
              </div>
              <div className="bg-card-bg rounded-2xl p-6 md:p-8 border border-border-main text-[11px] md:text-[13px] font-mono text-text-body shadow-inner border-l-4 border-l-blue-600 overflow-hidden transition-colors">
                <pre className="whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
                  <code>{tailwindCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* SECCIÓN FINAL */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end pt-8 md:pt-10 border-t border-border-main gap-8">
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="GridForge Logo" width={32} height={32} priority className="object-contain rounded-lg md:w-[40px] md:h-[40px]" />
              <div>
                <h3 className="text-text-title font-black text-sm uppercase tracking-tighter italic mb-1">GRIDFORGE</h3>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>{t.crafted}</span>
                  <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                  <span>{t.by}</span>
                  <a href="https://www.theribeor.com" target="_blank" rel="noopener noreferrer" className="text-text-title hover:text-blue-500 underline decoration-border-main underline-offset-4 transition-colors">The Ribeor</a>
                  <span className="hidden xs:inline">© {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 text-text-body pb-2 md:pb-0">
            <a href="https://github.com/Diegoberrio1601" target="_blank" rel="noopener noreferrer" className="hover:text-text-title transition-all transform hover:-translate-y-1"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/diegoberrio1601/" target="_blank" rel="noopener noreferrer" className="hover:text-text-title transition-all transform hover:-translate-y-1"><Linkedin size={20} /></a>
            <a href="https://www.instagram.com/theribeor/" target="_blank" rel="noopener noreferrer" className="hover:text-text-title transition-all transform hover:-translate-y-1"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};