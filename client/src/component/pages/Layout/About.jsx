import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[#030712] overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Big Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 w-fit">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Our Mission
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-tight">
              Built for developers, <br />
              <span className="text-blue-500 text-glow">by developers.</span>
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
          </motion.div>

          {/* Right Side: Clean Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-slate-400 text-lg leading-relaxed font-medium"
          >
            <p>
              Stacky isn't just another Q&A site. It's a high-performance
              ecosystem designed to bridge the gap between
              <span className="text-white"> junior curiosity</span> and{" "}
              <span className="text-white">senior expertise</span>.
            </p>

            <p>
              We believe the best way to solve a complex bug isn't just a
              copy-paste from documentation—it's a meaningful conversation. Our
              platform fosters a culture of deep technical sharing where every
              contribution helps build the world's most accessible developer
              knowledge base.
            </p>

            {/* Feature Mini-Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <h4 className="text-white font-bold mb-1">Collaborative</h4>
                <p className="text-sm">Real-time problem solving with peers.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Open Source</h4>
                <p className="text-sm">Built on the spirit of shared code.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
