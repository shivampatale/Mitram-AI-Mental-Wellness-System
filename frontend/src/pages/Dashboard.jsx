import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { User, LogOut, ChevronDown } from "lucide-react";

import AnalyticsChart from "../components/AnalyticsChart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function Dashboard() {

  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);

  const [latest, setLatest] = useState(null);

  const [history, setHistory] = useState([]);

  const [insights, setInsights] = useState([]);

  const [profile, setProfile] = useState(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {

    fetchAnalytics();

    fetchLatestAssessment();

    fetchHistory();

    fetchProfile();

  }, []);


  const getAuthHeader = () => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return null;
    }

    return {

      headers: {

        Authorization: `Bearer ${token}`
      }
    };
  };


  const fetchAnalytics = async () => {

    try {

      const config = getAuthHeader();

      if (!config) return;

      const response = await axios.get(

        `${API_BASE_URL}/analytics`,

        config
      );

      setAnalytics(response.data);

    }

    catch (error) {

      console.log(error);

    }
  };


  const fetchLatestAssessment = async () => {

    try {

      const config = getAuthHeader();

      if (!config) return;

      const response = await axios.get(

        `${API_BASE_URL}/latest-assessment`,

        config
      );

      setLatest(response.data);

      setInsights(
        response.data.insights || []
      );

    }

    catch (error) {

      console.log(error);

    }
  };


  const fetchHistory = async () => {

    try {

      const config = getAuthHeader();

      if (!config) return;

      const response = await axios.get(

        `${API_BASE_URL}/history`,

        config
      );

      setHistory(response.data);

    }

    catch (error) {

      console.log(error);

    }
  };


  const fetchProfile = async () => {

    try {

      const config = getAuthHeader();

      if (!config) return;

      const response = await axios.get(

        `${API_BASE_URL}/profile`,

        config
      );

      setProfile(response.data);

    }

    catch (error) {

      console.log(error);

    }
  };


  const downloadReport = async () => {

    try {

      const config = getAuthHeader();

      if (!config) return;

      const response = await axios.post(

        `${API_BASE_URL}/download-report`,

        {

          user_email: profile?.email,

          username: profile?.username || "User",

          wellness_score: latest?.wellness_score,

          risk: latest?.risk,

          insights: insights,

          recommendations: latest?.recommendations || [],

          analytics: analytics,

          history: history
        },

        {

          ...config,

          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Mitram_AI_Report.pdf"
      );

      document.body.appendChild(link);

      link.click();

    }

    catch (error) {

      console.log(error);

    }
  };


  const getMentalStatus = () => {

    if (!latest) return null;

    if (latest.risk === "High") {

      return {

        text: "Needs Immediate Attention",

        color: "text-red-400",

        bg: "bg-red-500/10",

        border: "border-red-500/30",

        icon: "⚠️"
      };
    }

    if (latest.risk === "Moderate") {

      return {

        text: "Moderate Stress Detected",

        color: "text-yellow-400",

        bg: "bg-yellow-500/10",

        border: "border-yellow-500/30",

        icon: "🟡"
      };
    }

    return {

      text: "Mentally Stable",

      color: "text-green-400",

      bg: "bg-green-500/10",

      border: "border-green-500/30",

      icon: "🟢"
    };
  };


  const mentalStatus = getMentalStatus();

  const stabilityIndex = latest

    ? Math.min(

        100,

        Math.round(

          (latest.wellness_score * 0.8) +

          (analytics?.average_score || 0) * 0.2

        )

      )

    : 0;

  return (

    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>


      {/* Grid Background */}

      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      </div>


      <div className="relative z-10 p-6 lg:p-8">

        {/* Header */}

        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-8 mb-12">

          <div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-6">

              <span className="animate-pulse">
                ●
              </span>

              AI Wellness Monitoring Dashboard

            </div>


            <h1 className="text-4xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Mitram AI Dashboard

            </h1>


            <p className="text-slate-400 text-lg mt-4 max-w-3xl">

              Real-time emotional intelligence, wellness tracking,
              behavioral analysis, and AI-powered mental health insights.

            </p>

          </div>


          {/* Action Buttons */}

<div className="flex flex-wrap items-center gap-4">

  {/* Profile Dropdown */}

  {
    profile && (

      <div className="relative">

        <button
          onClick={() =>
            setShowProfileMenu(!showProfileMenu)
          }
          className="h-16 px-5 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl flex items-center gap-4 hover:border-cyan-500 transition-all duration-300 shadow-xl"
        >

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">

            <User size={22} />

          </div>

          <div className="text-left">

            <p className="text-slate-500 text-xs">
              Logged in as
            </p>

            <h3 className="text-cyan-400 font-bold">
              {profile.username}
            </h3>

          </div>

          <ChevronDown
            size={20}
            className="text-slate-400"
          />

        </button>


        {
          showProfileMenu && (

            <div className="absolute right-0 mt-4 w-[320px] bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl z-50">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">

                  <User size={28} />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-white">

                    {profile.username}

                  </h3>

                  <p className="text-slate-400 text-sm break-all">

                    {profile.email}

                  </p>

                </div>

              </div>


              <button
                onClick={() => {

                  localStorage.removeItem("token");

                  navigate("/login");

                }}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 hover:scale-[1.02] transition-all duration-300 font-bold flex items-center justify-center gap-3"
              >

                <LogOut size={20} />

                Logout

              </button>

            </div>
          )
        }

      </div>
    )
  }


   <button
    onClick={downloadReport}
    className="h-16 px-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-all duration-300 font-bold shadow-2xl shadow-green-500/20"
  >

    Download Report

  </button>


  <Link
    to="/chatbot"
    className="h-16 px-7 flex items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 font-bold shadow-2xl shadow-cyan-500/20"
  >

    AI Chat

  </Link>


  <Link
    to="/assessment"
    className="h-16 px-7 flex items-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition-all duration-300 font-bold shadow-2xl shadow-blue-500/20"
  >

    Start Assessment

  </Link>
</div>
</div>
        {/* Latest Assessment */}

        {
          latest && (

            <div className="bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-8 mb-10 border border-slate-800 shadow-2xl">

              <div className="flex items-center justify-between flex-wrap gap-6 mb-10">

                <div>

                  <h2 className="text-4xl font-black text-green-400 mb-3">

                    Latest Assessment

                  </h2>

                  <p className="text-slate-400 text-lg">

                    AI generated emotional wellness evaluation

                  </p>

                </div>


                <div className="w-20 h-20 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-5xl">

                  📈

                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300">

                  <p className="text-slate-400 mb-4 text-lg">

                    Wellness Score

                  </p>

                  <h3 className="text-7xl font-black text-cyan-400">

                    {latest.wellness_score}

                  </h3>

                </div>


                <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700 hover:border-yellow-500 transition-all duration-300">

                  <p className="text-slate-400 mb-4 text-lg">

                    Risk Level

                  </p>

                  <h3 className={`text-6xl font-black ${

                    latest.risk === "High"

                      ? "text-red-400"

                      : latest.risk === "Moderate"

                      ? "text-yellow-400"

                      : "text-green-400"

                  }`}>

                    {latest.risk}

                  </h3>

                </div>

              </div>

            </div>
          )
        }

        {/* Mental Stability Index */}

{
  latest && (

    <div className="bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-8 mb-10 border border-slate-800 shadow-2xl">

      <div className="flex flex-col lg:flex-row items-center gap-10">

        <div className="w-[220px] h-[220px]">

          <CircularProgressbar

            value={stabilityIndex}

            text={`${stabilityIndex}%`}

            styles={buildStyles({

              textColor: "#22d3ee",

              pathColor:
                latest.risk === "High"
                  ? "#ef4444"
                  : latest.risk === "Moderate"
                  ? "#facc15"
                  : "#22c55e",

              trailColor: "#1e293b",

              textSize: "16px"
            })}
          />

        </div>


        <div className="flex-1">

          <h2 className="text-4xl font-black text-cyan-400 mb-6">

            Mental Stability Index

          </h2>

          <p className="text-slate-300 text-lg leading-9">

            AI-generated mental stability analysis based on emotional wellness,
            behavioral consistency, stress patterns, and historical assessment trends.

          </p>

        </div>

      </div>

    </div>
  )
}
        {/* Mental Status */}

        {
          mentalStatus && (

            <div className={`rounded-[32px] p-8 mb-10 border backdrop-blur-2xl ${mentalStatus.bg} ${mentalStatus.border}`}>

              <div className="flex items-center gap-5 mb-6">

                <div className="w-20 h-20 rounded-3xl bg-slate-900/50 flex items-center justify-center text-5xl">

                  {mentalStatus.icon}

                </div>


                <div>

                  <h2 className="text-3xl font-black">

                    Mental Health Status

                  </h2>

                  <h3 className={`text-4xl font-black mt-2 ${mentalStatus.color}`}>

                    {mentalStatus.text}

                  </h3>

                </div>

              </div>


              <p className="text-slate-300 text-lg leading-9">

                This status is generated based on the latest wellness assessment,
                emotional analytics, behavioral monitoring, and AI wellness analysis.

              </p>

            </div>
          )
        }

       
        {/* Analytics */}

        {
          analytics && (

            <div className="bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-8 border border-slate-800 shadow-2xl">

              <div className="flex items-center justify-between flex-wrap gap-5 mb-10">

                <div>

                  <h2 className="text-4xl font-black text-yellow-400 mb-3">

                    Wellness Analytics

                  </h2>

                  <p className="text-slate-400 text-lg">

                    AI powered wellness intelligence and assessment trends

                  </p>

                </div>


                <div className="w-20 h-20 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-5xl">

                  📊

                </div>

              </div>


              {/* Stats */}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 hover:border-cyan-500 transition-all duration-300">

                  <p className="text-slate-400 mb-3">

                    Average Score

                  </p>

                  <h3 className="text-6xl font-black text-cyan-400">

                    {analytics.average_score}

                  </h3>

                </div>


                <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 hover:border-blue-500 transition-all duration-300">

                  <p className="text-slate-400 mb-3">

                    Total Assessments

                  </p>

                  <h3 className="text-6xl font-black text-blue-400">

                    {analytics.total_assessments}

                  </h3>

                </div>


                <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 hover:border-red-500 transition-all duration-300">

                  <p className="text-slate-400 mb-3">

                    High Risk Cases

                  </p>

                  <h3 className="text-6xl font-black text-red-400">

                    {analytics.high_risk_count}

                  </h3>

                </div>


                <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 hover:border-green-500 transition-all duration-300">

                  <p className="text-slate-400 mb-3">

                    Low Risk Cases

                  </p>

                  <h3 className="text-6xl font-black text-green-400">

                    {analytics.low_risk_count}

                  </h3>

                </div>

              </div>


              {/* Chart */}

              <div className="bg-slate-800/40 rounded-[32px] border border-slate-700 p-4 overflow-hidden">

                <AnalyticsChart analytics={analytics} />

              </div>


              {/* Insights */}

              <div className="mt-10 bg-slate-800/70 backdrop-blur-xl rounded-[32px] p-8 border border-slate-700">

                <div className="flex items-center gap-4 mb-8">

                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-4xl">

                    🧠

                  </div>


                  <div>

                    <h2 className="text-3xl font-black text-cyan-400">

                      AI Wellness Insights

                    </h2>

                    <p className="text-slate-400 mt-1">

                      Personalized emotional intelligence analysis

                    </p>

                  </div>

                </div>


                <div className="space-y-5">

                  {
                    insights.map((item, index) => (

                      <div
                        key={index}
                        className="flex gap-5 items-start bg-slate-900/60 rounded-2xl p-5 border border-slate-700"
                      >

                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl">

                          ✨

                        </div>


                        <p className="text-slate-300 text-lg leading-8">

                          {item}

                        </p>

                      </div>
                    ))
                  }

                </div>

              </div>

            </div>
          )
        }


        {/* Timeline */}

        {
          history.length > 0 && (

            <div className="bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-8 mt-10 border border-slate-800 shadow-2xl">

              <div className="flex items-center gap-5 mb-10">

                <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-5xl">

                  ⏳

                </div>


                <div>

                  <h2 className="text-4xl font-black text-cyan-400">

                    Wellness Timeline

                  </h2>

                  <p className="text-slate-400 text-lg mt-2">

                    Historical wellness assessment progression

                  </p>

                </div>

              </div>


              <div className="space-y-5">

                {
                  history.map((item, index) => (

                    <div
                      key={index}
                      className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6"
                    >

                      <div>

                        <p className="text-slate-500 mb-2">

                          Assessment #{index + 1}

                        </p>

                        <h3 className="text-4xl font-black text-cyan-400">

                          Score: {item.wellness_score}

                        </h3>

                      </div>


                      <div className="md:text-right">

                        <h3 className={`text-3xl font-black ${

                          item.risk === "High"

                            ? "text-red-400"

                            : item.risk === "Moderate"

                            ? "text-yellow-400"

                            : "text-green-400"

                        }`}>

                          {item.risk}

                        </h3>


                        <p className="text-slate-500 mt-2">

                          {item.created_at}

                        </p>

                      </div>

                    </div>
                  ))
                }

              </div>

            </div>
          )
        }

      </div>
    {/* Model Accuracy Footer */}

<div className="mt-10 text-center border-t border-slate-800 pt-8 pb-2">

  <h3 className="text-cyan-400 text-2xl font-black mb-3">

    AI Model Accuracy: 81.25%

  </h3>

  <p className="text-slate-500 text-lg">

    Mental wellness prediction powered by Random Forest Machine Learning model

  </p>
  
   </div>

 </div>

  );
}