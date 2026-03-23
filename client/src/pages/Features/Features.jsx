import React from "react";
import { motion } from "framer-motion";
import PublicLayout from "../../layouts/PublicLayout";

const features = [
  {
    title: "Global Q&A Engine",
    desc: "Connect with developers across time zones. Get high-fidelity answers to complex architectural bottlenecks.",
    size: "md:col-span-2",
    icon: "🌐",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Code-First Design",
    desc: "Syntax highlighting and snippets built-in.",
    size: "md:col-span-1",
    icon: "💻",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Verified Experts",
    desc: "A reputation system that rewards technical accuracy and helpfulness.",
    size: "md:col-span-1",
    icon: "🛡️",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Collaborative Threads",
    desc: "Move beyond simple comments. Engage in deep-dive technical discussions with nested replies and code reviews.",
    size: "md:col-span-2",
    icon: "🧵",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

const FeaturesPage = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">
              Capabilities
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
              Engineered for <br />{" "}
              <span className="text-blue-500">modern workflows.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Stacky isn't just a forum. It's a precision-built environment
              designed to reduce developer friction.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${f.size} group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-6 shadow-inner">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FeaturesPage;
