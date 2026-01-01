import { useState, useEffect } from 'react';
import { HelpCircle, Github, Linkedin, Instagram, Languages, RotateCcw } from 'lucide-react'; // Importamos RotateCcw
import { GridConfig, Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface NavbarProps {
  config: GridConfig;
  setConfig: (config: GridConfig) => void;
  onShowHelp: () => void;
  onReset: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar = ({ config, setConfig, onShowHelp, onReset, lang, onToggleLang }: NavbarProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 1000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  const socialLinks = [
    { href: "https://github.com/Diegoberrio1601", icon: <Github size={18} /> },
    { href: "https://www.linkedin.com/in/diegoberrio1601/", icon: <Linkedin size={18} /> },
    { href: "https://www.instagram.com/theribeor/", icon: <Instagram size={18} /> }
  ];

  return (
    <nav className="h-16 border-b border-slate-700 bg-[#1E293B]/95 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-[100]">
      <div className="flex items-center gap-10">
        <div className="font-black text-white tracking-widest text-sm uppercase italic shrink-0">GRIDFORGE</div>
        
        <div className="flex gap-8 border-l border-slate-700 pl-8 items-center">
          {(['columns', 'rows', 'gap'] as const).map(k => (
            <div key={k} className="flex flex-col items-start justify-center">
              <label className="text-[7px] font-black uppercase text-slate-500 tracking-[0.2em] leading-none mb-1.5 ml-[1px]">
                {t[k]}
              </label>
              <input
                type="number"
                value={config[k]}
                onChange={e => setConfig({ ...config, [k]: parseInt(e.target.value) || 1 })}
                className="w-10 bg-transparent border-none p-0 text-sm font-bold text-slate-100 focus:ring-0 leading-none h-4 appearance-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* BOTÓN DE IDIOMA - REDISEÑADO */}
        <button 
          onClick={onToggleLang}
          className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <Languages size={10} className="text-blue-400 group-hover:text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">
            {lang}
          </span>
        </button>

        <div className="flex gap-5 border-r border-slate-700 pr-6 items-center h-8">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-all transform hover:-translate-y-0.5">
              {link.icon}
            </a>
          ))}
        </div>

        <div className="relative flex items-center justify-center">
          {showTooltip && (
            <div className="absolute top-12 right-0 bg-blue-600 text-white text-[10px] font-black py-2.5 px-4 rounded-xl shadow-2xl whitespace-nowrap animate-bounce-subtle pointer-events-none z-[110] uppercase tracking-wider border border-white/10">
              {t.tooltip}
              <div className="absolute -top-1.5 right-3 w-3 h-3 bg-blue-600 rotate-45 border-l border-t border-white/10" />
            </div>
          )}

          <button
            onClick={onShowHelp}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-slate-500 hover:text-white transition-all hover:scale-110 p-1"
          >
            <HelpCircle size={20} />
          </button>
        </div>

        {/* BOTÓN RESET CON ICONO DE RELOAD */}
        <button 
          onClick={onReset} 
          className="group flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border border-red-500/20 active:scale-95"
        >
          <RotateCcw size={14} className="group-hover:-rotate-90 transition-transform duration-300" />
          {t.reset}
        </button>
      </div>
    </nav>
  );
};