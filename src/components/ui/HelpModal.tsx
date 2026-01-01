import { X, Plus, Move, Maximize, Heart } from 'lucide-react';

export const HelpModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
    <div className="bg-[#334155] border border-slate-600 w-full max-w-sm rounded-2xl p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
      
      {/* Header del Modal */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="font-black text-white uppercase tracking-widest text-[10px] italic bg-blue-600 px-2 py-0.5 rounded">
            Gridforge Guide
          </span>
          <h2 className="text-white font-bold text-lg leading-tight">Domina la forja de layouts</h2>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
          <X size={20} />
        </button>
      </div>

      {/* Cuerpo: Instrucciones */}
      <div className="space-y-3 text-[11px] text-slate-300">
        <div className="flex gap-4 items-center bg-slate-800/40 p-4 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors group">
          <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
            <Plus size={16} className="text-blue-400" />
          </div>
          <p>Haz <span className="text-white font-bold text-xs">clic</span> en cualquier celda vacía para forjar un nuevo bloque.</p>
        </div>

        <div className="flex gap-4 items-center bg-slate-800/40 p-4 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors group">
          <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
            <Move size={16} className="text-blue-400" />
          </div>
          <p><span className="text-white font-bold text-xs">Arrastra</span> desde el centro de un bloque para reposicionarlo en la rejilla.</p>
        </div>

        <div className="flex gap-4 items-center bg-slate-800/40 p-4 rounded-xl border border-slate-600/30 hover:border-blue-500/50 transition-colors group">
          <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
            <Maximize size={16} className="text-blue-400" />
          </div>
          <p>Usa la <span className="text-white font-bold text-xs">esquina inferior</span> para redimensionar el ancho y alto del elemento.</p>
        </div>
      </div>

      {/* Footer del Modal: Marca Ribeor */}
      <div className="pt-4 border-t border-slate-600/50 flex flex-col gap-4">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 px-1">
          <span>Engine v1.0.0</span>
          <div className="flex items-center gap-1">
            <span>By</span>
            <a href="https://www.theribeor.com" target="_blank" className="text-blue-400 hover:text-white transition-colors">The Ribeor</a>
            <Heart size={8} className="fill-red-500 text-red-500 animate-pulse" />
          </div>
        </div>
        
        <button 
          onClick={onClose} 
          className="w-full bg-white text-slate-900 font-black py-4 rounded-xl uppercase text-[11px] tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
        >
          ¡A forjar!
        </button>
      </div>
    </div>
  </div>
);