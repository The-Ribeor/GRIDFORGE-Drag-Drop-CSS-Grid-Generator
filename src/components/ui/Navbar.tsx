'use client';

import { useState, useEffect } from 'react';
import { HelpCircle, Languages, RotateCcw, Eraser, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
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
  onShowExport: () => void; 
}

export const Navbar = ({ 
  config, 
  setConfig, 
  onShowHelp, 
  onReset, 
  lang, 
  onToggleLang,
  onShowExport 
}: NavbarProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = translations[lang].nav;

  const defaultConfig: GridConfig = { columns: 5, rows: 5, gap: 8 };

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 1000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
    return () => { 
      clearTimeout(timer); 
      clearTimeout(hideTimer); 
    };
  }, []);

  const handleConfigChange = (key: keyof GridConfig, value: string) => {
    let num = parseInt(value) || 0;
    if (num > 50 && (key === 'columns' || key === 'rows')) num = 50;
    if (num > 100 && key === 'gap') num = 100;
    setConfig({ ...config, [key]: num });
  };

  const resetInputs = () => setConfig(defaultConfig);

  return (
    <nav className="h-20 md:h-16 border-b border-border-main bg-nav-bg backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-[100] transition-all">
      <div className="flex items-center gap-3 md:gap-10">

        {/* LOGO */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0 group cursor-pointer">
          <div className="transition-transform group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="GridForge Logo"
              width={32}
              height={32}
              priority
              className="object-contain rounded-lg overflow-hidden md:w-[40px] md:h-[40px]"
            />
          </div>
          <div className="flex flex-col justify-center border-l border-border-main/50 pl-2 md:pl-3">
            <span className="font-black text-text-title tracking-[0.15em] text-[11px] md:text-[13px] uppercase italic leading-[0.9]">
              GRID
            </span>
            <span className="font-black text-text-title tracking-[0.15em] text-[11px] md:text-[13px] uppercase italic ">
              FORGE
            </span>
          </div>
        </div>

        {/* CONFIGURACIÓN */}
        <div className="flex items-center gap-2 md:gap-4 border-l border-border-main pl-3 md:pl-8">
          <div className="flex gap-1 md:gap-3 items-center bg-card-bg/50 p-1 md:p-1.5 rounded-xl border border-border-main shadow-inner">
            {(['columns', 'rows', 'gap'] as const).map(k => (
              <div key={k} className="flex flex-col items-start gap-1 px-0.5 md:px-1">
                <label className="text-[6px] md:text-[7px] font-black uppercase text-slate-500 tracking-[0.2em] leading-none ml-1">
                  {t[k]}
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={config[k]}
                  onChange={e => handleConfigChange(k, e.target.value)}
                  className="w-10 md:w-14 bg-app-bg border border-border-main rounded-lg px-1 md:px-2 py-1 text-[10px] md:text-[11px] font-bold text-text-title focus:ring-1 focus:ring-blue-500/50 focus:outline-none transition-all hover:bg-card-bg appearance-none text-center"
                />
              </div>
            ))}

            <div className="w-[1px] h-6 bg-border-main mx-1 hidden sm:block" />

            <button
              onClick={resetInputs}
              className="flex flex-col items-center justify-center gap-1 px-2 md:px-3 py-1 rounded-lg hover:bg-app-bg text-slate-500 hover:text-blue-400 transition-all group"
              title={t.default}
            >
              <Eraser size={12} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[6px] md:text-[7px] font-black uppercase tracking-tighter hidden sm:block">
                {t.default}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        
        {/* BOTÓN DE TEMA */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl bg-card-bg border border-border-main text-text-body hover:text-blue-500 hover:border-blue-500/50 transition-all active:scale-90 h-9 w-9 flex items-center justify-center"
          aria-label="Toggle Theme"
        >
          <Sun size={18} className="hidden dark:block" />
          <Moon size={18} className="block dark:hidden" />
        </button>

        {/* IDIOMA */}
        <button
          onClick={onToggleLang}
          className="group flex items-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-1.5 rounded-full bg-card-bg border border-border-main hover:border-blue-500/50 hover:bg-app-bg transition-all"
        >
          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
            <Languages size={9} className="text-blue-400 group-hover:text-white" />
          </div>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-body group-hover:text-text-title transition-colors">
            {lang}
          </span>
        </button>

        {/* AYUDA */}
        <div className="relative flex items-center justify-center">
          {showTooltip && (
            <div className="absolute top-12 right-0 bg-blue-600 text-white text-[10px] font-black py-2.5 px-4 rounded-xl shadow-2xl whitespace-nowrap animate-bounce-subtle pointer-events-none z-[110] uppercase tracking-wider border border-white/10">
              {t.tooltip}
              <div className="absolute -top-1.5 right-3 w-3 h-3 bg-blue-600 rotate-45 border-l border-t border-white/10" />
            </div>
          )}
          <button onClick={onShowHelp} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="text-text-body hover:text-text-title transition-all hover:scale-110 p-1">
            <HelpCircle size={18} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* RESET */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-2.5 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] transition-all border border-red-500/20 active:scale-95"
        >
          <RotateCcw size={14} className="group-hover:-rotate-90 transition-transform duration-300" />
          <span className="hidden lg:inline">{t.reset}</span>
        </button>
      </div>
    </nav>
  );
};