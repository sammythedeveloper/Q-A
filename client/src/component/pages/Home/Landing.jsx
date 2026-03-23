import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Orbit } from "./Orbit";
import { Button } from "./Button";
import { Companies, TechStack } from "./Companies";
import Footer from "../Layout/Footer";

export const navItems = [
  { name: "Features", href: "/features" }, // Change from #feature
  { name: "About", href: "/about" },
  { name: "Community", href: "/community" },
];

export const Landing = () => {
  return (
    <div className="bg-[#030712] text-white min-h-screen font-sans selection:bg-blue-500/30">
      {/* --- MODERN HEADER --- */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#030712]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-20 px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 group-hover:from-blue-400 group-hover:to-white transition-all duration-500">
              Stacky
            </h1>
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-white transition-colors"
              >
                {name}
              </a>
            ))}

            {/* Visual Divider */}
            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

            {/* Modern Login Link */}
            <Link
              to="/signin"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-blue-400 transition-colors"
            >
              Login
            </Link>
          </nav>

          {/* Primary Action */}
          <div className="flex items-center gap-4">
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                Launch
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

        {/* Orbits & Background Logic */}
        <div className="absolute inset-0 -z-20 opacity-30">
          <div className="absolute-center">
            <Orbit className="size-[400px]" />
          </div>
          <div className="absolute-center">
            <Orbit className="size-[800px]" />
          </div>
          <div className="absolute-center">
            <Orbit className="size-[1200px]" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 mb-8">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                v1.0 is now live
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-8">
              Curiosity meets <span className="text-blue-500">clarity.</span>
              <br />
              Collaborate seamlessly.
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
              Ignite innovation, share insights, and build solutions. The
              ultimate hub for modern developers to solve the world's toughest
              coding challenges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="primary" className="px-12 py-4 text-lg">
                  Join the Community
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (GLASS CARDS) --- */}
      <section className="py-24 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">
            Why developers love Stacky
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Ask Questions",
                desc: "Get precision answers from verified experts in our global dev community.",
                icon: "📝",
              },
              {
                title: "Share Knowledge",
                desc: "Build your reputation by helping others and contributing to open-source wisdom.",
                icon: "🤝",
              },
              {
                title: "Build Connections",
                desc: "Network with senior engineers and tech leaders across every stack.",
                icon: "🌍",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/[0.03] border border-white/10 rounded-[2rem] backdrop-blur-sm hover:bg-white/[0.05] transition-all"
              >
                <div className="size-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section className="relative border-y border-white/[0.05] bg-[#030712]">
        {/* Optional: Add a very faint glow behind the tech stack */}
        <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none"></div>

        <TechStack />
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
