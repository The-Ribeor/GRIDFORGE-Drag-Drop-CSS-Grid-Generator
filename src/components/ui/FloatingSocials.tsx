'use client';
import { Github, Linkedin, Instagram } from 'lucide-react';

export const SocialSidebar = () => {
  const socialLinks = [
    { href: "https://github.com/Diegoberrio1601", icon: <Github size={16} />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/diegoberrio1601/", icon: <Linkedin size={16} />, label: "LinkedIn" },
    { href: "https://www.instagram.com/theribeor/", icon: <Instagram size={16} />, label: "Instagram" }
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col">
      <div className="flex flex-col bg-slate-900/80 backdrop-blur-md border-l border-y border-slate-700/50 rounded-l-xl shadow-2xl overflow-hidden">
        {socialLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-slate-500 hover:text-white hover:bg-blue-600/20 p-3 transition-all border-b border-slate-700/30 last:border-b-0 group"
          >
            <div className="transition-transform group-hover:scale-110">
              {link.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};