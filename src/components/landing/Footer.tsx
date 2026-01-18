'use client';
import {
    Flame, Github, Instagram, Facebook, Music,
    Coffee, Zap, Youtube, Podcast
} from 'lucide-react';

interface FooterProps {
    scrollTo: (id: string) => void;
}

export default function Footer({ scrollTo }: FooterProps) {
    return (
        <footer className="py-24 bg-[#1A1A1A] text-white border-t-[8px] border-[#FFD600] relative overflow-hidden">
            <style jsx>{`
        @keyframes spark {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-20px) translateX(10px) scale(0); opacity: 0; }
        }
        .spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #1A1A1A;
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

            <div className="absolute top-10 -right-20 rotate-12 opacity-5 select-none pointer-events-none">
                <span className="text-[12rem] font-black italic uppercase leading-none text-white">FORJA</span>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">

                {/* COL 1: MARCA Y MANIFIESTO */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="relative flex items-center gap-3 mb-6 bg-[#FFD600] p-3 rounded-2xl rotate-[-2deg] shadow-[6px_6px_0_0_#FFF] group hover:rotate-0 transition-transform">
                        <div className="relative flex items-center justify-center">
                            <Flame size={28} className="text-[#1A1A1A] relative z-10" fill="currentColor" />
                            <span className="spark top-0 right-0" style={{ animation: 'spark 1s infinite 0s' }}></span>
                            <span className="spark top-1 right-2" style={{ animation: 'spark 1.2s infinite 0.2s' }}></span>
                            <span className="spark top-2 right-1" style={{ animation: 'spark 0.8s infinite 0.5s' }}></span>
                        </div>
                        <span className="text-3xl font-black uppercase italic text-[#1A1A1A] tracking-tighter">Forjana</span>
                    </div>

                    <div className="text-[13px] uppercase leading-relaxed tracking-wide max-w-[300px] italic mb-6 text-center md:text-left">
                        <p className="mb-4">
                            <span className="text-white font-black text-base block mb-1 tracking-tighter">¿BIENVENIDO AL BACKSTAGE?</span>
                            <span className="text-white/50 font-bold">Forjana ocurre gracias a </span>
                            <span className="text-[#FFD600] font-black underline decoration-2 italic">gente como tú.</span>
                        </p>
                        <p className="text-white/80 font-black tracking-tighter mb-6">
                            Ven a romperlo todo y a forjar algo nuevo.
                        </p>
                        <a href="#" className="inline-flex items-center gap-2 bg-[#FFD600] text-[#1A1A1A] px-5 py-3 rounded-xl font-black text-[10px] shadow-[4px_4px_0_0_#FFF] hover:translate-y-1 hover:shadow-none transition-all uppercase active:scale-95">
                            <Coffee size={14} /> Inyectar 5 dólares al fuego
                        </a>
                    </div>
                </div>

                {/* COL 2: MAPA */}
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <h5 className="font-black uppercase text-[10px] tracking-[0.4em] text-[#FFD600] mb-4 opacity-40 italic">Mapa de la forja</h5>
                    <button onClick={() => scrollTo('que-es')} className="text-xl font-black uppercase italic hover:text-[#FFD600] hover:translate-x-2 transition-all inline-flex items-center justify-center md:justify-start gap-3 group">
                        <Zap size={18} className="text-[#FFD600] group-hover:animate-pulse" /> La Receta
                    </button>
                    <button onClick={() => scrollTo('apoyo')} className="text-xl font-black uppercase italic hover:text-[#FFD600] hover:translate-x-2 transition-all inline-flex items-center justify-center md:justify-start gap-3 group">
                        <Zap size={18} className="text-[#FFD600] group-hover:animate-pulse" /> Tu Parte
                    </button>
                    <button onClick={() => scrollTo('parche')} className="text-xl font-black uppercase italic hover:text-[#FFD600] hover:translate-x-2 transition-all inline-flex items-center justify-center md:justify-start gap-3 group">
                        <Zap size={18} className="text-[#FFD600] group-hover:animate-pulse" /> El Parche
                    </button>
                </div>

                {/* COL 3: SOCIAL & TRANSMISIÓN */}
                <div className="flex flex-col gap-8 items-center md:items-start">
                    <div>
                        <h5 className="font-black uppercase text-[10px] tracking-[0.4em] text-[#FFD600] mb-4 opacity-40 italic text-center md:text-left">Dale amor a Forjana</h5>
                        <div className="grid grid-cols-5 gap-3 w-fit">
                            {/* Github */}
                            <a href="#" className="p-3 bg-[#262626] border-2 border-white/10 rounded-xl hover:bg-white hover:text-[#1A1A1A] transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1 flex items-center justify-center">
                                <Github size={20} />
                            </a>
                            {/* Instagram */}
                            <a href="#" className="p-3 bg-[#262626] border-2 border-white/10 rounded-xl hover:bg-[#E1306C] text-white transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1 flex items-center justify-center">
                                <Instagram size={20} />
                            </a>
                            {/* Tiktok */}
                            <a href="#" className="p-3 bg-[#262626] border-2 border-white/10 rounded-xl hover:bg-black hover:border-[#ff0050] text-white transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                            </a>
                            {/* Facebook */}
                            <a href="#" className="p-3 bg-[#262626] border-2 border-white/10 rounded-xl hover:bg-[#1877F2] text-white transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1 flex items-center justify-center">
                                <Facebook size={20} />
                            </a>
                            {/* X */}
                            <a href="#" className="p-3 bg-[#262626] border-2 border-white/10 rounded-xl hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                            </a>
                            
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <h5 className="font-black uppercase text-[10px] tracking-[0.4em] text-[#FFD600] opacity-40 italic text-center md:text-left">Sube el volumen</h5>

                        {/* Spotify Card con Logo Original */}
                        <a href="#" className="flex items-center gap-3 bg-[#1DB954]/10 border-2 border-[#1DB954]/30 p-3 rounded-2xl group hover:bg-[#1DB954] transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954] group-hover:text-white animate-pulse">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.492 17.31c-.217.356-.677.468-1.033.25-2.85-1.742-6.436-2.136-10.658-1.173-.408.093-.816-.164-.91-.572-.093-.408.164-.816.572-.91 4.62-1.055 8.583-.604 11.778 1.348.356.218.47.678.251 1.034zm1.468-3.26c-.274.444-.852.585-1.296.31-3.262-2.004-8.235-2.588-12.092-1.417-.5.15-1.025-.132-1.177-.632-.152-.5.132-1.025.632-1.177 4.407-1.336 9.89-.684 13.623 1.61.444.275.586.853.31 1.297zm.127-3.414c-3.913-2.324-10.37-2.54-14.137-1.396-.6.183-1.236-.157-1.418-.757-.183-.6.157-1.237.757-1.418 4.316-1.31 11.437-1.056 15.95 1.625.54.32.718 1.022.398 1.562-.32.54-1.022.718-1.562.398z"/>
                            </svg>
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase leading-none group-hover:text-white">Spotify</p>
                                <p className="text-[9px] font-bold text-white/40 uppercase group-hover:text-white/80 italic">Dale Play a @Forjana</p>
                            </div>
                        </a>

                        {/* Apple Podcasts Card */}
                        <a href="#" className="flex items-center gap-3 bg-[#872EC4]/10 border-2 border-[#872EC4]/30 p-3 rounded-2xl group hover:bg-[#872EC4] transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1">
                            <Podcast size={20} className="text-[#872EC4] group-hover:text-white" />
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase leading-none group-hover:text-white">Apple Podcasts</p>
                                <p className="text-[9px] font-bold text-white/40 uppercase group-hover:text-white/80 italic">Busca @Forjana</p>
                            </div>
                        </a>

                        {/* YouTube Card */}
                        <a href="#" className="flex items-center gap-3 bg-[#FF0000]/10 border-2 border-[#FF0000]/30 p-3 rounded-2xl group hover:bg-[#FF0000] transition-all shadow-[4px_4px_0_0_#000] active:translate-y-1">
                            <Youtube size={20} className="text-[#FF0000] group-hover:text-white" />
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase leading-none group-hover:text-white">YouTube</p>
                                <p className="text-[9px] font-bold text-white/40 uppercase group-hover:text-white/80 italic">Suscríbete a @Forjana</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 max-w-6xl mx-auto px-6">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">
                    FORJANA <span className="text-[#FFD600] mx-2">●</span> COLECTIVO 2026
                </p>
                <div className="flex items-center gap-4 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 italic leading-none">
                        Código abierto para mentes inquietas
                    </p>
                </div>
            </div>
        </footer>
    );
}