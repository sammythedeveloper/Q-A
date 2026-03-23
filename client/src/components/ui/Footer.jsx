import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Modern navigation data with updated descriptions
  const footerLinks = [
    { name: "Mission", path: "/about", desc: "Our DNA" },
    { name: "Stack", path: "/features", desc: "The Toolbox" },
    { name: "Privacy", path: "/", desc: "Zero Trust" },
    { name: "Legal", path: "/", desc: "The Protocol" },
  ];

  return (
    <footer className="relative bg-[#030712] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Subtle Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          {/* Brand & Credits */}
          <div className="text-center md:text-left flex-1">
            <span className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 group-hover:from-blue-400 group-hover:to-white transition-all duration-500">
              Stacky
            </span>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
              Architecting the future of collaborative debugging. <br /> Built
              for the 1% of curious developers.
            </p>
          </div>

          {/* Quick Navigation Links with Modern Descriptions */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-6 flex-1">
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="group flex flex-col items-center md:items-start gap-1"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-blue-500 transition-colors">
                  {item.name}
                </span>
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-300 transition-colors italic">
                  {item.desc}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
              © {currentYear}{" "}
              <span className="text-slate-400">Sammythedeveloper</span>
            </p>
          </div>

          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black flex items-center gap-2 group cursor-default">
            Built with{" "}
            <span className="text-blue-500 animate-pulse group-hover:scale-150 transition-transform">
              ✦
            </span>{" "}
            for the open source
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
