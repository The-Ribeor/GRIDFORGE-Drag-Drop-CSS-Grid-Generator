'use client';
import { useState } from 'react';
import { Github, ArrowRight, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';

export const RegisterView = ({ onSwitch }: { onSwitch: () => void }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      {/* CABECERA: COMPACTA Y DIRECTA */}
      <div className="text-center relative">
        <div className="absolute -top-2 -left-2 -rotate-12 opacity-20 hidden md:block text-[#1A1A1A]">
          <Sparkles size={32} />
        </div>
        <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
          ¡ÚNETE A <br/> FORJANA!
        </h3>
        <p className="text-[9px] font-black text-[#1A1A1A]/50 uppercase mt-2 tracking-[0.2em]">
          EMPIEZA A FORJAR TUS PROYECTOS HOY
        </p>
      </div>

      {/* SOCIAL REGISTER: CON EFECTO DE CLIC REAL */}
      <div className="flex gap-4">
        {/* BOTÓN GOOGLE */}
        <button className="flex-1 flex items-center justify-center py-4 border-[3px] border-[#1A1A1A] rounded-2xl bg-white transition-all shadow-[4px_4px_0_0_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#1A1A1A] active:translate-x-1 active:translate-y-1 active:shadow-none group">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </button>

        {/* BOTÓN GITHUB */}
        <button className="flex-1 flex items-center justify-center py-4 bg-[#1A1A1A] text-white rounded-2xl border-[3px] border-[#1A1A1A] transition-all shadow-[4px_4px_0_0_#FFD600] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#FFD600] active:translate-x-1 active:translate-y-1 active:shadow-none group">
          <Github size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

       {/* DIVIDER */}
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-[2px] border-[#1A1A1A]/10"></div></div>
        <span className="relative flex justify-center text-[8px] font-black uppercase text-[#1A1A1A]/30 bg-white px-3 w-fit mx-auto italic">
           o por la vieja escuela
        </span>
      </div>

      {/* FORMULARIO */}
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="group">
          <label className="text-[9px] font-black uppercase ml-2 mb-1 block text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]">Tu mejor email</label>
          <input 
            type="email" 
            placeholder="TU@EMAIL.COM" 
            className="w-full border-[3px] border-[#1A1A1A] p-4 rounded-xl font-bold text-sm focus:bg-[#FFD600]/5 outline-none transition-all placeholder:text-[#1A1A1A]/20" 
          />
        </div>
        
        <div className="group relative">
          <label className="text-[9px] font-black uppercase ml-2 mb-1 block text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]">Crea una contraseña</label>
          <div className="relative">
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="••••••••" 
              className="w-full border-[3px] border-[#1A1A1A] p-4 rounded-xl font-bold text-sm focus:bg-[#FFD600]/5 outline-none transition-all pr-12 placeholder:text-[#1A1A1A]/20" 
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        {/* BOTÓN PRINCIPAL: Animación de presión 1.5px coordinada con la sombra */}
        <button className="w-full py-5 bg-[#1A1A1A] text-[#FFD600] border-[3px] border-[#1A1A1A] rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-[6px_6px_0_0_#FFD600] flex items-center justify-center gap-2 transition-all mt-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#FFD600] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none">
          ENCENDER LA FORJA <ArrowRight size={18} className="stroke-[3px]" />
        </button>
      </form>

      {/* FOOTER */}
      <div className="pt-4 border-t-[2px] border-dotted border-[#1A1A1A]/20 flex justify-center">
        <button onClick={onSwitch} className="group flex items-center gap-2 text-[11px] font-black uppercase hover:italic transition-all italic">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform stroke-[3px]" /> 
          ¿YA TIENES CUENTA? <span className="underline decoration-[#FFD600] decoration-[4px] underline-offset-2 text-[#1A1A1A] group-hover:bg-[#FFD600]">ENTRAR</span>
        </button>
      </div>
    </div>
  );
};