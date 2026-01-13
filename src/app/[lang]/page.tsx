'use client';

import { use, useEffect, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Process from '@/components/landing/Process';
import Pricing from '@/components/landing/Pricing';
import CollaborationForm from '@/components/landing/CollaborationForm';
import Footer from '@/components/landing/Footer';
import DynamicBackground from '@/components/landing/DynamicBackground';
import { Language } from '@/lib/types';

export default function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params) as { lang: Language };
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen text-[#1A1A1A] font-sans selection:bg-[#FFD600] scroll-smooth overflow-x-hidden relative">
            
            {/* 1. FONDO DE ESFERAS Y BUSES DE DATOS */}
            <DynamicBackground />

            {/* Contenedor relativo para que el contenido flote sobre el fondo */}
            <div className="relative z-10">
                <Navbar scrolled={scrolled} scrollTo={scrollTo} lang={lang} />
                
                <main>
                    {/* Hero con entrada suave */}
                    <div className="animate-reveal">
                        <Hero scrollTo={scrollTo} />
                    </div>
                    
                    <Process />
                    
                    <Pricing />
                    
                    <CollaborationForm />
                </main>

                <Footer scrollTo={scrollTo} />
            </div>

            {/* Estilos Globales de Animación */}
            <style jsx global>{`
                /* Latido Orgánico del Corazón */
                @keyframes heartbeat {
                  0%, 100% { transform: scale(1); }
                  15% { transform: scale(1.25); }
                  30% { transform: scale(1); }
                  45% { transform: scale(1.15); }
                }
                .animate-heartbeat { 
                    animation: heartbeat 1.5s ease-in-out infinite; 
                }

                /* Entrada suave de elementos */
                @keyframes reveal {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-reveal {
                    animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                /* Movimiento de Esferas (Blobs) */
                @keyframes blob {
                  0% { transform: translate(0px, 0px) scale(1); }
                  33% { transform: translate(30px, -50px) scale(1.1); }
                  66% { transform: translate(-20px, 20px) scale(0.9); }
                  100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                  animation: blob 10s infinite alternate ease-in-out;
                }

                /* Flujo de Datos (Buses) */
                @keyframes data-flow {
                  0% { transform: translateY(-100%); opacity: 0; }
                  50% { opacity: 0.5; }
                  100% { transform: translateY(100%); opacity: 0; }
                }
                .animate-data-flow {
                  animation: data-flow 6s linear infinite;
                }

                /* Cinta Corrediza (Marquee) */
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  animation: marquee 25s linear infinite;
                }

                /* Utilidades de Navegación */
                .nav-link-item { 
                    font-weight: 900; 
                    text-transform: uppercase; 
                    letter-spacing: 0.1em; 
                    opacity: 0.6; 
                    transition: 0.2s; 
                }
                .nav-link-item:hover { 
                    opacity: 1; 
                    transform: translateY(-1px); 
                }
                .footer-link { 
                    font-size: 10px; 
                    font-weight: 900; 
                    text-transform: uppercase; 
                    text-align: left; 
                    opacity: 0.5; 
                    transition: 0.2s; 
                    width: fit-content; 
                }
                .footer-link:hover { 
                    opacity: 1; 
                    color: #FFD600; 
                }
                @media (max-width: 768px) { 
                    .footer-link { text-align: center; width: 100%; } 
                }
            `}</style>
        </div>
    );
}