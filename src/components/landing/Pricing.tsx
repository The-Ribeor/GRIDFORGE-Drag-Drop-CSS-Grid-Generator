'use client';
import { Play, Coffee, Check, AlertCircle, Zap } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="apoyo" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[#FDFCF9]/40 backdrop-blur-[2px] z-0"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-[#1A1A1A] rounded-[3.5rem] p-10 md:p-20 text-white text-center shadow-[20px_20px_0_0_#FFD600] border-[4px] border-white/10">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-4 text-[#FFD600]">¿Hacemos un trato?</h2>
          <p className="text-white/50 font-bold uppercase tracking-[0.2em] text-[10px] mb-12 italic text-balance">
            Tú decides cómo quieres que Forjana siga creciendo. Sin vueltas.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            
            {/* MODO LIBRE */}
            <div className="bg-[#262626] border-2 border-white/10 p-8 rounded-[2.5rem] flex flex-col hover:border-white/20 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <Play fill="#FFD600" className="text-[#FFD600]" size={32} />
                <span className="bg-white/5 text-white/40 text-[9px] font-black px-3 py-1 rounded-full uppercase border border-white/10 tracking-widest">Aguante</span>
              </div>
              <h4 className="text-2xl font-black uppercase italic mb-2 tracking-tight">Cero Dólares</h4>
              <p className="text-sm text-white/60 font-medium leading-relaxed mb-8 italic">
                Para cuando la cosa está apretada. Usas todo gratis a cambio de prestarnos un poco de tu atención.
              </p>
              
              <ul className="space-y-4 mb-8 mt-auto">
                <li className="flex items-start gap-3 text-[10px] font-bold uppercase text-white/40 group-hover:text-white/70 transition-colors">
                  <AlertCircle size={16} className="text-orange-500 shrink-0" /> 
                  <span>Publicidad antes de exportar cada vez</span>
                </li>
                <li className="flex items-start gap-3 text-[10px] font-bold uppercase text-white/40 group-hover:text-white/70 transition-colors">
                  <AlertCircle size={16} className="text-orange-500 shrink-0" /> 
                  <span>Pausas de anuncios cuando menos te lo esperes</span>
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/40 group-hover:text-white/70 transition-colors">
                  <Check size={16} className="text-[#FFD600]" /> IA estándar para ayudarte
                </li>
              </ul>
            </div>

            {/* SOCIO - EL CAFÉ */}
            <div className="bg-[#FFD600] text-[#1A1A1A] p-8 rounded-[2.5rem] shadow-[10px_10px_0_0_#FFF] flex flex-col relative overflow-hidden group border-2 border-[#1A1A1A]">
              <div className="absolute -right-8 -top-8 text-[#1A1A1A]/5 rotate-12 transition-transform group-hover:rotate-45">
                 <Coffee size={200} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <Coffee className="text-[#1A1A1A]" size={32} />
                  <span className="bg-[#1A1A1A] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Lo mejor</span>
                </div>
                <h4 className="text-2xl font-black uppercase italic mb-2 tracking-tight">Invitame un café ($5 USD)</h4>
                <p className="text-sm text-[#1A1A1A]/80 font-black leading-relaxed mb-8 italic">
                  Si valoras tu tiempo y tu paz mental, este es tu plan. Creación pura sin que nadie te interrumpa.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-[10px] font-black uppercase">
                    <Zap size={16} fill="currentColor" /> Cero anuncios (Es un pacto)
                  </li>
                  <li className="flex items-center gap-3 text-[10px] font-black uppercase">
                    <Zap size={16} fill="currentColor" /> Exportación al toque
                  </li>
                  <li className="flex items-center gap-3 text-[10px] font-black uppercase">
                    <Zap size={16} fill="currentColor" /> Acceso VIP a lo que vayamos sacando
                  </li>
                </ul>

                <button className="w-full py-5 bg-[#1A1A1A] text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl">
                  Quiero fluir por $5 USD
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}