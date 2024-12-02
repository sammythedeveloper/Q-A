import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen text-white font-sans">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-heading font-extrabold mb-6 tracking-wide"
          >
            Unlock the Power of DevConnect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg mb-8 font-medium"
          >
            Ask questions, share knowledge, and connect with the brightest minds in development.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center space-x-4"
          >
            <Link
              to="/signup"  // Use Link for navigation
              className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transform transition"
            >
              Get Started
            </Link>
            <Link
              to="/signin"  // Use Link for navigation
              className="bg-transparent border border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
        >
          <img
            src="/hero-bg.svg"
            alt="Hero Background"
            className="absolute w-full h-full object-cover opacity-30"
          />
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading font-bold text-center mb-8"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ask Questions",
                desc: "Get answers to your toughest questions.",
                icon: "📝",
              },
              {
                title: "Share Knowledge",
                desc: "Help others by sharing your expertise.",
                icon: "🤝",
              },
              {
                title: "Build Connections",
                desc: "Connect with developers worldwide.",
                icon: "🌍",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <span className="text-2xl mr-2">{feature.icon}</span>
                  {feature.title}
                </h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 DevConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
