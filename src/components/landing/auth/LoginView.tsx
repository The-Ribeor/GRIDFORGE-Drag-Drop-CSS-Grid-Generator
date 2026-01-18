// 'use client';
// import { useState } from 'react';
// import { Chrome, Github, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';

// export const LoginView = ({ onRegister, onForgot }: { onRegister: () => void, onForgot: () => void }) => {
//   const [showPass, setShowPass] = useState(false);

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       {/* CABECERA COMPACTA */}
//       <div className="text-center relative">
//         <div className="absolute -top-2 -right-2 rotate-12 opacity-20 hidden md:block">
//           <Zap size={32} fill="#FFD600" className="text-[#FFD600]" />
//         </div>
//         <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
//           ¡A FORJAR!
//         </h3>
//         <p className="text-[9px] font-black text-[#1A1A1A]/50 uppercase mt-2 tracking-[0.2em]">
//           TUS HERRAMIENTAS TE ESPERAN
//         </p>
//       </div>


//       {/* SOCIAL LOGIN: COMPACTO CON LOGO DE GOOGLE ORIGINAL */}
//       <div className="flex gap-4">
//         {/* BOTÓN GOOGLE */}
//         <button className="flex-1 flex items-center justify-center py-4 border-[3px] border-[#1A1A1A] rounded-2xl bg-white hover:bg-[#FFD600]/5 transition-all shadow-[4px_4px_0_0_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none group">
//           <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>
//         </button>

//         {/* BOTÓN GITHUB */}
//         <button className="flex-1 flex items-center justify-center py-4 bg-[#1A1A1A] text-white rounded-2xl hover:bg-[#1A1A1A]/90 transition-all shadow-[4px_4px_0_0_#FFD600] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none group border-[3px] border-[#1A1A1A]">
//           <Github size={24} className="group-hover:scale-110 transition-transform" />
//         </button>
//       </div>

//       {/* DIVIDER MÁS FINO */}
//       <div className="relative py-1">
//         <div className="absolute inset-0 flex items-center"><div className="w-full border-t-[2px] border-[#1A1A1A]/10"></div></div>
//         <span className="relative flex justify-center text-[8px] font-black uppercase text-[#1A1A1A]/30 bg-white px-3 w-fit mx-auto italic">
//           o por la vieja escuela
//         </span>
//       </div>

//       {/* FORMULARIO AJUSTADO */}
//       <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
//         <div className="group">
//           <label className="text-[9px] font-black uppercase ml-2 mb-1 block text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]">Email de acceso</label>
//           <input
//             type="email"
//             placeholder="TU@EMAIL.COM"
//             className="w-full border-[3px] border-[#1A1A1A] p-4 rounded-xl font-bold text-sm focus:bg-[#FFD600]/5 outline-none transition-all placeholder:text-[#1A1A1A]/20"
//           />
//         </div>

//         <div className="group relative">
//           <label className="text-[9px] font-black uppercase ml-2 mb-1 block text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]">Tu contraseña</label>
//           <div className="relative">
//             <input
//               type={showPass ? "text" : "password"}
//               placeholder="••••••••"
//               className="w-full border-[3px] border-[#1A1A1A] p-4 rounded-xl font-bold text-sm focus:bg-[#FFD600]/5 outline-none transition-all pr-12 placeholder:text-[#1A1A1A]/20"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#1A1A1A]/30 hover:text-[#1A1A1A]"
//             >
//               {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </div>

//         <button
//           className="w-full py-5 bg-[#FFD600] border-[3px] border-[#1A1A1A] rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-[6px_6px_0_0_#1A1A1A] flex items-center justify-center gap-2 transition-all mt-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#1A1A1A] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
//         >
//           RETOMAR EL FUEGO <ArrowRight size={18} className="stroke-[3px]" />
//         </button>
//       </form>

//       {/* FOOTER MÁS DISCRETO */}
//       <div className="flex flex-col gap-4 pt-4 border-t-[2px] border-dotted border-[#1A1A1A]/20">
//         <button onClick={onRegister} className="text-[11px] font-black uppercase hover:italic transition-all text-center group">
//           ¿NUEVO? <span className="underline decoration-[#FFD600] decoration-[4px] underline-offset-2 text-[#1A1A1A] group-hover:bg-[#FFD600]">ÚNETE A FORJANA</span>
//         </button>
//         <button onClick={onForgot} className="text-[9px] font-black uppercase text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors text-center tracking-widest">
//           Olvidé mi acceso
//         </button>
//       </div>
//     </div>
//   );
// };

