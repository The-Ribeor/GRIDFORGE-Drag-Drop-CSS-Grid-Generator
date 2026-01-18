'use client';
import { Smartphone, Tablet, CheckCircle2 } from 'lucide-react';

export default function Process() {
  return (
    <section id="que-es" className="py-32 px-6 max-w-7xl mx-auto relative">
      {/* Etiqueta de sección estilo fanzine */}
      <div className="inline-block bg-[#1A1A1A] text-[#FFD600] px-4 py-1 mb-16 rotate-[-1deg] font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0_0_#FFD600] border border-white/10">
        ¿Cómo funciona Forjana?
      </div>

      {/* Contenedor Flex con Wrap para control total del tamaño */}
      <div className="flex flex-wrap justify-center lg:justify-between gap-10 relative z-10">
        
        {/* PASO 1 */}
        <div className="group relative p-8 bg-white border-[3px] border-[#1A1A1A] rounded-3xl hover:-translate-y-4 hover:rotate-1 transition-all duration-300 shadow-[10px_10px_0_0_#1A1A1A] w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-27px)]">
          <div className="absolute -top-5 -right-3 bg-[#1A1A1A] text-[#FFD600] w-16 h-16 flex items-center justify-center text-3xl font-black italic rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-[4px_4px_0_0_#FFD600] z-20">
            01
          </div>
          
          <div className="bg-[#1A1A1A] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 rotate-[-5deg] group-hover:rotate-0 transition-transform">
            <Smartphone className="text-white" size={28} />
          </div>
          <h3 className="text-3xl font-black uppercase italic mb-4 leading-none tracking-tighter">
            Tú <br/> <span className="text-[#FFD600] bg-[#1A1A1A] px-2 font-black">Armas</span>
          </h3>
          <p className="font-bold text-[#1A1A1A]/70 leading-tight text-base italic">
            Olvídate de las pantallas grandes por un momento. Solo enfócate en crear tu versión móvil. Es rápido, es directo y es lo que importa.
          </p>
        </div>

        {/* PASO 2 */}
        <div className="group relative p-8 bg-[#1A1A1A] border-[3px] border-[#1A1A1A] rounded-3xl lg:-translate-y-6 hover:-translate-y-10 hover:-rotate-1 transition-all duration-300 shadow-[10px_10px_0_0_#FFD600] w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-27px)]">
          <div className="absolute -top-5 -right-3 bg-[#FFD600] text-[#1A1A1A] w-16 h-16 flex items-center justify-center text-3xl font-black italic rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-[4px_4px_0_0_#FFF] z-20">
            02
          </div>

          <div className="bg-[#FFD600] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 rotate-[5deg] group-hover:rotate-0 transition-transform shadow-[4px_4px_0_0_#333]">
            <Tablet className="text-[#1A1A1A]" size={28} />
          </div>
          <h3 className="text-3xl font-black uppercase italic mb-4 leading-none tracking-tighter text-white">
            Nosotros <br/> <span className="text-[#FFD600]">Escalamos</span>
          </h3>
          <p className="font-bold text-white/80 leading-tight text-base italic">
            Forjana toma tu diseño y lo proyecta automáticamente a tablets y desktops. Reubicamos, ajustamos y resolvemos el responsive por ti.
          </p>
        </div>

        {/* PASO 3: Ahora mantiene su tamaño en tablet y se centra */}
        <div className="group relative p-8 bg-white border-[3px] border-[#1A1A1A] rounded-3xl hover:-translate-y-4 hover:rotate-1 transition-all duration-300 shadow-[10px_10px_0_0_#1A1A1A] w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-27px)]">
          <div className="absolute -top-5 -right-3 bg-[#1A1A1A] text-[#FFD600] w-16 h-16 flex items-center justify-center text-3xl font-black italic rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-[4px_4px_0_0_#FFD600] z-20">
            03
          </div>

          <div className="bg-[#1A1A1A] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 rotate-[-3deg] group-hover:rotate-0 transition-transform">
            <CheckCircle2 className="text-white" size={28} />
          </div>
          <h3 className="text-3xl font-black uppercase italic mb-4 leading-none tracking-tighter">
            Tú <br/> <span className="text-[#FFD600] bg-[#1A1A1A] px-2">Apruebas</span>
          </h3>
          <p className="font-bold text-[#1A1A1A]/70 leading-tight text-base italic">
            Revisas el resultado, das el clic final y Forjana genera todo el código Tailwind CSS listo para producción. Sin mover un dedo extra.
          </p>
        </div>

      </div>

      {/* Línea decorativa: Solo para desktop donde todo está alineado */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] border-t-[3px] border-dotted border-[#1A1A1A]/10 -z-10 hidden lg:block"></div>
    </section>
  );
}