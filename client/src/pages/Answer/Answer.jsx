import React, { useState, useEffect } from "react";
import api from "../../context/API";
import { useLocation } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/Button";

const AnswerForm = () => {
  const location = useLocation();
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const questionId = queryParams.get("questionId");

  // fetchData now accepts 'isInitial' to prevent flickering on post
  const fetchData = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);

      // Get the token from local storage
      const token = localStorage.getItem("token");

      const qRes = await api.get(
        `/questions/singlequestion?questionId=${questionId}`,
        { headers: { Authorization: `Bearer ${token}` } } // Add this
      );

      if (qRes.data?.SingleQuestion?.length > 0) {
        setQuestion(qRes.data.SingleQuestion[0]);
      }

      try {
        const aRes = await api.get(
          `/answers/allanswers/${questionId}`,
          { headers: { Authorization: `Bearer ${token}` } } // Add this
        );
        setAnswers(aRes.data || []);
      } catch (answerErr) {
        setAnswers([]);
      }

      setLoading(false);
    } catch (error) {
      setErrorMessage("Critical error: Could not find this question.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (questionId) fetchData(true);
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    const token = localStorage.getItem("token");

    if (!answer.trim()) return setErrorMessage("Please type an answer first.");

    try {
      const response = await api.post(
        "answers/answerquestion",
        {
          question_id: questionId,
          answer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Answer shared!");
        setAnswer("");
        // Refresh data WITHOUT the 'loading' spinner for an instant feel
        await fetchData(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("Please log in again to post an answer.");
      } else {
        setErrorMessage(error.response?.data?.msg || "Something went wrong.");
      }
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#030712] text-white font-sans pt-24 pb-20">
        <main className="max-w-4xl mx-auto px-6">
          {/* --- Question Section --- */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/5 border border-blue-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl pointer-events-none text-blue-500">
              ?
            </div>

            {question ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">
                    {question.username?.[0].toUpperCase() || "D"}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 leading-none">
                      {question.username}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">
                      Author
                    </p>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4 leading-tight">
                  {question.question}
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  {question.description}
                </p>
              </>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-8 w-3/4 bg-white/5 rounded-lg"></div>
                <div className="h-20 w-full bg-white/5 rounded-lg"></div>
              </div>
            )}
          </motion.section>

          {/* --- Answer Input Section --- */}
          <section className="mb-16">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6 ml-2">
              Your Contribution
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Share your technical expertise..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all min-h-[150px] font-medium"
                />
                <div className="absolute bottom-4 right-4">
                  <Button
                    type="submit"
                    className="h-12 px-8 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 leading-none transition-all active:scale-95"
                  >
                    Post Answer <span className="text-lg">→</span>
                  </Button>
                </div>
              </div>
              <AnimatePresence>
                {successMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-emerald-400 text-sm font-bold text-center"
                  >
                    {successMessage}
                  </motion.p>
                )}
                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm font-bold text-center"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </section>

          <section className="space-y-6">
            {answers.map((ans, i) => (
              <motion.div
                key={ans.answer_id || i}
                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-300">
                      {ans.username?.[0].toUpperCase() || "U"}
                    </div>
                    <p className="text-sm font-bold text-slate-200">
                      {ans.username}
                    </p>
                  </div>
                </div>
                <p className="text-slate-400 text-base leading-relaxed font-medium">
                  {ans.answer}
                </p>
              </motion.div>
            ))}
          </section>
        </main>
      </div>
    </AppLayout>
  );
};

export default AnswerForm;
