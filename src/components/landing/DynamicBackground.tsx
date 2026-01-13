'use client';

export default function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#FDFCF9]">
      
      {/* 1. ESFERAS ORGÁNICAS (Blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FFD600] rounded-full blur-[120px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-[5%] right-[-5%] w-[50%] h-[50%] bg-[#00F0FF] rounded-full blur-[140px] opacity-20 animate-blob animation-delay-4000"></div>

      {/* 2. TEXTURA DE RUIDO (Grano) */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* 3. CARRILES DE DATOS (Visibles siempre, muy sutiles) */}
      <div className="absolute inset-0 flex justify-around px-10 opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-[#1A1A1A]"></div>
        ))}
      </div>

      {/* 4. BUSES DE DATOS (Los pulsos que bajan aunque no hagas scroll) */}
      <div className="absolute inset-0 flex justify-around px-10">
        {/* Bus 1: Rápido y Amarillo */}
        <div className="relative w-[2px] h-full">
          <div className="absolute top-[-20%] left-0 w-full h-[15%] bg-gradient-to-b from-transparent via-[#FFD600] to-transparent animate-data-pulse shadow-[0_0_15px_#FFD600]"></div>
        </div>

        {/* Bus 2: Lento y Cian */}
        <div className="relative w-[2px] h-full">
          <div className="absolute top-[-20%] left-0 w-full h-[25%] bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent animate-data-pulse animation-delay-3000 duration-[12s] shadow-[0_0_15px_#00F0FF]"></div>
        </div>

        {/* Bus 3: Medio y Negro */}
        <div className="relative w-[2px] h-full hidden md:block">
          <div className="absolute top-[-20%] left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-[#1A1A1A] to-transparent animate-data-pulse animation-delay-7000 duration-[9s]"></div>
        </div>

        {/* Bus 4: Rápido y Amarillo */}
        <div className="relative w-[2px] h-full">
          <div className="absolute top-[-20%] left-0 w-full h-[10%] bg-gradient-to-b from-transparent via-[#FFD600] to-transparent animate-data-pulse animation-delay-2000 duration-[6s] shadow-[0_0_10px_#FFD600]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes data-pulse {
          0% { top: -25%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }

        .animate-data-pulse {
          position: absolute;
          animation: data-pulse 7s linear infinite;
        }

        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-7000 { animation-delay: 7s; }
        
        .duration-[12s] { animation-duration: 12s; }
        .duration-[9s] { animation-duration: 9s; }
        .duration-[6s] { animation-duration: 6s; }
      `}</style>
    </div>
  );
}