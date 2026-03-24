import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../context/API";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/notifications/unread", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  // NEW: Logic to clear the notification so it doesn't show up again
  const handleNotificationClick = async (n) => {
    try {
      const token = localStorage.getItem("token");

      // 1. Tell backend this is now "Read"
      await api.patch(
        `/notifications/mark-as-read/${n.notification_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. UI Updates
      setShowNotifications(false);

      // 3. Navigate to the specific question
      navigate(`/answerquestion?questionId=${n.question_id}`);

      // 4. Refresh list so the red dot/count updates immediately
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark notification as read", error);
      // Even if the API fails, we still want to navigate the user
      navigate(`/answerquestion?questionId=${n.question_id}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("username");

    if (!token) {
      navigate("/signin");
    } else {
      setIsAuthenticated(true);
      setUsername(storedName || "Developer");
      fetchNotifications();

      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#030712] text-white font-sans py-10 ">
        <div className="relative py-20 px-6 h-[500px] md:h-auto overflow-hidden border-b border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] -z-10"></div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
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

              {/* --- NOTIFICATION BELL --- */}
              <div className="relative pt-2">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
                >
                  <Bell
                    className={`size-7 ${
                      notifications.length > 0
                        ? "text-blue-400"
                        : "text-slate-500"
                    } group-hover:scale-110 transition-transform`}
                  />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#030712] animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-1 w-80 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          Notifications ({notifications.length})
                        </span>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <X size={16} className="text-slate-500" />
                        </button>
                      </div>

                      <div className="max-h-80 overflow-y-auto scrollbar-hide">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div
                              key={n.notification_id}
                              onClick={() => handleNotificationClick(n)} // Updated click handler
                              className="p-5 hover:bg-blue-600/10 cursor-pointer border-b border-white/5 last:border-0 transition-all group/item"
                            >
                              <p className="text-sm text-slate-300 group-hover/item:text-white leading-relaxed">
                                <span className="text-blue-400 font-bold">
                                  {n.actor_name || "Someone"}
                                </span>{" "}
                                {n.message}
                              </p>
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2 block">
                                New Activity
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="p-10 text-center text-slate-500 text-sm italic">
                            No new activity
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

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
        </div>

        <main className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Ask a Question",
                desc: "Stuck on a bug? Describe your problem and get help from the community.",
                icon: "💡",
                link: "/askquestion",
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
                link: "",
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
        </main>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
