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
  
  // Aquí luego conectaremos con tu sistema de Auth (Supabase/Auth.js)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAction = () => {
    if (isLoggedIn) {
      // Si ya está logueado, lo mandamos al editor
      window.location.href = `/${lang}/editor`;
    } else {
      // Si no, abrimos la puerta (el modal)
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${scrolled ? 'w-[92%] md:w-[700px]' : 'w-[95%] md:w-[90%]'}`}>
        <div className={`flex justify-between items-center px-4 md:px-8 py-4 rounded-3xl border-[3px] border-[#1A1A1A] transition-all ${scrolled ? 'bg-[#FFD600] shadow-[4px_4px_0_0_#1A1A1A]' : 'bg-white shadow-[8px_8px_0_0_#1A1A1A]'}`}>
          
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Flame size={22} fill="currentColor" />
            <span className="text-xl font-black tracking-tighter uppercase italic">Forjana</span>
          </div>

          {/* MENU CENTRAL */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo('que-es')} className="nav-link-item text-[10px]">¿Cómo va?</button>
            <button onClick={() => scrollTo('apoyo')} className="nav-link-item text-[10px]">El Trato</button>
            <button onClick={() => scrollTo('parche')} className="nav-link-item text-[10px]">Colaborar</button>
          </div>

          {/* ÚNICO BOTÓN DE ACCIÓN */}
          <button 
            onClick={handleAction}
            className="bg-[#1A1A1A] text-white px-8 py-2 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#1A1A1A] transition-all shadow-[3px_3px_0_0_#FFD600] border-2 border-[#1A1A1A] active:translate-y-[2px] active:shadow-none shrink-0"
          >
            {isLoggedIn ? (lang === 'es' ? 'Ir al Editor' : 'To Editor') : (lang === 'es' ? '¡Dale!' : 'Go!')}
          </button>
        </div>
      </nav>

      {/* MODAL ÚNICO */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </>
  );
}