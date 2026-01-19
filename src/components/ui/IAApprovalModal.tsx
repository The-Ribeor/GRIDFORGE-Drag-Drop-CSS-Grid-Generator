'use client';

import { useState } from 'react';
import { X, Sparkles, Send, MessageSquare, Mail, Code2, UserPlus, CheckCircle2, Terminal } from 'lucide-react';
import { sendToGoogleSheet } from '@/services/googleSheet';
import { Language } from '@/lib/types';
import { translations } from '@/lib/translations';

interface IAApprovalModalProps {
    onClose: () => void;
    lang: Language;
}

export const IAApprovalModal = ({ onClose, lang }: IAApprovalModalProps) => {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [role, setRole] = useState<'waiting' | 'developer'>('waiting');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    // BLINDAJE: Acceso ultra seguro a las traducciones
    const currentLang = lang || 'es';
    const t = (translations[currentLang] || translations['es']).waiting;
    
    const MAX_CHARS = 160;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'sending') return;
        
        setStatus('sending');
        const isSuccess = await sendToGoogleSheet({ email, role, feedback });

        if (isSuccess) {
            setStatus('success');
        } else {
            setStatus('idle');
            alert('Error de conexión');
        }
    };

    if (status === 'success') {
        return (
            <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all">
                <div className={`bg-card-bg border-[3px] w-full max-w-md rounded-[2.5rem] p-8 md:p-10 text-center space-y-6 animate-in zoom-in duration-300 ${role === 'developer' ? 'border-purple-500 shadow-[8px_8px_0_0_#a855f7]' : 'border-blue-500 shadow-[8px_8px_0_0_#3b82f6]'}`}>
                    <div className="relative mx-auto w-20 h-20">
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${role === 'developer' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border-2 ${role === 'developer' ? 'bg-purple-500/10 border-purple-500/50 text-purple-500' : 'bg-blue-500/10 border-blue-500/50 text-blue-500'}`}>
                            {role === 'developer' ? <Code2 size={32} /> : <CheckCircle2 size={32} />}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-black uppercase italic text-text-title tracking-tighter">
                            {role === 'developer' ? t.successDevTitle : t.successWaitTitle}
                        </h2>
                        <div className="bg-black/40 rounded-2xl p-5 border border-white/5 text-left font-mono relative overflow-hidden">
                            <Terminal size={14} className="absolute top-3 right-3 opacity-20 text-white" />
                            <p className="text-[12px] md:text-sm text-text-body leading-relaxed">
                                <span className="text-blue-500 block mb-1 opacity-50 text-[10px] font-black uppercase tracking-widest">{t.statusLabel}</span>
                                {role === 'developer' ? t.successDevMsg : t.successWaitMsg}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase text-[11px] tracking-[0.25em] transition-all active:scale-95 shadow-[4px_4px_0_0_#1e3a8a]">
                        {t.closeTerminal}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md transition-all" onClick={onClose}>
            <div className="bg-card-bg border-t-[3px] md:border-[3px] border-border-main w-full max-w-xl max-h-[92vh] md:max-h-[90vh] overflow-y-auto rounded-t-[2.5rem] md:rounded-[2.5rem] flex flex-col relative animate-in slide-in-from-bottom-full md:slide-in-from-bottom-4 duration-500 no-scrollbar" onClick={e => e.stopPropagation()}>
                <div className="p-6 md:p-10 pb-4 flex flex-col items-center text-center sticky top-0 bg-card-bg/95 backdrop-blur-sm z-20">
                    <div className="flex justify-between items-center w-full mb-6">
                        <div className="w-8" />
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 px-4 py-1.5 rounded-full">
                            <Sparkles size={12} className="animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.15em]">{t.tag}</span>
                        </div>
                        <button onClick={onClose} className="text-text-body hover:text-text-title p-2 bg-app-bg md:bg-transparent rounded-full transition-all">
                            <X size={20} />
                        </button>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-text-title uppercase italic leading-[0.9] tracking-tighter mb-3">
                        {t.titlePart1} <span className="text-blue-500">{t.titlePart2}</span>
                    </h2>
                    <p className="text-text-body text-[13px] md:text-base font-bold leading-snug max-w-[90%]">
                        {t.desc} <br />
                        <span className="text-blue-500 block md:inline md:ml-1">{t.join}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 pt-4 space-y-6">
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <button type="button" onClick={() => setRole('waiting')} className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all gap-2 active:scale-95 ${role === 'waiting' ? 'border-blue-500 bg-blue-500/10 text-text-title shadow-[4px_4px_0_0_#3b82f6]' : 'border-border-main bg-app-bg/50 text-slate-500'}`}>
                            <UserPlus size={22} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">{t.roleWait}</span>
                        </button>
                        <button type="button" onClick={() => setRole('developer')} className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all gap-2 active:scale-95 ${role === 'developer' ? 'border-purple-500 bg-purple-500/10 text-text-title shadow-[4px_4px_0_0_#a855f7]' : 'border-border-main bg-app-bg/50 text-slate-500'}`}>
                            <Code2 size={22} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">{t.roleDev}</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em] ml-1">
                                <Mail size={12} /> {t.emailLabel}
                            </label>
                            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="thor@asgard.com" className="w-full bg-app-bg border-2 border-border-main rounded-2xl px-5 py-4 text-sm font-bold text-text-title focus:border-blue-500 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-[0.15em]">
                                    <MessageSquare size={12} /> {role === 'developer' ? t.feedbackDev : t.feedbackWait}
                                </label>
                                <span className={`text-[9px] font-bold ${feedback.length >= MAX_CHARS ? 'text-red-500' : 'text-slate-500'}`}>{feedback.length}/{MAX_CHARS}</span>
                            </div>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value.slice(0, MAX_CHARS))}
                                maxLength={MAX_CHARS}
                                placeholder={role === 'developer' ? t.placeholderDev : t.placeholderWait}
                                rows={3}
                                className="w-full bg-app-bg border-2 border-border-main rounded-2xl px-5 py-4 text-sm font-bold text-text-title focus:border-blue-500 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={status === 'sending'} className={`group relative w-full font-black py-5 rounded-2xl uppercase text-[12px] tracking-[0.25em] transition-all overflow-hidden flex items-center justify-center gap-3 shadow-[4px_4px_0_0_#1e293b] ${role === 'developer' ? 'bg-purple-600 text-white shadow-[4px_4px_0_0_#7c3aed]' : 'bg-text-title text-card-bg shadow-[4px_4px_0_0_#1e293b]'}`}>
                        {status === 'sending' ? <span className="animate-pulse">{t.syncing}</span> : <><Send size={18} /> {role === 'developer' ? t.submitDev : t.submitWait}</>}
                    </button>
                </form>
                <div className="px-10 pb-10">
                    <p className="text-[9px] text-center font-bold text-slate-500 uppercase tracking-widest leading-relaxed opacity-60">{t.footerNote}</p>
                </div>
            </div>
        </div>
    );
};