import React from "react";
import { motion } from "framer-motion";

const Resources = () => {
  const resourceList = [
    {
      title: "MDN Web Docs",
      desc: "The definitive gold standard for Web APIs and documentation.",
      link: "https://developer.mozilla.org",
    },
    {
      title: "freeCodeCamp",
      desc: "Structured paths to master JavaScript, React, and Backend.",
      link: "https://www.freecodecamp.org",
    },
    {
      title: "GitHub",
      desc: "The heart of open source. Host code and collaborate globally.",
      link: "https://github.com",
    },
    {
      title: "CSS-Tricks",
      desc: "Master the art of layouts, animations, and modern CSS.",
      link: "https://css-tricks.com",
    },
    {
      title: "Dev.to",
      desc: "Read and write technical articles for the modern web.",
      link: "https://dev.to",
    },
    {
      title: "Stack Overflow",
      desc: "Your second brain for solving specific code errors.",
      link: "https://stackoverflow.com",
    },
  ];

  return (
    <section
      id="resources"
      className="relative py-24 bg-[#030712] overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent)] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-6"
          >
            Curated <span className="text-blue-500">Toolbox</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            The same resources we use to build Stacky. Level up your workflow
            with the best documentation and communities in the industry.
          </p>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceList.map((resource, i) => (
            <motion.a
              key={i}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.06] transition-all"
            >
              {/* Animated Accent Line */}
              <div className="absolute top-8 left-8 w-8 h-1 bg-blue-600 rounded-full group-hover:w-16 transition-all"></div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {resource.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  Explore Resource <span>→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
