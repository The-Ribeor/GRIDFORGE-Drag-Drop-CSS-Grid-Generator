'use client';

import { useState } from 'react';
import { X, Copy, Check, Terminal, Code2 } from 'lucide-react';
import { GridElement, GridConfig } from '@/lib/types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GridElement[];
  config: GridConfig;
}

export const ExportModal = ({ isOpen, onClose, items, config }: ExportModalProps) => {
  const [mode, setMode] = useState<'tailwind' | 'css'>('tailwind');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateTailwind = () => {
    const container = `grid grid-cols-[repeat(${config.columns},_minmax(0,_1fr))] grid-rows-[repeat(${config.rows},_minmax(0,_1fr))] gap-[${config.gap}px]`;
    const children = items.map(item => 
      `  <div class="col-[${item.colStart}/span_${item.colSpan}] row-[${item.rowStart}/span_${item.rowSpan}] bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold p-4">\n    ${item.number}\n  </div>`
    ).join('\n');
    return `<div class="${container}">\n${children}\n</div>`;
  };

  const generateCSS = () => {
    const itemStyles = items.map(item => 
      `.item-${item.number} { grid-column: ${item.colStart} / span ${item.colSpan}; grid-row: ${item.rowStart} / span ${item.rowSpan}; }`
    ).join('\n');
    return `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  grid-template-rows: repeat(${config.rows}, 90px);\n  gap: ${config.gap}px;\n}\n\n${itemStyles}`;
  };

  const code = mode === 'tailwind' ? generateTailwind() : generateCSS();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-[#1E293B] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <div className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-widest">
            <Code2 size={16} className="text-blue-400" /> Exportar Código
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        
        <div className="p-2 flex gap-1 bg-slate-900/50 border-b border-slate-700">
          {(['tailwind', 'css'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                mode === m ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-800'
              }`}
            >
              {m === 'tailwind' ? 'Tailwind CSS' : 'CSS Grid'}
            </button>
          ))}
        </div>

        <div className="relative group flex-1">
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 z-10 p-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-white transition-all active:scale-95 flex items-center gap-2"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            <span className="text-[10px] font-bold uppercase">{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
          <pre className="p-6 text-[12px] font-mono text-blue-300 overflow-auto max-h-[50vh] bg-[#0F172A] leading-relaxed">
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
};