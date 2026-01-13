'use client';
import { ArrowLeft, Mail, Send } from 'lucide-react';

export const ForgotView = ({ onSwitch }: { onSwitch: () => void }) => (
  <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
    <div className="text-center">
      <div className="w-16 h-16 bg-[#00E5FF] border-[3px] border-[#1A1A1A] rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-[4px_4px_0_0_#1A1A1A]">
        <Mail size={32} />
      </div>
      <h3 className="text-3xl font-black uppercase italic tracking-tighter italic">¿Te perdiste?</h3>
      <p className="text-sm font-bold text-slate-500 uppercase mt-2 px-4">No pasa nada, dinos tu email y te mandamos un salvavidas.</p>
    </div>

    <form className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Email de recuperación</label>
        <input type="email" placeholder="TU@EMAIL.COM" className="w-full border-[3px] border-[#1A1A1A] p-5 rounded-2xl font-bold text-sm focus:bg-[#00E5FF]/10 outline-none transition-all" />
      </div>
      
      <button className="w-full py-5 bg-[#00E5FF] border-[3px] border-[#1A1A1A] rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-[6px_6px_0_0_#1A1A1A] flex items-center justify-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
        ENVIAR ACCESO <Send size={20} />
      </button>
    </form>

    <div className="pt-4 border-t-2 border-dashed border-slate-100 flex justify-center">
      <button onClick={onSwitch} className="flex items-center gap-2 text-sm font-black uppercase hover:text-[#00E5FF] transition-colors italic">
        <ArrowLeft size={16} /> Volver al inicio
      </button>
    </div>
  </div>
);