'use client';
import { useState, useMemo } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { RegisterView } from './RegisterView';
import { ForgotView } from './ForgotView';
import { LoginView } from './LoginView';


export type AuthView = 'login' | 'register' | 'forgot';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [view, setView] = useState<AuthView>('login');

  // Optimizamos el renderizado para que no sea lento
  const ActiveView = useMemo(() => {
    switch (view) {
      case 'register': return <RegisterView onSwitch={() => setView('login')} />;
      case 'forgot': return <ForgotView onSwitch={() => setView('login')} />;
      default: return <LoginView onRegister={() => setView('register')} onForgot={() => setView('forgot')} />;
    }
  }, [view]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-[450px] bg-white border-[4px] border-[#1A1A1A] rounded-[3rem] shadow-[20px_20px_0_0_#FFD600] animate-in fade-in zoom-in duration-200">
        
        {/* Header con botón cerrar */}
        <div className="flex justify-end p-6 absolute w-full z-10">
          <button onClick={onClose} className="p-2 bg-[#F0EFEA] border-2 border-[#1A1A1A] rounded-full hover:bg-[#FFD600] transition-all shadow-[3px_3px_0_0_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 md:p-12">
          {ActiveView}
        </div>
      </div>
    </div>
  );
}