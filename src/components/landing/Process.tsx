'use client';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

export default function Process() {
  return (
    <section id="que-es" className="py-24 px-6 max-w-7xl mx-auto border-t-2 border-dashed border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="p-4">
          <Smartphone className="mb-6 mx-auto md:mx-0" size={40} />
          <h3 className="text-2xl font-black uppercase italic mb-3">1. Estructura</h3>
          <p className="font-bold text-slate-500 leading-snug text-sm">Crea tu layout base pensando solo en móvil. Sin distracciones, solo el contenido que importa.</p>
        </div>
        <div className="p-4">
          <Tablet className="mb-6 mx-auto md:mx-0" size={40} />
          <h3 className="text-2xl font-black uppercase italic mb-3">2. Expansión</h3>
          <p className="font-bold text-slate-500 leading-snug text-sm">La IA analiza tu diseño y sugiere automáticamente cómo distribuir los bloques en pantallas más anchas.</p>
        </div>
        <div className="p-4 bg-[#FFD600]/10 rounded-[2rem] border-2 border-[#FFD600]">
          <Monitor className="mb-6 mx-auto md:mx-0 text-[#1A1A1A]" size={40} />
          <h3 className="text-2xl font-black uppercase italic mb-3">3. Producción</h3>
          <p className="font-bold text-[#1A1A1A] leading-snug text-sm">Obtén un código Tailwind CSS profesional y listo para tu proyecto. Lo que ves es exactamente lo que exportas.</p>
        </div>
      </div>
    </section>
  );
}