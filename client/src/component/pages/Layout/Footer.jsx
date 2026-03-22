import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030712] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Subtle Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Brand & Credits */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-extrabold tracking-tighter text-white mb-2">
              Stacky
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Empowering the next generation of <br /> full-stack developers.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex gap-8">
            {["About", "Features", "Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] font-medium">
            © {currentYear}{" "}
            <span className="text-slate-300">Sammythedeveloper</span>. All
            rights reserved.
          </p>

          <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] font-medium flex items-center gap-2">
            Built with<span className="text-blue-500 animate-pulse">✦</span> to the world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
