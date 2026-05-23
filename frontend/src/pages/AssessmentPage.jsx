import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";
import API_BASE_URL from "../config/api";

export default function AssessmentPage() {

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});


  useEffect(() => {

    fetchQuestions();

  }, []);


  const fetchQuestions = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/questions`
      );

      setQuestions(response.data.questions);

    }

    catch (error) {

      console.log(error);

    }
  };


  const updateAnswer = (category, value) => {

    setAnswers({
      ...answers,
      [category]: value
    });
  };


  const submitAssessment = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const email = payload.email;

      const response = await axios.post(
        `${API_BASE_URL}/analyze`,
        {
          email: email,
          answers: answers
        }
      );

      setResult(response.data);

      setLoading(false);

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

    }

    catch (error) {

      console.log(error);

      setLoading(false);

    }
  };


  const getRiskStyle = () => {

    if (!result) return "";

    if (result.risk === "High") {

      return {
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        icon: "⚠️",
        text: "High emotional stress detected"
      };
    }

    if (result.risk === "Moderate") {

      return {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        icon: "🟡",
        text: "Moderate wellness imbalance detected"
      };
    }

    return {
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: "🟢",
      text: "Stable emotional wellness detected"
    };
  };


  const riskStyle = getRiskStyle();


  return (

    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>


      {/* Grid Background */}

      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      </div>


      <div className="relative z-10">

        <Navbar />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">

          {/* Header */}

          <div className="mb-14">

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-8">

              <span className="animate-pulse">
                ●
              </span>

              AI Powered Wellness Assessment

            </div>


            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Wellness Assessment

            </h1>


            <p className="text-slate-400 text-xl leading-10 max-w-4xl">

              Complete the following psychological and behavioral wellness assessment
              to analyze emotional health, burnout indicators, stress levels,
              emotional stability, and mental wellness progression.

            </p>

          </div>


          {/* Assessment Card */}

          <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-[36px] p-6 lg:p-10 shadow-2xl">

            <div className="flex items-center justify-between flex-wrap gap-5 mb-10">

              <div>

                <h2 className="text-4xl font-black text-cyan-400 mb-3">

                  Assessment Questions

                </h2>

                <p className="text-slate-400 text-lg">

                  Answer honestly for accurate wellness analysis

                </p>

              </div>


              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-5xl">

                🧠

              </div>

            </div>


            {/* Questions */}

            <div className="space-y-8">

              {
                questions.map((q, index) => (

                  <div
                    key={index}
                    className="bg-slate-800/60 border border-slate-700 rounded-[30px] p-6 lg:p-8 hover:border-cyan-500/40 transition-all duration-300"
                  >

                    <div className="flex items-start gap-5 mb-6">

                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xl flex-shrink-0">

                        {index + 1}

                      </div>


                      <div>

                        <h3 className="text-2xl font-bold text-white leading-10">

                          {q.question}

                        </h3>

                        <p className="text-slate-500 mt-3">

                          Rate based on your recent emotional experience

                        </p>

                      </div>

                    </div>


                    <QuestionCard
                      question={q.question}
                      value={answers[q.category] || 3}
                      onChange={(value) => updateAnswer(q.category, value)}
                    />

                  </div>
                ))
              }

            </div>


            {/* Submit Button */}

            <button
              onClick={submitAssessment}
              disabled={loading}
              className="w-full mt-12 rounded-[30px] bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.01] transition-all duration-300 py-6 text-2xl font-black shadow-2xl shadow-cyan-500/20 disabled:opacity-60"
            >

              {
                loading
                  ? "Analyzing Wellness..."
                  : "Analyze Wellness"
              }

            </button>

          </div>


          {/* Result Section */}

          {
            result && (

              <div className="mt-12 bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-[36px] p-6 lg:p-10 shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between flex-wrap gap-6 mb-12">

                  <div>

                    <h2 className="text-5xl font-black text-green-400 mb-4">

                      Assessment Result

                    </h2>

                    <p className="text-slate-400 text-lg">

                      AI generated emotional wellness analysis report

                    </p>

                  </div>


                  <div className="w-24 h-24 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-6xl">

                    📈

                  </div>

                </div>


                {/* Score Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

                  <div className="bg-slate-800/70 border border-slate-700 rounded-[30px] p-8 hover:border-cyan-500 transition-all duration-300">

                    <p className="text-slate-400 text-lg mb-4">

                      Wellness Score

                    </p>

                    <h3 className="text-7xl font-black text-cyan-400">

                      {result.wellness_score}

                    </h3>

                  </div>


                  <div className={`rounded-[30px] p-8 border ${riskStyle.bg} ${riskStyle.border}`}>

                    <p className="text-slate-400 text-lg mb-4">

                      Risk Level

                    </p>

                    <div className="flex items-center gap-4">

                      <span className="text-5xl">
                        {riskStyle.icon}
                      </span>

                      <div>

                        <h3 className={`text-5xl font-black ${riskStyle.color}`}>

                          {result.risk}

                        </h3>

                        <p className="text-slate-300 mt-2">

                          {riskStyle.text}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* Recommendations */}

                <div className="bg-slate-800/60 border border-slate-700 rounded-[32px] p-6 lg:p-8">

                  <div className="flex items-center gap-5 mb-8">

                    <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-4xl">

                      ✨

                    </div>


                    <div>

                      <h3 className="text-4xl font-black text-yellow-400">

                        AI Recommendations

                      </h3>

                      <p className="text-slate-400 mt-2">

                        Personalized wellness improvement guidance

                      </p>

                    </div>

                  </div>


                  <div className="space-y-5">

                    {
                      result.recommendations.map((item, index) => (

                        <div
                          key={index}
                          className="bg-slate-900/70 border border-slate-700 rounded-3xl p-6 hover:border-yellow-500/30 transition-all duration-300"
                        >

                          <div className="flex gap-5 items-start">

                            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 text-2xl flex-shrink-0">

                              ✓

                            </div>


                            <p className="text-lg text-slate-300 leading-9 break-words">

                              {item}

                            </p>

                          </div>

                        </div>

                      ))
                    }

                  </div>

                </div>

              </div>

            )
          }

        </div>

      </div>

    </div>
  );
}