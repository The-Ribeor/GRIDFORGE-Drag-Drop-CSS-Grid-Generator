'use client';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section className="relative pt-52 pb-32 px-6 flex flex-col items-center text-center">
      <div className="bg-[#FFD600] text-[#1A1A1A] border-2 border-[#1A1A1A] px-4 py-1 rounded-full mb-8 rotate-[-1deg] shadow-[3px_3px_0_0_#1A1A1A] flex items-center gap-2">
        <Sparkles size={14} />
        <span className="text-[9px] font-black uppercase tracking-[0.1em]">La web nace en el bolsillo</span>
      </div>

      <h1 className="text-[12vw] md:text-[8vw] font-black tracking-[-0.05em] leading-[0.85] uppercase italic mb-8">
        Diseña en móvil, <br />
        <span className="text-transparent" style={{ WebkitTextStroke: '2px #1A1A1A' }}>vuela en desktop.</span>
      </h1>

      <p className="max-w-2xl text-lg md:text-2xl font-medium text-slate-600 mb-12 leading-tight px-4">
        Forjana es la herramienta para los que preferimos maquetar rápido y sin rollos. Empiezas en pequeño y dejas que la IA haga el trabajo pesado del responsive.
      </p>

      <button onClick={() => scrollTo('que-es')} className="group relative">
        <div className="absolute inset-0 bg-[#1A1A1A] rounded-2xl translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
        <div className="relative bg-[#FFD600] border-[3px] border-[#1A1A1A] px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3">
          ¿Me explicas? <ArrowDown size={18} />
        </div>
      </button>
    </section>
  );
}