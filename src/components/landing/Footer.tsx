'use client';
import { Flame, Github, Heart } from 'lucide-react';

interface FooterProps {
  scrollTo: (id: string) => void;
}

export default function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="py-20 bg-[#F0EFEA] border-t-4 border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Flame size={24} fill="currentColor" />
            <span className="text-2xl font-black uppercase italic">Forjana</span>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase leading-loose">Diseño visual para mentes rápidas. Hecho por y para desarrolladores.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h5 className="font-black uppercase text-xs tracking-widest text-[#1A1A1A]">Navegación</h5>
          <button onClick={() => scrollTo('que-es')} className="footer-link">Proceso</button>
          <button onClick={() => scrollTo('apoyo')} className="footer-link">El Trato</button>
          <button onClick={() => scrollTo('parche')} className="footer-link">Colaborar</button>
        </div>

        <div className="flex flex-col gap-6 items-center md:items-start">
          <h5 className="font-black uppercase text-xs tracking-widest text-[#1A1A1A]">Comunidad</h5>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-white border-2 border-[#1A1A1A] rounded-xl hover:bg-[#FFD600] transition-all shadow-[3px_3px_0_0_#1A1A1A]"><Github size={20} /></a>
            <a href="#" className="p-3 bg-white border-2 border-[#1A1A1A] rounded-xl hover:bg-[#FFD600] transition-all shadow-[3px_3px_0_0_#1A1A1A] text-red-500"><Heart size={20} fill="currentColor" /></a>
          </div>
        </div>
      </div>

      {/* CIERRE LIMPIO Y GLOBAL */}
      <div className="mt-20 pt-8 border-t border-[#1A1A1A]/5 flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Forjana <span className="text-[#FFD600]">©</span> 2026
        </p>
        
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
          Desarrollado con ❤️ por <span className="text-[#1A1A1A] font-black">Diego Berrio</span>
        </p>
      </div>
    </footer>
  );
}