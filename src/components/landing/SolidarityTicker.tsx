'use client';

export default function SolidarityTicker() {
  return (
    <div className="w-full bg-[#FF4D4D] border-b-[3px] border-[#1A1A1A] py-2 overflow-hidden whitespace-nowrap z-[110] relative">
      <div className="flex animate-marquee font-black uppercase italic text-[11px] tracking-[0.2em] text-white">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="mx-12 flex items-center gap-4">
            <span className="bg-white text-[#FF4D4D] px-2 py-0.5 rounded shadow-[2px_2px_0_0_#1A1A1A]">SOS</span>
            TAILWIND EN CRISIS: EL 40% DE TU APOYO VA DIRECTO A SU EQUIPO DE DESARROLLO
            <span className="bg-white text-[#FF4D4D] px-2 py-0.5 rounded shadow-[2px_2px_0_0_#1A1A1A]">SOS</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}