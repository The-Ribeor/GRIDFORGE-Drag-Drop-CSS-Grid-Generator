'use client';
import { useState } from 'react';
import { Bug, Wrench, Heart, Sparkles, Hammer } from 'lucide-react';

export default function CollaborationForm() {
  const [formRole, setFormRole] = useState<'tester' | 'colab'>('tester');

  return (
    <section id="parche" className="py-16 md:py-32 px-4 md:px-6 max-w-6xl mx-auto text-center relative">
      <div className="mb-8 md:mb-12 relative">
        
        {/* ANIMACIÓN DEL MARTILLO: Escala reducida en móvil */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-10">
          <div className="absolute inset-0 bg-white border-[3px] md:border-[4px] border-[#1A1A1A] rounded-[2rem] md:rounded-[2.5rem] shadow-[6px_6px_0_0_#FFD600] flex items-center justify-center z-10 overflow-hidden">
            <Hammer 
              size={40} 
              className="text-[#1A1A1A] md:w-[54px] md:h-[54px] origin-[20%_80%] animate-hammer-hit" 
            />
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-0 flex gap-1 md:gap-2">
             <Heart size={14} fill="#FF4D4D" className="text-[#1A1A1A] animate-float-heart-1 opacity-0" />
             <Heart size={18} fill="#FFD600" className="text-[#1A1A1A] animate-float-heart-2 opacity-0" />
             <Heart size={12} fill="#FF4D4D" className="text-[#1A1A1A] animate-float-heart-3 opacity-0" />
          </div>
        </div>
        
        {/* TÍTULO RESPONSIVO: Ajustado para no romperse en móvil */}
        <h2 className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase italic mb-4 md:mb-6 tracking-tighter leading-[0.85] md:leading-[0.9]">
          <span className="block">¿CAZAS BUGS</span>
          <span className="block text-[#FFD600] drop-shadow-[2px_2px_0_#1A1A1A]" style={{ WebkitTextStroke: '1.5px #1A1A1A' }}>
            O AZOTAS CÓDIGO?
          </span>
        </h2>
        
        <p className="text-sm md:text-xl text-slate-500 font-bold italic max-w-xl mx-auto uppercase tracking-tight px-4">
          Forjana no se hizo sola. Necesitamos manos sucias y ojos afilados.
        </p>
      </div>

      {/* FORMULARIO: Padding reducido en móvil */}
      <form className="bg-white border-[3px] md:border-[4px] border-[#1A1A1A] p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[12px_12px_0_0_#1A1A1A] md:shadow-[20px_20px_0_0_#1A1A1A] max-w-4xl mx-auto">
        
        {/* SELECTOR DE ROL: Se apila en móvil (flex-col) y se pone en fila en md */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12 bg-slate-100 p-2 rounded-[1.8rem] md:rounded-[2rem]">
          <button 
            type="button" 
            onClick={() => setFormRole('tester')}
            className={`py-3 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] font-black uppercase text-[10px] md:text-[11px] transition-all flex items-center justify-center gap-3 border-[3px] border-[#1A1A1A] ${formRole === 'tester' ? 'bg-[#FFD600] shadow-[4px_4px_0_0_#1A1A1A] translate-y-[-2px]' : 'bg-white opacity-50 shadow-none hover:opacity-100'}`}
          >
            <Bug size={16} /> Cazador/a de bugs
          </button>
          <button 
            type="button" 
            onClick={() => setFormRole('colab')}
            className={`py-3 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] font-black uppercase text-[10px] md:text-[11px] transition-all flex items-center justify-center gap-3 border-[3px] border-[#1A1A1A] ${formRole === 'colab' ? 'bg-[#FFD600] shadow-[4px_4px_0_0_#1A1A1A] translate-y-[-2px]' : 'bg-white opacity-50 shadow-none hover:opacity-100'}`}
          >
            <Wrench size={16} /> AZOTAR EL CÓDIGO
          </button>
        </div>

        {/* INPUTS: Apilados en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="text-left">
            <label className="text-[9px] md:text-[10px] font-black uppercase ml-2 mb-1 block tracking-widest text-slate-400 italic">¿Tu nombre / apodo?</label>
            <input type="text" placeholder="EJ: EL JEFE" className="w-full bg-[#F9F9F9] border-[3px] border-[#1A1A1A] p-4 md:p-5 rounded-xl md:rounded-2xl font-bold outline-none focus:bg-[#FFD600]/5 transition-all text-xs md:text-sm uppercase" />
          </div>
          <div className="text-left">
            <label className="text-[9px] md:text-[10px] font-black uppercase ml-2 mb-1 block tracking-widest text-slate-400 italic">Tu Coordenada (Email)</label>
            <input type="email" placeholder="TU@EMAIL.COM" className="w-full bg-[#F9F9F9] border-[3px] border-[#1A1A1A] p-4 md:p-5 rounded-xl md:rounded-2xl font-bold outline-none focus:bg-[#FFD600]/5 transition-all text-xs md:text-sm" />
          </div>
        </div>

        <div className="text-left mb-8 md:mb-10">
          <label className="text-[9px] md:text-[10px] font-black uppercase ml-2 mb-1 block tracking-widest text-slate-400 italic">
            {formRole === 'tester' ? '¿Dónde viste que Forjana se rompe?' : '¿Qué superpoder técnico quieres inyectar?'}
          </label>
          <textarea 
            rows={3} 
            placeholder={formRole === 'tester' ? "ej: el botón de exportar..." : "ej: soy ninja de tailwind..."}
            className="w-full bg-[#F9F9F9] border-[3px] border-[#1A1A1A] p-4 md:p-5 rounded-xl md:rounded-2xl font-bold outline-none focus:bg-[#FFD600]/5 transition-all text-xs md:text-sm" 
          />
        </div>

        {/* BOTÓN FINAL CON EFECTO CLICK REAL */}
        <button className="w-full py-5 md:py-6 bg-[#1A1A1A] text-[#FFD600] rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.5em] shadow-[6px_6px_0_0_#FFD600] md:shadow-[8px_8px_0_0_#FFD600] border-[3px] md:border-[4px] border-[#1A1A1A] transition-all flex items-center justify-center gap-3 md:gap-4 group hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95">
          {formRole === 'tester' ? '¡QUIERO CAZARLOS!' : '¡HAGÁMOSLO REAL!'}
          <Sparkles className="group-hover:rotate-12 transition-transform" size={18} />
        </button>
      </form>

      <style jsx global>{`
        @keyframes hammer-hit {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-35deg); }
          30% { transform: rotate(15deg); }
          40% { transform: rotate(0deg); }
        }
        .animate-hammer-hit {
          animation: hammer-hit 1.2s ease-in-out infinite;
        }

        @keyframes heart-burst {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translate(var(--tw-translate-x), -60px) scale(1.2); opacity: 0; }
        }
        .animate-float-heart-1 { animation: heart-burst 1.2s infinite; --tw-translate-x: -30px; }
        .animate-float-heart-2 { animation: heart-burst 1.2s infinite 0.1s; --tw-translate-x: 0px; }
        .animate-float-heart-3 { animation: heart-burst 1.2s infinite 0.2s; --tw-translate-x: 30px; }
      `}</style>
    </section>
  );
}