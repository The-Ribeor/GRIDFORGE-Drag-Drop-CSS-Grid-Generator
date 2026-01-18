'use client';
import { Terminal, ArrowDown, Zap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section className="relative pt-52 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
      
      {/* BADGE: Enfoque en el resultado final */}
      <div className="bg-[#FFD600] text-[#1A1A1A] border-2 border-[#1A1A1A] px-4 py-1 rounded-full mb-8 rotate-[-1deg] shadow-[3px_3px_0_0_#1A1A1A] flex items-center gap-2 group hover:rotate-0 transition-transform cursor-default">
        <Terminal size={14} className="stroke-[3px]" />
        <span className="text-[9px] font-black uppercase tracking-[0.1em]">DISEÑA EN MÓVIL, ESCALA AL MUNDO</span>
      </div>

      {/* TITULAR: Reforzando el beneficio del Mobile-First automático */}
      <h1 className="text-[12vw] md:text-[8vw] font-black tracking-[-0.05em] leading-[0.85] uppercase italic mb-8">
        MÓVIL PRIMERO, <br />
        <span className="text-transparent" style={{ WebkitTextStroke: '2px #1A1A1A' }}>DESKTOP DE REGALO.</span>
      </h1>

      {/* DESCRIPCIÓN: Conexión directa con los pasos 01, 02 y 03 del proceso */}
      <div className="max-w-4xl mx-auto">
        <p className="text-lg md:text-2xl font-black text-[#1A1A1A]/60 mb-12 leading-tight px-4 italic">
          ¿Diseñar tres veces lo mismo? <span className="text-[#1A1A1A]">Qué pérdida de tiempo.</span> Forjana toma tu versión móvil y la expande inteligentemente a todas las pantallas. Enfócate en la idea y deja que nosotros resolvamos el <span className="text-[#1A1A1A] underline decoration-[#FFD600] decoration-4">insoportable rompecabezas del responsive.</span>
        </p>
      </div>

      {/* BLOQUE DE ACCIÓN */}
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={() => scrollTo('que-es')} 
          className="group relative transform hover:scale-105 transition-all active:scale-95"
        >
          <div className="absolute inset-0 bg-[#1A1A1A] rounded-2xl translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
          <div className="relative bg-[#FFD600] border-[3px] border-[#1A1A1A] px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3">
           ¡VER LA MAGIA! <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </div>
        </button>

        {/* Micro-label de confianza */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#1A1A1A]/30 tracking-widest mt-2">
          <ShieldCheck size={12} /> RESPONSIVE REAL SIN ESFUERZO
        </div>
      </div>

      {/* DETALLE: Rayo decorativo */}
      <div className="absolute -bottom-10 right-10 opacity-5 pointer-events-none select-none">
        <Zap size={200} fill="currentColor" />
      </div>

      {/* Decoración lateral */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-24 h-[2px] bg-[#1A1A1A]/5 hidden lg:block"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-24 h-[2px] bg-[#1A1A1A]/5 hidden lg:block"></div>
    </section>
  );
}