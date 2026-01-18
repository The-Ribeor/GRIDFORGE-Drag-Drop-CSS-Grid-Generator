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
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  const handleConfigChange = (key: keyof GridConfig, value: string) => {
    let num = parseInt(value) || 0;
    if ((key === 'columns' || key === 'rows') && num > 12) num = 12;
    if (key === 'gap' && num > 100) num = 100;
    setConfig({ ...config, [key]: num });
  };

  const resetInputs = () => setConfig(defaultConfig);

  return (
    <nav className="h-16 md:h-20 border-b border-border-main bg-nav-bg backdrop-blur-md px-3 md:px-8 flex items-center justify-between sticky top-0 z-[100] transition-all">
      
      {/* SECCIÓN IZQUIERDA: LOGO + CONFIG */}
      <div className="flex items-center gap-2 md:gap-10 overflow-hidden">
        
        {/* LOGO: Más pequeño en móvil */}
        <div className="flex items-center gap-2 shrink-0 group cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="md:w-[36px] md:h-[36px] object-contain"
          />
          <div className="hidden sm:flex flex-col border-l border-border-main/50 pl-2">
            <span className="font-black text-text-title tracking-widest text-[10px] md:text-[12px] italic leading-none">GRID</span>
            <span className="font-black text-text-title tracking-widest text-[10px] md:text-[12px] italic">FORGE</span>
          </div>
        </div>

        {/* CONFIGURACIÓN: Scroll horizontal en pantallas muy pequeñas */}
        <div className="flex items-center gap-2 md:gap-4 border-l border-border-main pl-2 md:pl-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5 md:gap-3 items-center bg-card-bg/50 p-1 md:p-1.5 rounded-xl border border-border-main shadow-inner shrink-0">
            {(['columns', 'rows', 'gap'] as const).map(k => (
              <div key={k} className="flex flex-col items-center md:items-start gap-0.5 md:gap-1 px-0.5">
                {/* Ocultamos label en móvil para ganar altura/espacio */}
                <label className="hidden md:block text-[7px] font-black uppercase text-slate-500 tracking-[0.2em] leading-none ml-1">
                  {t[k]}
                </label>
                <input
                  type="number"
                  value={config[k]}
                  onChange={e => handleConfigChange(k, e.target.value)}
                  className="w-9 md:w-14 bg-app-bg border border-border-main rounded-lg py-1 text-[10px] md:text-[11px] font-bold text-text-title text-center focus:ring-1 focus:ring-blue-500/50 outline-none hover:bg-card-bg transition-all"
                  placeholder={k.charAt(0).toUpperCase()}
                />
              </div>
            ))}

            <button
              onClick={resetInputs}
              className="p-1.5 md:px-3 md:py-1 rounded-lg hover:bg-app-bg text-slate-500 hover:text-blue-400 transition-all"
              title={t.default}
            >
              <Eraser size={14} className="md:w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN DERECHA: ACCIONES */}
      <div className="flex items-center gap-1.5 md:gap-4 ml-2">
        
        {/* TEMA E IDIOMA: Agrupados para ahorrar espacio */}
        <div className="flex items-center gap-1 md:gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg md:rounded-xl bg-card-bg border border-border-main text-text-body hover:text-blue-500 transition-all h-8 w-8 md:h-10 md:w-10 flex items-center justify-center"
          >
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="block dark:hidden" />
          </button>

          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg md:rounded-full bg-card-bg border border-border-main hover:bg-app-bg transition-all"
          >
            <Languages size={14} className="text-blue-400" />
            <span className="text-[9px] md:text-[10px] font-black uppercase">{lang}</span>
          </button>
        </div>

        {/* AYUDA: Tooltip ajustado para móvil */}
        <button onClick={onShowHelp} className="text-text-body hover:text-text-title p-1 shrink-0">
          <HelpCircle size={18} />
        </button>

        {/* RESET: Icono solo en móvil, texto en desktop */}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[10px] font-black uppercase transition-all border border-red-500/20 active:scale-90"
        >
          <RotateCcw size={16} className="shrink-0" />
          <span className="hidden lg:inline tracking-widest">{t.reset}</span>
        </button>
      </div>
    </nav>
  );
};