'use client';
import { useState } from 'react';
// 1. Importamos el hook de navegación y params
import { useRouter, useParams } from 'next/navigation'; 
import { Github, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';

export const LoginView = ({ onRegister, onForgot }: { onRegister: () => void, onForgot: () => void }) => {
  const [showPass, setShowPass] = useState(false);
  
  // 2. Inicializamos el router y obtenemos los parámetros (para el [lang])
  const router = useRouter();
  const params = useParams();

  // 3. Función para manejar el acceso
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría tu lógica de validación de Firebase/Auth en el futuro.
    // Por ahora, forjamos el camino directo al editor:
    const lang = params?.lang || 'es'; // Por si acaso no detecta el lang, default a es
    
    router.push(`/${lang}/editor`);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* CABECERA COMPACTA */}
      <div className="text-center relative">
        <div className="absolute -top-2 -right-2 rotate-12 opacity-20 hidden md:block">
          <Zap size={32} fill="#FFD600" className="text-[#FFD600]" />
        </div>
        <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
          ¡A FORJAR!
        </h3>
        <p className="text-[9px] font-black text-[#1A1A1A]/50 uppercase mt-2 tracking-[0.2em]">
          TUS HERRAMIENTAS TE ESPERAN
        </p>
      </div>

      {/* SOCIAL LOGIN */}
      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center py-4 border-[3px] border-[#1A1A1A] rounded-2xl bg-white transition-all shadow-[4px_4px_0_0_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#1A1A1A] active:translate-x-1 active:translate-y-1 active:shadow-none group">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </button>

        <button className="flex-1 flex items-center justify-center py-4 bg-[#1A1A1A] text-white rounded-2xl transition-all shadow-[4px_4px_0_0_#FFD600] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#FFD600] active:translate-x-1 active:translate-y-1 active:shadow-none group border-[3px] border-[#1A1A1A]">
          <Github size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-[2px] border-[#1A1A1A]/10"></div></div>
        <span className="relative flex justify-center text-[8px] font-black uppercase text-[#1A1A1A]/30 bg-white px-3 w-fit mx-auto italic">
          o por la vieja escuela
        </span>
      </div>

      {/* FORMULARIO: Ahora dispara handleLogin */}
      <form className="space-y-3" onSubmit={handleLogin}>
        <div className="group">
          <label className="text-[9px] font-black uppercase ml-2 mb-1 block text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]">Email de acceso</label>
          <input
            required
            type="email"
            placeholder="TU@EMAIL.COM"
            className="w-full border-[3px] border-[#1A1A1A] p-4 rounded-xl font-bold text-sm focus:bg-[#FFD600]/5 outline-none transition-all placeholder:text-[#1A1A1A]/20"
          />
        </div>

        <div className="group relative">
          <label className="text-[9px] font-black uppercase ml-2 mb-1 block text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]">Tu contraseña</label>
          <div className="relative">
            <input
              required
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

        {/* BOTÓN CON EFECTO CLICK REAL APLICADO */}
        <button
          type="submit"
          className="w-full py-5 bg-[#FFD600] border-[3px] border-[#1A1A1A] rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-[6px_6px_0_0_#1A1A1A] flex items-center justify-center gap-2 transition-all mt-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_0_#1A1A1A] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
        >
          RETOMAR EL FUEGO <ArrowRight size={18} className="stroke-[3px]" />
        </button>
      </form>

      {/* FOOTER */}
      <div className="flex flex-col gap-4 pt-4 border-t-[2px] border-dotted border-[#1A1A1A]/20">
        <button onClick={onRegister} className="text-[11px] font-black uppercase hover:italic transition-all text-center group">
          ¿NUEVO? <span className="underline decoration-[#FFD600] decoration-[4px] underline-offset-2 text-[#1A1A1A] group-hover:bg-[#FFD600]">ÚNETE A FORJANA</span>
        </button>
        <button onClick={onForgot} className="text-[9px] font-black uppercase text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors text-center tracking-widest">
          Olvidé mi acceso
        </button>
      </div>
    </div>
  );
};