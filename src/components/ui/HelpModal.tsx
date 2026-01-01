import { X, Plus, Move, Maximize } from 'lucide-react';

export const HelpModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
    <div className="bg-[#334155] border border-slate-600 w-full max-w-sm rounded-2xl p-8 shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center">
        <span className="font-black text-white uppercase tracking-widest text-xs italic">Gridforge Guide</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
      </div>
      <div className="space-y-4 text-xs text-slate-300">
        <div className="flex gap-4 items-center bg-slate-800/40 p-3 rounded-xl border border-slate-600/30">
          <Plus size={16} className="text-blue-400" /> <p>Click en el fondo para crear bloque.</p>
        </div>
        <div className="flex gap-4 items-center bg-slate-800/40 p-3 rounded-xl border border-slate-600/30">
          <Move size={16} className="text-blue-400" /> <p>Arrastra el centro para mover.</p>
        </div>
        <div className="flex gap-4 items-center bg-slate-800/40 p-3 rounded-xl border border-slate-600/30">
          <Maximize size={16} className="text-blue-400" /> <p>Esquina derecha para redimensionar.</p>
        </div>
      </div>
      <button onClick={onClose} className="w-full bg-white text-slate-900 font-black py-3 rounded-xl uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-colors shadow-lg">Comenzar</button>
    </div>
  </div>
);