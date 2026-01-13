'use client';
import { useState } from 'react';
import { Chrome, Github, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const LoginView = ({ onRegister, onForgot }: { onRegister: () => void, onForgot: () => void }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center">
        <h3 className="text-4xl font-black uppercase italic tracking-tighter">¡Hola!</h3>
        <p className="text-sm font-bold text-slate-500 uppercase mt-2">Entra a forjar tus ideas</p>
      </div>

      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 py-4 border-[3px] border-[#1A1A1A] rounded-2xl font-black text-xs uppercase hover:bg-slate-50 transition-all shadow-[5px_5px_0_0_#1A1A1A] active:translate-y-[2px] active:shadow-none">
          <Chrome size={20} /> Entrar con Google
        </button>
        <button className="flex items-center justify-center gap-3 py-4 bg-[#1A1A1A] text-white rounded-2xl font-black text-xs uppercase hover:bg-zinc-800 transition-all shadow-[5px_5px_0_0_#FFD600] active:translate-y-[2px] active:shadow-none">
          <Github size={20} /> Entrar con Github
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-[#1A1A1A]/10"></div></div>
        <span className="relative flex justify-center text-xs font-black uppercase text-slate-400 bg-white px-4 w-fit mx-auto">o email</span>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" 
          placeholder="TU@EMAIL.COM" 
          className="w-full border-[3px] border-[#1A1A1A] p-5 rounded-2xl font-bold text-sm focus:bg-[#FFD600]/10 outline-none transition-all" 
        />
        
        <div className="relative">
          <input 
            type={showPass ? "text" : "password"} 
            placeholder="CONTRASEÑA" 
            className="w-full border-[3px] border-[#1A1A1A] p-5 rounded-2xl font-bold text-sm focus:bg-[#FFD600]/10 outline-none transition-all pr-14" 
          />
          <button 
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#1A1A1A] transition-colors"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <button className="w-full py-5 bg-[#FFD600] border-[3px] border-[#1A1A1A] rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-[6px_6px_0_0_#1A1A1A] flex items-center justify-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          ENTRAR <ArrowRight size={20} />
        </button>
      </form>

      <div className="flex flex-col gap-4 pt-4 border-t-2 border-dashed border-slate-100">
        <button onClick={onRegister} className="text-sm font-black uppercase hover:text-[#FFD600] transition-colors text-center italic">
          ¿No tienes cuenta? <span className="underline decoration-[#FFD600] decoration-4 text-[#1A1A1A]">Regístrate</span>
        </button>
        <button onClick={onForgot} className="text-[11px] font-bold uppercase text-slate-400 hover:text-[#1A1A1A] transition-colors text-center">
          Olvidé mi contraseña
        </button>
      </div>
    </div>
  );
};