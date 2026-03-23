import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
} from "lucide-react";

const ContentPage = ({ title, subtitle, content, icon: Icon, features }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 selection:bg-blue-500/30 font-sans overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-xs font-bold uppercase tracking-widest">
            Back to Terminal
          </span>
        </Link>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 mb-6">
            {Icon && <Icon size={14} className="text-blue-400" />}
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">
              {subtitle}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
            {title}
            <span className="text-blue-500">.</span>
          </h1>
          <div className="w-24 h-2 bg-blue-600 rounded-full mb-10"></div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm mb-12"
        >
          <div className="prose prose-invert prose-blue max-w-none">
            <p className="text-xl leading-relaxed text-slate-400 font-medium whitespace-pre-line">
              {content}
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-16 border-t border-white/5">
            {features.map((f, i) => (
              <div key={i} className="space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <h4 className="text-white font-bold tracking-tight">
                  {f.name}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer Call to Action */}
        <div className="text-center py-10">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.4em] font-black mb-6">
            End of Documentation
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all active:scale-95"
          >
            Initialize Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
