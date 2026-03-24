import React, { useEffect, useState } from "react";
import api from "../../context/API";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { Search, Tag } from "lucide-react"; // Icons for a better UI

const AllQuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/questions/allquestions")
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to load the feed. Check your connection.");
        setLoading(false);
      });
  }, []);

  // --- Search/Filter Logic ---
  const filteredQuestions = questions.filter((q) => {
    const searchLower = searchQuery.toLowerCase();
    const hasMatchInTitle = q.question?.toLowerCase().includes(searchLower);
    const hasMatchInTags = q.tags?.toLowerCase().includes(searchLower);
    return hasMatchInTitle || hasMatchInTags;
  });

  if (loading)
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="animate-spin size-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#030712] text-white font-sans">
        {/* --- Hero Header --- */}
        <header className="relative pt-24 pb-12 px-6 border-b border-white/5 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent)] -z-10"></div>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tighter"
            >
              Community <span className="text-blue-500">Knowledge</span>
            </motion.h1>

            {/* --- Search Bar --- */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-xl mx-auto group"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by keyword or #tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </motion.div>
          </div>
        </header>

        {/* --- Questions Feed --- */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {error ? (
            <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center font-bold">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredQuestions.map((question, i) => (
                  <motion.div
                    key={question.question_id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() =>
                      navigate(
                        `/answerquestion?questionId=${question.question_id}`
                      )
                    }
                    className="group relative p-6 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className="hidden sm:flex size-14 rounded-full p-6 bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center text-xl font-bold shadow-xl shadow-blue-500/20 group-hover:rotate-3 transition-transform">
                        {question.username?.[0].toUpperCase()}
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                            {question.username}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                            #{question.question_id.toString().slice(0, 5)}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                          {question.question}
                        </h3>

                        <p className="text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2 mb-6 font-medium">
                          {question.description}
                        </p>

                        {/* --- Tag Display --- */}
                        <div className="flex flex-wrap gap-2 items-center">
                          {question.tags ? (
                            question.tags.split(",").map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold rounded-lg uppercase tracking-wider group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all"
                              >
                                #{tag.trim()}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] text-slate-600 italic">
                              No tags
                            </span>
                          )}

                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-blue-500 text-xs font-bold uppercase tracking-widest">
                            View Discussion <span>→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {filteredQuestions.length === 0 && !loading && (
            <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
              <p className="text-slate-500 font-medium italic text-lg">
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : "The community is quiet. Ask the first question!"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-blue-500 font-bold hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
};

export default AllQuestionList;
