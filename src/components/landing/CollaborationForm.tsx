'use client';
import { useState } from 'react';
import { Heart, Users, Code2 } from 'lucide-react';

export default function CollaborationForm() {
  const [formRole, setFormRole] = useState<'tester' | 'colab'>('tester');

  return (
    <section id="parche" className="py-32 px-6 max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="w-20 h-20 bg-white border-4 border-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[4px_4px_0_0_#FFD600]">
          <Heart size={35} fill="#FFD600" className="text-[#1A1A1A] animate-heartbeat" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-4">¿Quieres mejorar Forjana?</h2>
        <p className="text-lg text-slate-500 font-medium italic">No buscamos solo correos, buscamos equipo. Elige cómo quieres parchar con nosotros.</p>
      </div>

      <form className="bg-white border-[3px] border-[#1A1A1A] p-8 md:p-12 rounded-[3rem] shadow-[15px_15px_0_0_#FFD600]">
        <div className="flex bg-slate-100 p-2 rounded-2xl mb-10 gap-2">
          <button 
            type="button" 
            onClick={() => setFormRole('tester')}
            className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 ${formRole === 'tester' ? 'bg-white border-2 border-[#1A1A1A] shadow-[3px_3px_0_0_#1A1A1A]' : 'opacity-50'}`}
          >
            <Users size={16} /> Ser Tester
          </button>
          <button 
            type="button" 
            onClick={() => setFormRole('colab')}
            className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 ${formRole === 'colab' ? 'bg-white border-2 border-[#1A1A1A] shadow-[3px_3px_0_0_#1A1A1A]' : 'opacity-50'}`}
          >
            <Code2 size={16} /> Colaborar (Dev/Ideas)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-left">
            <label className="text-[10px] font-black uppercase ml-2 mb-2 block tracking-wider">Tu nombre</label>
            <input type="text" placeholder="Ej: Diego" className="w-full bg-slate-50 border-2 border-[#1A1A1A] p-4 rounded-xl font-bold outline-none focus:bg-[#FFD600]/10 transition-all" />
          </div>
          <div className="text-left">
            <label className="text-[10px] font-black uppercase ml-2 mb-2 block tracking-wider">Email</label>
            <input type="email" placeholder="hola@parche.com" className="w-full bg-slate-50 border-2 border-[#1A1A1A] p-4 rounded-xl font-bold outline-none focus:bg-[#FFD600]/10 transition-all" />
          </div>
        </div>

        <div className="text-left mb-8">
          <label className="text-[10px] font-black uppercase ml-2 mb-2 block tracking-wider">
            {formRole === 'tester' ? '¿Qué es lo que más te quita tiempo al maquetar?' : '¿Qué superpoder técnico quieres traer al equipo?'}
          </label>
          <textarea 
            rows={3} 
            placeholder={formRole === 'tester' ? "Ej: El responsive me vuelve loco..." : "Ej: Soy un crack con React o tengo ideas de UX..."}
            className="w-full bg-slate-50 border-2 border-[#1A1A1A] p-4 rounded-xl font-bold outline-none focus:bg-[#FFD600]/10 transition-all" 
          />
        </div>
        <button className="w-full py-5 bg-[#1A1A1A] text-white border-4 border-[#1A1A1A] rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-[#FFD600] hover:text-[#1A1A1A] transition-all shadow-[6px_6px_0_0_#1A1A1A]">
          {formRole === 'tester' ? 'Quiero probar la beta' : '¡Me uno al equipo!'}
        </button>
      </form>
    </section>
  );
}