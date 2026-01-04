import { X, Plus, Move, Maximize, Heart, Settings2, RotateCcw } from 'lucide-react';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

export const HelpModal = ({ onClose, lang }: { onClose: () => void, lang: Language }) => {
  const t = translations[lang].modal;

  const steps = [
    { icon: <Plus size={16} className="text-blue-400" />, text: t.step1 },
    { icon: <Move size={16} className="text-blue-400" />, text: t.step2 },
    { icon: <Maximize size={16} className="text-blue-400" />, text: t.step3 },
    { icon: <Settings2 size={16} className="text-emerald-400" />, text: t.step4 },
    { icon: <RotateCcw size={16} className="text-red-400" />, text: t.step5 },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all" onClick={onClose}>
      {/* CAMBIADO: bg-[#1e293b] -> bg-card-bg | border-slate-700 -> border-border-main */}
      <div 
        className="bg-card-bg border border-border-main w-full max-w-md rounded-[2rem] p-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] space-y-8 animate-in fade-in zoom-in duration-300 relative overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        {/* Glow decorativo de fondo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-2">
            <span className="font-black text-blue-500 uppercase tracking-[0.3em] text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              {t.guide}
            </span>
            {/* CAMBIADO: text-white -> text-text-title */}
            <h2 className="text-text-title font-black text-2xl leading-tight tracking-tighter uppercase italic transition-colors">
              {t.title}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            /* CAMBIADO: text-slate-500 -> text-text-body | hover:bg-slate-800 -> hover:bg-app-bg */
            className="text-text-body hover:text-text-title hover:bg-app-bg rounded-full p-2 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid gap-3 relative z-10">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              /* CAMBIADO: bg-slate-900/40 -> bg-app-bg/50 | border-slate-800/50 -> border-border-main */
              className="flex gap-4 items-center bg-app-bg/50 p-4 rounded-2xl border border-border-main hover:border-blue-500/50 transition-all group"
            >
              {/* CAMBIADO: bg-slate-800 -> bg-card-bg | border-slate-700 -> border-border-main */}
              <div className="bg-card-bg p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-border-main">
                {step.icon}
              </div>
              {/* CAMBIADO: text-slate-300 -> text-text-body | group-hover:text-white -> group-hover:text-text-title */}
              <p className="text-[11px] font-medium leading-relaxed text-text-body group-hover:text-text-title transition-colors">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* CAMBIADO: border-slate-800 -> border-border-main */}
        <div className="pt-6 border-t border-border-main flex flex-col gap-5 relative z-10">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
            <span className="opacity-50 tracking-[0.2em]">Engine v1.0.0</span>
            <div className="flex items-center gap-1.5">
              <span>{t.author}</span>
              {/* CAMBIADO: text-white -> text-text-title */}
              <a href="https://www.theribeor.com" target="_blank" className="text-text-title hover:text-blue-500 transition-colors underline decoration-blue-500/30 underline-offset-4">The Ribeor</a>
              <Heart size={10} className="fill-red-500 text-red-500 animate-pulse" />
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl uppercase text-[12px] tracking-[0.4em] transition-all shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] active:scale-[0.97]"
          >
            {t.button}
          </button>
        </div>
      </div>
    </div>
  );
}