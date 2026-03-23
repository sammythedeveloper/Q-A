import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "../../layouts/AppLayout";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // New state for name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("username");

    if (!token) {
      navigate("/signin");
    } else {
      setIsAuthenticated(true);
      setUsername(storedName || "Developer"); // Set the name here
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#030712] text-white font-sans py-10">
        {/* --- Hero / Welcome Section --- */}
        <header className="relative py-20 px-6 overflow-hidden border-b border-white/5">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] -z-10"></div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4"
              >
                Welcome back,{" "}
                <span className="text-blue-500 capitalize">{username}</span>
              </motion.h1>
              <p className="text-slate-400 text-lg max-w-xl font-medium">
                What's on your mind today? Join the conversation or solve a
                fellow developer's blocker.
              </p>
            </div>

            {/* Quick Action Search */}
            <div className="w-full md:w-96">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500"
                />
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 px-2 py-1 rounded text-[10px] text-slate-400 border border-white/10">
                  ⌘ K
                </kbd>
              </div>
            </div>
          </div>
        </header>

        {/* --- Main Action Grid --- */}
        <main className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Ask a Question",
                desc: "Stuck on a bug? Describe your problem and get help from the community.",
                icon: "💡",
                link: "/ask-question",
                color: "from-blue-600/20 to-transparent",
                border: "group-hover:border-blue-500/50",
              },
              {
                title: "Answer Questions",
                desc: "Help others by sharing your expertise and earning reputation points.",
                icon: "🛠️",
                link: "/allQuestions",
                color: "from-emerald-600/20 to-transparent",
                border: "group-hover:border-emerald-500/50",
              },
              {
                title: "Community Feed",
                desc: "Explore the latest trends, discussions, and solved challenges.",
                icon: "🚀",
                link: "/explore-questions",
                color: "from-purple-600/20 to-transparent",
                border: "group-hover:border-purple-500/50",
              },
            ].map((card, i) => (
              <Link key={i} to={card.link} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative h-full p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 transition-all ${card.border} backdrop-blur-sm overflow-hidden`}
                >
                  {/* Subtle Corner Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                  ></div>

                  <div className="relative z-10">
                    <div className="text-4xl mb-6">{card.icon}</div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {card.desc}
                    </p>

                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:gap-2 transition-all">
                      Open Section <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* --- Bottom Detail Section --- */}
          <div className="mt-12 p-8 rounded-[2rem] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-lg font-bold mb-1">New to the community?</h4>
              <p className="text-slate-400 text-sm">
                Check out our guide on how to write a great question.
              </p>
            </div>
            <Link >
              <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-50 transition-colors">
                Read Documentation
              </button>
            </Link>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
