import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../context/API";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import AppLayout from "../../layouts/AppLayout";
import { X } from "lucide-react"; // For the tag "delete" icon

const AskQuestion = () => {
  const [formData, setFormData] = useState({ question: "", description: "" });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // --- Tag Logic ---
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Get the token from local storage
    const token = localStorage.getItem("token");

    const validationErrors = {};
    if (!formData.question) validationErrors.question = "Title is required";
    if (!formData.description)
      validationErrors.description = "Description is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // 2. Attach the Authorization header to the request
      const response = await api.post(
        "questions/askquestion",
        {
          question: formData.question,
          description: formData.description,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // The "Security Badge" for the backend
          },
        }
      );

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
            {/* Sidebar remains the same */}
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
                  Stuck on a bug? Need architectural advice? Our community is
                  here.
                </p>
              </div>
              <div className="space-y-4 p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-blue-400">
                  Writing Tips
                </h4>
                <ul className="text-sm text-slate-400 space-y-3 font-medium">
                  <li className="flex gap-2">
                    <span>1.</span> Summarize the problem.
                  </li>
                  <li className="flex gap-2">
                    <span>2.</span> Add relevant tags for better visibility.
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm relative"
            >
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

                {/* --- Tag Input Section --- */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Related Tags
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl min-h-[58px] focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="hover:text-white transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder={
                        tags.length === 0
                          ? "Press enter to add tags (e.g. react, nodejs)"
                          : ""
                      }
                      className="bg-transparent outline-none flex-1 text-white placeholder:text-slate-600 text-sm font-medium px-2"
                    />
                  </div>
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
                    rows="6"
                    placeholder="Provide all the information someone would need to answer..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs font-bold ml-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
                >
                  Publish to Stacky
                </Button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default AskQuestion;
