import React from "react";
import { motion } from "framer-motion";
import { ReactComponent as ReactLogo } from "../asset/react.svg";
import { ReactComponent as Javascript } from "../asset/JavaScript.svg";
import { ReactComponent as Typescript } from "../asset/TypeScript.svg";
import { ReactComponent as MongoDB } from "../asset/MongoDB.svg"; // Renamed from Mango
import { ReactComponent as Node } from "../asset/Node.js.svg";
import { ReactComponent as Mysql } from "../asset/MySQL.svg";
import { ReactComponent as Tailwind } from "../asset/Tailwind CSS.svg";
import { ReactComponent as HTML } from "../asset/HTML5.svg";
import { ReactComponent as CSS } from "../asset/CSS3.svg";

import { Button } from "../components/ui/Button";

export const techStack = [
  { name: "HTML", logo: HTML },
  { name: "CSS", logo: CSS },
  { name: "Javascript", logo: Javascript },
  { name: "MongoDB", logo: MongoDB },
  { name: "Node", logo: Node },
  { name: "Mysql", logo: Mysql },
  { name: "Typescript", logo: Typescript },
  { name: "Tailwind", logo: Tailwind },
  { name: "React", logo: ReactLogo },
];

export const TechStack = () => {
  return (
    <section className="relative py-24 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Call to Action Button */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button className="bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              Ready to learn and share?
            </Button>
          </motion.div>
        </div>

        {/* Headline */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight">
            Built with the world's most <br />
            <span className="text-blue-500">trusted technologies.</span>
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap opacity-40">
          {techStack.map(({ logo: Logo, name }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="w-12 h-12 md:w-16 md:h-16 flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-300 cursor-help"
              title={name}
            >
              <Logo className="w-full h-full object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
