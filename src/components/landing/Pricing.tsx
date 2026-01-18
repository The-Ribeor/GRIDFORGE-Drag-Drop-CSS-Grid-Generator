'use client';
import { Check, AlertCircle, Zap, Code2, MonitorPlay, Crown } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="apoyo" className="py-12 md:py-24 px-4 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[#FDFCF9]/5 opacity-50 z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-[#1A1A1A] rounded-[2.5rem] md:rounded-[5rem] p-6 sm:p-10 md:p-20 text-white text-center shadow-[15px_15px_0_0_#FFD600] md:shadow-[30px_30px_0_0_#FFD600] border-[4px] md:border-[6px] border-[#1A1A1A] relative overflow-hidden">

          {/* DECORACIÓN DE FONDO - Oculta en móvil para no estorbar el texto */}
          <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 pointer-events-none hidden sm:block">
            <Zap size={300} fill="#FFD600" />
          </div>

          {/* TITULAR RESPONSIVO: Clamp evita que crezca o encoja demasiado */}
          <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[6.5vw] font-black uppercase italic mb-6 text-[#FFD600] tracking-tighter leading-none break-words sm:whitespace-nowrap">
            ¿CÓMO LO QUIERES?
          </h2>

          <p className="max-w-2xl mx-auto text-white font-bold uppercase tracking-[0.15em] md:tracking-[0.25em] text-[10px] md:text-[12px] mb-12 md:mb-16 italic opacity-70 leading-relaxed px-4">
            La forja no se mantiene sola, master. <br className="hidden sm:block" /> Elige tu bando para mantener este fuego encendido.
          </p>

          {/* Grid: 1 col móvil, 2 cols desde tablet (md) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 text-left max-w-5xl mx-auto">

            {/* OPCIÓN 1: EL AGUANTE */}
            <div className="bg-[#262626] border-[3px] border-white/5 p-6 lg:p-10 rounded-[2.5rem] flex flex-col group hover:border-[#FFD600]/30 transition-all duration-500">
              <div className="mb-4 lg:mb-8">
                <div className="flex items-center gap-2 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10 mb-4">
                  <MonitorPlay size={12} className="text-white/40" />
                  <span className="text-white/40 text-[8px] lg:text-[9px] font-black uppercase tracking-widest italic">Modo Paciencia</span>
                </div>
                {/* Ajuste de texto en tablet (text-2xl) vs desktop (text-4xl) */}
                <h4 className="text-2xl lg:text-4xl font-black italic text-white group-hover:text-[#FFD600] transition-colors leading-none">EL AGUANTE</h4>
                <div className="text-xl lg:text-2xl font-black text-white/20 italic mt-1">GRATIS</div>
              </div>

              <p className="text-xs lg:text-sm text-white/50 font-bold leading-tight mb-6 lg:mb-10 italic">
                Mantienes la billetera cerrada, pero pagas con tiempo. Antes de cada exportación, te toca ver un video.
              </p>

              <ul className="space-y-3 lg:space-y-5 mb-8 lg:mb-10 mt-auto">
                <li className="flex items-center gap-3 text-[9px] lg:text-[10px] font-black uppercase text-white/30 italic group-hover:text-white/60 transition-colors">
                  <MonitorPlay size={16} className="text-orange-500 shrink-0" /> Videos obligatorios
                </li>
                <li className="flex items-center gap-3 text-[9px] lg:text-[10px] font-black uppercase text-white/30 italic">
                  <AlertCircle size={16} className="text-orange-500 shrink-0" /> Pausas aleatorias
                </li>
                <li className="flex items-center gap-3 text-[9px] lg:text-[10px] font-black uppercase text-white/60">
                  <Check size={16} className="text-[#FFD600]" /> Exportación estándar
                </li>
              </ul>

              <button className="w-full py-4 bg-transparent border-2 border-white/10 rounded-2xl font-black uppercase text-[9px] lg:text-[10px] text-white/40 tracking-widest hover:bg-white/5 transition-all active:scale-95">
                Seguir con anuncios
              </button>
            </div>

            {/* OPCIÓN 2: EL PACTO */}
            <div className="bg-[#FFD600] text-[#1A1A1A] p-6 lg:p-10 rounded-[2.5rem] shadow-[10px_10px_0_0_#FFF] lg:shadow-[20px_20px_0_0_#FFF] flex flex-col relative overflow-hidden group border-[4px] border-[#1A1A1A] transition-transform hover:-translate-y-2 duration-500">
              <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-white/30 animate-pulse"></div>

              <div className="mb-4 lg:mb-8">
                <div className="flex items-center gap-2 bg-[#1A1A1A] w-fit px-3 py-1 rounded-full mb-4">
                  <Crown size={12} className="text-[#FFD600]" />
                  <span className="text-white text-[8px] lg:text-[9px] font-black uppercase tracking-widest italic">Pura Velocidad</span>
                </div>
                {/* Texto adaptativo para que no rompa en tablet */}
                <h4 className="text-2xl lg:text-4xl font-black italic text-[#1A1A1A] leading-none uppercase">EL PACTO</h4>
                <div className="text-3xl lg:text-5xl font-black italic mt-1 leading-none tracking-tighter">5 DÓLARES</div>
              </div>

              <p className="text-xs lg:text-base text-[#1A1A1A] font-black leading-tight mb-6 lg:mb-10 italic">
                Sin anuncios. Sin esperas. Solo tú y el código fluyendo directo a tu proyecto.
              </p>

              <ul className="space-y-3 lg:space-y-5 mb-8 lg:mb-10">
                <li className="flex items-center gap-3 text-[10px] lg:text-[11px] font-black uppercase">
                  <Zap size={18} fill="currentColor" className="animate-pulse" /> Sin anuncios
                </li>
                <li className="flex items-center gap-3 text-[10px] lg:text-[11px] font-black uppercase">
                  <Code2 size={18} className="stroke-[3px]" /> Descarga instantánea
                </li>
                <li className="flex items-center gap-3 text-[10px] lg:text-[11px] font-black uppercase">
                  <Crown size={18} fill="currentColor" /> Soporte Real
                </li>
              </ul>

              <button className="w-full py-5 lg:py-6 bg-[#1A1A1A] text-white rounded-2xl font-black uppercase text-[12px] lg:text-[14px] tracking-[0.15em] lg:tracking-[0.2em] shadow-[6px_6px_0_0_#FFF] lg:shadow-[10px_10px_0_0_#FFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2">
                COMPRAR PAZ <Zap size={18} fill="#FFD600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}