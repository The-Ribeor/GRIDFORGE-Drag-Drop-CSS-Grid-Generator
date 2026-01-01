import { HelpCircle, Github, Linkedin, Instagram } from 'lucide-react';
import { GridConfig } from '@/lib/types';

interface NavbarProps {
  config: GridConfig;
  setConfig: (config: GridConfig) => void;
  onShowHelp: () => void;
  onReset: () => void;
}

export const Navbar = ({ config, setConfig, onShowHelp, onReset }: NavbarProps) => {
  const socialLinks = [
    { href: "https://github.com/Diegoberrio1601", icon: <Github size={18} /> },
    { href: "https://www.linkedin.com/in/diegoberrio1601/", icon: <Linkedin size={18} /> },
    { href: "https://www.instagram.com/theribeor/", icon: <Instagram size={18} /> }
  ];

  return (
    <nav className="h-16 border-b border-slate-700 bg-[#1E293B]/95 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-[100]">
      <div className="flex items-center gap-10">
        <div className="font-black text-white tracking-widest text-sm uppercase italic">GRIDFORGE</div>
        <div className="flex gap-6 border-l border-slate-700 pl-8">
          {(['columns', 'rows', 'gap'] as const).map(k => (
            <div key={k} className="flex flex-col">
              <label className="text-[8px] font-bold uppercase text-slate-500 tracking-widest leading-none mb-1">{k}</label>
              <input 
                type="number" 
                value={config[k]} 
                onChange={e => setConfig({ ...config, [k]: parseInt(e.target.value) || 1 })} 
                className="w-8 bg-transparent border-none p-0 text-sm font-bold text-slate-100 focus:ring-0" 
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-4 border-r border-slate-700 pr-4 mr-2">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-all hover:scale-110">{link.icon}</a>
          ))}
        </div>
        <button onClick={onShowHelp} className="text-slate-500 hover:text-white transition-colors"><HelpCircle size={20} /></button>
        <button onClick={onReset} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border border-red-500/20 shadow-lg">Reset</button>
      </div>
    </nav>
  );
};