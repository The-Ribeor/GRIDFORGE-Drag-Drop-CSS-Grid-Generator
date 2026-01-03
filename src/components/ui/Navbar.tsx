import { useState, useEffect } from 'react';
import { HelpCircle, Github, Linkedin, Instagram, Languages, RotateCcw, Eraser } from 'lucide-react';
import { GridConfig, Language } from '@/lib/types';
import { translations } from '@/lib/translations';
import Image from 'next/image';

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

  // Valores por defecto para el reset de los inputs
  const defaultConfig: GridConfig = { columns: 5, rows: 5, gap: 8 };

  const handleConfigChange = (key: keyof GridConfig, value: string) => {
    let num = parseInt(value) || 0;
    // Límites para evitar que la UI se rompa o el navegador sufra
    if (num > 50 && (key === 'columns' || key === 'rows')) num = 50;
    if (num > 100 && key === 'gap') num = 100;

    setConfig({ ...config, [key]: num });
  };

  const resetInputs = () => setConfig(defaultConfig);

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

        <div className="flex items-center gap-3 shrink-0 group cursor-pointer">
          <div className="transition-transform group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="GridForge Logo"
              width={40}
              height={40}
              priority
              // 'rounded-lg' para bordes suaves o 'rounded-full' si quieres un círculo
              // 'overflow-hidden' asegura que la imagen no se salga de las esquinas redondeadas
              className="object-contain rounded-lg overflow-hidden"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-white tracking-widest text-sm uppercase italic leading-none">
              GRID FORGE
            </span>
          </div>
        </div>
        {/* BARRA DE HERRAMIENTAS DE CONFIGURACIÓN */}
        <div className="flex items-center gap-4 border-l border-slate-700 pl-8">
          <div className="flex gap-3 items-center bg-slate-900/30 p-1.5 rounded-xl border border-slate-800/50 shadow-inner">
            {(['columns', 'rows', 'gap'] as const).map(k => (
              <div key={k} className="flex flex-col items-start gap-1 px-1">
                <label className="text-[7px] font-black uppercase text-slate-500 tracking-[0.2em] leading-none ml-1">
                  {t[k]}
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={config[k]}
                  onChange={e => handleConfigChange(k, e.target.value)}
                  className="w-14 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-100 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all hover:bg-slate-700 appearance-none text-center"
                />
              </div>
            ))}

            <div className="w-[1px] h-6 bg-slate-700 mx-1" />

            <button
              onClick={resetInputs}
              className="flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-blue-400 transition-all group"
              title={t.default}
            >
              <Eraser size={12} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[7px] font-black uppercase tracking-tighter">
                {t.default}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* BOTÓN DE IDIOMA */}
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
          <button onClick={onShowHelp} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="text-slate-500 hover:text-white transition-all hover:scale-110 p-1">
            <HelpCircle size={20} />
          </button>
        </div>

        {/* BOTÓN RESET GENERAL */}
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