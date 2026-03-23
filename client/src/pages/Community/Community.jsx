import React from "react";
import { motion } from "framer-motion";
import PublicLayout from "../../layouts/PublicLayout";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 overflow-hidden relative">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          {/* --- Hero Header --- */}
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold mb-4"
            >
              The Network
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8"
            >
              Built by devs, <br />{" "}
              <span className="text-blue-500">for devs.</span>
            </motion.h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of engineers sharing knowledge, solving bugs, and
              pushing the boundaries of what's possible.
            </p>
          </div>

          {/* --- Community Pillars --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Action 1: The Feed */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-3xl font-bold mb-4 tracking-tight">
                The Global Feed
              </h3>
              <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                Dive into the latest technical discussions. From React hooks to
                Postgres optimization, the answer is always here.
              </p>
              <Link to="/allQuestions">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
                  Explore Questions <span>→</span>
                </Button>
              </Link>
            </motion.div>

            {/* Action 2: Open Source */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-3xl font-bold mb-4 tracking-tight">
                Open Source
              </h3>
              <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                Stacky is built on transparency. Contribute to our codebase,
                report bugs, or suggest new features on GitHub.
              </p>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3 rounded-2xl font-bold text-sm transition-all">
                  View Repository
                </Button>
              </a>
            </motion.div>
          </div>

          {/* --- Statistics / Social Proof --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-white/5">
            {[
              { label: "Active Users", value: "10+" },
              { label: "Questions Solved", value: "50+" },
              { label: "Code Snippets", value: "10+" },
              { label: "Countries", value: "20+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default CommunityPage;
