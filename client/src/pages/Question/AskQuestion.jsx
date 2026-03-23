import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../context/API";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import AppLayout from "../../layouts/AppLayout";

const AskQuestion = () => {
  const [formData, setFormData] = useState({ question: "", description: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");

    const validationErrors = {};
    if (!formData.question) validationErrors.question = "Title is required";
    if (!formData.description)
      validationErrors.description = "Description is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post("questions/askquestion", {
        user_id: userId,
        question: formData.question,
        description: formData.description,
      });

      if (response.status === 201) {
        setSuccessMessage("Question published to the community!");
        setTimeout(() => navigate("/allQuestions"), 1500);
      }
    } catch (error) {
      setErrors({
        server: error.response?.data?.msg || "Server error. Try again.",
      });
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#030712] text-white font-sans pt-20">
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* --- Sidebar: Guidelines --- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h1 className="text-4xl font-extrabold tracking-tighter mb-4">
                  Ask the <span className="text-blue-500">Community</span>
                </h1>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Stuck on a bug? Need architectural advice? Our community of
                  developers is here to help.
                </p>
              </div>

              <div className="space-y-4 p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-blue-400">
                  Writing Tips
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex gap-2">
                    <span>1.</span> Be specific with your title.
                  </li>
                  <li className="flex gap-2">
                    <span>2.</span> Include code snippets if possible.
                  </li>
                  <li className="flex gap-2">
                    <span>3.</span> Describe what you've already tried.
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* --- Main Form: Glass Deck --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden"
            >
              {/* Subtle Gradient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -z-10"></div>

              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold text-center">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Question Title */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Question Title
                  </label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="e.g. How to handle JWT expiration in React?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  />
                  {errors.question && (
                    <p className="text-red-400 text-xs font-bold ml-1">
                      {errors.question}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Detailed Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="8"
                    placeholder="Describe your problem in detail..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs font-bold ml-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Server Error */}
                {errors.server && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center">
                    {errors.server}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] leading-none"
                  >
                    <span>Publish Question</span>
                    <span className="text-xl">→</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default AskQuestion;
