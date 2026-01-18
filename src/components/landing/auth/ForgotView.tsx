'use client';
import { ArrowLeft, Send, LifeBuoy } from 'lucide-react';

export const ForgotView = ({ onSwitch }: { onSwitch: () => void }) => (
  <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
    {/* CABECERA: EL SALVAVIDAS COMPACTO */}
    <div className="text-center relative">
      <div className="w-16 h-16 bg-[#FFD600] border-[3px] border-[#1A1A1A] rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-6 shadow-[4px_4px_0_0_#1A1A1A] group">
        <LifeBuoy size={32} className="text-[#1A1A1A] animate-[spin_8s_linear_infinite]" />
      </div>
      <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
        ¿SE APAGÓ <br/> EL FUEGO?
      </h3>
      <p className="text-[9px] font-black text-[#1A1A1A]/50 uppercase mt-3 tracking-[0.1em] px-4 leading-tight">
        Danos tu email y te mandamos un link para <br/> que vuelvas a la forja.
      </p>
    </div>

    {/* FORMULARIO DE RECUPERACIÓN */}
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="group">
        <label className="text-[9px] font-black uppercase ml-2 mb-1 block text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]">
          Email donde enviamos el rescate
        </label>
        <input 
          type="email" 
          placeholder="TU@EMAIL.COM" 
          className="w-full border-[3px] border-[#1A1A1A] p-4 rounded-xl font-bold text-sm focus:bg-[#FFD600]/5 outline-none transition-all placeholder:text-[#1A1A1A]/20" 
        />
      </div>
      
      {/* BOTÓN: Efecto de presión 1.5px coordinado con la sombra de 6px */}
      <button className="w-full py-5 bg-[#1A1A1A] text-white border-[3px] border-[#1A1A1A] rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-[6px_6px_0_0_#FFD600] flex items-center justify-center gap-2 transition-all mt-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#FFD600] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none group">
        ENVIAR ACCESO <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[3px]" />
      </button>
    </form>

    {/* VOLVER AL INICIO */}
    <div className="pt-4 border-t-[2px] border-dotted border-[#1A1A1A]/20 flex justify-center">
      <button 
        onClick={onSwitch} 
        className="group flex items-center gap-2 text-[11px] font-black uppercase hover:italic transition-all italic"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform stroke-[3px]" /> 
        VOLVER AL <span className="underline decoration-[#FFD600] decoration-[4px] underline-offset-2 text-[#1A1A1A] group-hover:bg-[#FFD600]">INICIO</span>
      </button>
    </div>
  </div>
);