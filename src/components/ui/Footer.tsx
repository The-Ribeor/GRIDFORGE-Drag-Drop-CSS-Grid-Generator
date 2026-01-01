import { useState, useMemo } from 'react';
import { Check, Copy, Box, Linkedin, Instagram, Github, Heart } from 'lucide-react';
import { GridConfig, GridElement } from '@/lib/types';

export const Footer = ({ items, config }: { items: GridElement[], config: GridConfig }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

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
    <footer className="bg-[#1E293B] border-t border-slate-700 p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {[ { l: 'HTML', c: htmlCode }, { l: 'CSS', c: cssCode } ].map(b => (
            <div key={b.l} className="flex flex-col space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" /> {b.l} SOURCE
                </span>
                <button 
                  onClick={() => copyToClipboard(b.c, b.l)} 
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black border transition-all uppercase tracking-tighter ${copyStatus === b.l ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 active:scale-95'}`}
                >
                  {copyStatus === b.l ? <Check size={14} /> : <Copy size={14} />} {copyStatus === b.l ? 'Listo' : 'Copiar'}
                </button>
              </div>
              
              <div className="bg-[#0F172A] rounded-2xl p-6 min-h-[160px] h-auto border border-slate-700 text-[12px] font-mono text-slate-400 shadow-inner border-l-4 border-l-slate-600">
                <pre className="whitespace-pre-wrap break-all leading-relaxed">
                  <code>{b.c}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end pt-10 border-t border-slate-800 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg border border-slate-700"><Box size={24} className="text-white" /></div>
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-tighter italic leading-none mb-1">GRIDFORGE</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Crafted with</span>
                  <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                  <span>by</span>
                  <a 
                    href="https://www.theribeor.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-300 hover:text-white transition-colors underline decoration-slate-700 underline-offset-4"
                  >
                    The Ribeor
                  </a>
                  <span className="text-slate-700 ml-1">© {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 text-slate-500">
             <a href="https://github.com/Diegoberrio1601" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:-translate-y-1"><Github size={20}/></a>
             <a href="https://www.linkedin.com/in/diegoberrio1601/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:-translate-y-1"><Linkedin size={20}/></a>
             <a href="https://www.instagram.com/theribeor/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all transform hover:-translate-y-1"><Instagram size={20}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
};