'use client';
import { useState } from 'react';
import { Flame } from 'lucide-react';
import AuthModal from './auth/AuthModal';

interface NavbarProps {
  scrolled: boolean;
  scrollTo: (id: string) => void;
  lang: string;
}

export default function Navbar({ scrolled, scrollTo, lang }: NavbarProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAction = () => {
    if (isLoggedIn) {
      window.location.href = `/${lang}/editor`;
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${scrolled ? 'w-[92%] md:w-[700px]' : 'w-[95%] md:w-[90%]'}`}>

        <style jsx>{`
          @keyframes navSpark {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-15px) translateX(8px) scale(0); opacity: 0; }
          }
          .nav-spark {
            position: absolute;
            width: 3px;
            height: 3px;
            background-color: #FFF;
            border-radius: 50%;
            pointer-events: none;
          }
        `}</style>

        <div className={`flex justify-between items-center px-4 md:px-8 py-4 rounded-3xl border-[3px] border-[#1A1A1A] transition-all duration-500 ${scrolled ? 'bg-[#FFD600] shadow-[4px_4px_0_0_#1A1A1A]' : 'bg-white shadow-[8px_8px_0_0_#1A1A1A]'}`}>

          {/* LOGO DINÁMICO: TOTALMENTE ARMONIZADO (NEGRO/BLANCO) */}
          <div
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${scrolled
                ? 'bg-[#1A1A1A] p-2 px-4 rounded-xl rotate-[-2deg] shadow-[4px_4px_0_0_#FFF] hover:rotate-0'
                : ''
              }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center">
              {/* Llama blanca en modo scroll para armonizar con el texto blanco */}
              <Flame
                size={scrolled ? 20 : 22}
                className={`relative z-10 transition-colors duration-300 ${scrolled ? 'text-white' : 'text-[#1A1A1A]'}`}
                fill="currentColor"
              />

              {/* CHISPAS BLANCAS */}
              {scrolled && (
                <>
                  <span className="nav-spark -top-1 -right-1" style={{ animation: 'navSpark 0.8s infinite 0s' }}></span>
                  <span className="nav-spark top-0 right-1" style={{ animation: 'navSpark 1s infinite 0.2s' }}></span>
                </>
              )}
            </div>

            <span className={`font-black tracking-tighter uppercase italic transition-all duration-300 ${scrolled ? 'text-white text-lg' : 'text-[#1A1A1A] text-xl'}`}>
              Forjana
            </span>
          </div>

          {/* MENU CENTRAL */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo('que-es')} className="nav-link-item text-[10px] font-bold uppercase">¿Cómo va?</button>
            <button onClick={() => scrollTo('apoyo')} className="nav-link-item text-[10px] font-bold uppercase">El Trato</button>
            <button onClick={() => scrollTo('parche')} className="nav-link-item text-[10px] font-bold uppercase">Colaborar</button>
          </div>

          {/* BOTÓN DE ACCIÓN */}
          <button
            onClick={handleAction}
            className={`px-8 py-2 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border-2 border-[#1A1A1A] active:translate-y-[2px] active:shadow-none shrink-0 ${scrolled
                ? 'bg-[#1A1A1A] text-white shadow-[4px_4px_0_0_#FFF] hover:bg-white hover:text-[#1A1A1A]'
                : 'bg-[#1A1A1A] text-white shadow-[3px_3px_0_0_#FFD600] hover:bg-[#FFD600] hover:text-[#1A1A1A]'
              }`}
          >
            A Laburar
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}