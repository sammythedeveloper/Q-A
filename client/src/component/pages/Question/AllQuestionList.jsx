import React, { useEffect, useState } from "react";
import api from "../../../Context/API";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlobalLayout from "../Layout/GlobalLayout";

const AllQuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  if (loading)
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="animate-spin size-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-[#030712] text-white font-sans">
        {/* --- Hero Header --- */}
        <header className="relative py-20 px-6 border-b border-white/5 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent)] -z-10"></div>

          <div className="max-w-4xl mx-auto py-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4"
            >
              Community <span className="text-blue-500">Knowledge</span>
            </motion.h1>
            <p className="text-slate-400 text-lg font-medium">
              Explore {questions.length} active discussions from developers
              worldwide.
            </p>
          </div>
        </header>

        {/* --- Questions Feed --- */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {error ? (
            <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, i) => (
                <motion.div
                  key={question.question_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() =>
                    navigate(
                      `/answerquestion?questionId=${question.question_id}`
                    )
                  }
                  className="group relative p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-6">
                    {/* User Avatar / Initials */}
                    <div className="hidden sm:flex size-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center text-lg font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      {question.username?.[0].toUpperCase()}
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                          {question.username}
                        </span>
                        <span className="size-1 bg-slate-700 rounded-full"></span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                          Question ID: #{question.question_id}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                        {question.title || question.question}
                      </h3>

                      <p className="text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2 mb-6 font-medium">
                        {question.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-widest group-hover:bg-blue-500 group-hover:text-white transition-all">
                          View & Answer
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {questions.length === 0 && !loading && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
              <p className="text-slate-500 font-medium italic text-lg text-glow">
                No questions have been asked yet. Be the first!
              </p>
            </div>
          )}
        </main>
      </div>
    </GlobalLayout>
  );
};

export default AllQuestionList;
