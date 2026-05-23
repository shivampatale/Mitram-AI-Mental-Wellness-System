import { Link } from "react-router-dom";

export default function LandingPage() {

  const features = [

    {
      icon:"🧠",
      title:"Emotional Analytics",
      color:"text-cyan-400",
      border:"hover:border-cyan-500 hover:shadow-cyan-500/20",
      desc:"AI-driven emotional analysis using intelligent behavioral assessment."
    },

    {
      icon:"🔥",
      title:"Burnout Detection",
      color:"text-red-400",
      border:"hover:border-red-500 hover:shadow-red-500/20",
      desc:"Identify stress overload and burnout indicators before escalation."
    },

    {
      icon:"📊",
      title:"Wellness Tracking",
      color:"text-green-400",
      border:"hover:border-green-500 hover:shadow-green-500/20",
      desc:"Track wellness progression and emotional trends over time."
    },

    {
      icon:"🤖",
      title:"AI Recommendations",
      color:"text-yellow-400",
      border:"hover:border-yellow-500 hover:shadow-yellow-500/20",
      desc:"Receive intelligent personalized mental wellness guidance."
    }

  ];


  return (

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">

      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full"></div>


      {/* Grid Background */}

      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      </div>


      {/* Navbar */}

      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/70 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-2xl shadow-cyan-500/30 animate-pulse">

              🧠

            </div>


            <div>

              <h1 className="text-3xl font-black tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                Mitram AI

              </h1>

              <p className="text-slate-500 text-sm">

                Mental Wellness Intelligence

              </p>

            </div>

          </div>


          <div className="flex gap-3">

            <Link
              to="/login"
              className="px-5 lg:px-6 py-3 rounded-2xl border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 text-base lg:text-lg"
            >

              Login

            </Link>


            <Link
              to="/signup"
              className="px-5 lg:px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 text-base lg:text-lg font-bold shadow-2xl shadow-cyan-500/20"
            >

              Get Started

            </Link>

          </div>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-10 backdrop-blur-xl shadow-lg shadow-cyan-500/10">

            <span className="animate-ping text-xl">
              ●
            </span>

            AI Powered Emotional Intelligence Platform

          </div>


          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-10">

            Transforming

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              {" "}Mental Wellness{" "}
            </span>

            Through AI

          </h1>


          <p className="text-slate-300 text-lg lg:text-xl leading-9 lg:leading-10 mb-12 max-w-3xl">

            Mitram AI combines artificial intelligence, emotional analytics,
            behavioral assessment, and wellness intelligence to detect stress,
            monitor emotional health, predict burnout patterns, and generate
            intelligent mental wellness recommendations.

          </p>


          <div className="flex flex-wrap gap-5">

            <Link
              to="/signup"
              className="px-8 lg:px-10 py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 hover:shadow-cyan-500/30 transition-all duration-300 text-lg lg:text-xl font-bold shadow-2xl"
            >

              Start Your Journey

            </Link>


            <Link
              to="/login"
              className="px-8 lg:px-10 py-5 rounded-3xl border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 text-lg lg:text-xl font-semibold backdrop-blur-xl"
            >

              Explore Platform

            </Link>

          </div>


          {/* Stats */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 text-center hover:border-cyan-500 transition-all duration-300">

              <h3 className="text-4xl font-black text-cyan-400 mb-2">
                95%
              </h3>

              <p className="text-slate-400 text-sm lg:text-base">
                Emotional Analysis Accuracy
              </p>

            </div>


            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 text-center hover:border-green-500 transition-all duration-300">

              <h3 className="text-4xl font-black text-green-400 mb-2">
                AI
              </h3>

              <p className="text-slate-400 text-sm lg:text-base">
                Powered Intelligence
              </p>

            </div>


            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 text-center hover:border-yellow-500 transition-all duration-300">

              <h3 className="text-4xl font-black text-yellow-400 mb-2">
                24/7
              </h3>

              <p className="text-slate-400 text-sm lg:text-base">
                Wellness Monitoring
              </p>

            </div>

          </div>

        </div>


        {/* Right Visual */}

        <div className="relative">

          <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full"></div>

          <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-[40px] p-6 lg:p-10 shadow-2xl hover:scale-[1.01] transition-all duration-500">

            <div className="flex items-center justify-between mb-10">

              <div>

                <h2 className="text-2xl lg:text-3xl font-black text-cyan-400">

                  AI Wellness Dashboard

                </h2>

                <p className="text-slate-500 mt-2 text-sm lg:text-base">

                  Real-time emotional analytics

                </p>

              </div>


              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-xl animate-bounce">

                🤖

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 hover:scale-105 transition-all duration-300">

                <p className="text-slate-400 mb-3 text-lg">

                  Wellness Score

                </p>

                <h3 className="text-6xl font-black text-cyan-400">

                  84

                </h3>

              </div>


              <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 hover:scale-105 transition-all duration-300">

                <p className="text-slate-400 mb-3 text-lg">

                  Risk Level

                </p>

                <h3 className="text-5xl font-black text-green-400">

                  Low

                </h3>

              </div>


              <div className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700 sm:col-span-2">

                <div className="flex items-center gap-4 mb-6">

                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-2xl">

                    🧠

                  </div>

                  <h3 className="text-2xl font-black text-cyan-400">

                    AI Insights

                  </h3>

                </div>


                <div className="space-y-5 text-slate-300 text-base lg:text-lg leading-8">

                  <div className="flex gap-4">
                    <span className="text-cyan-400">●</span>
                    Emotional stability improving steadily
                  </div>

                  <div className="flex gap-4">
                    <span className="text-green-400">●</span>
                    Stress indicators remain under control
                  </div>

                  <div className="flex gap-4">
                    <span className="text-yellow-400">●</span>
                    Sleep consistency positively impacting wellness
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative z-10">

        <div className="text-center mb-24">

          <h2 className="text-5xl lg:text-6xl font-black mb-8">

            Advanced AI Wellness

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Features
            </span>

          </h2>

          <p className="text-slate-400 text-lg lg:text-2xl max-w-4xl mx-auto leading-9 lg:leading-10">

            Mitram AI combines emotional intelligence, behavioral analysis,
            wellness monitoring, and AI-powered recommendation systems
            into a single integrated platform.

          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {
            features.map((item,index)=>(

              <div
                key={index}
                className={`bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden ${item.border}`}
              >

                <div className="text-6xl mb-6">
                  {item.icon}
                </div>

                <h3 className={`text-2xl lg:text-3xl font-black mb-5 leading-tight break-words ${item.color}`}>

                  {item.title}

                </h3>

                <p className="text-slate-400 leading-8 lg:leading-9 text-base lg:text-lg">

                  {item.desc}

                </p>

              </div>
            ))
          }

        </div>

      </section>


      {/* CTA Section */}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28 relative z-10">

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[40px] p-10 lg:p-16 text-center backdrop-blur-2xl">

          <h2 className="text-4xl lg:text-6xl font-black mb-8">

            Start Your Mental Wellness

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Journey Today
            </span>

          </h2>

          <p className="text-slate-300 text-lg lg:text-2xl max-w-4xl mx-auto leading-9 lg:leading-10 mb-12">

            Experience AI-powered emotional intelligence, wellness tracking,
            burnout detection, and intelligent recommendations with Mitram AI.

          </p>


          <Link
            to="/signup"
            className="inline-flex items-center gap-4 px-10 py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 text-xl font-black shadow-2xl shadow-cyan-500/30"
          >

            Get Started Now →

          </Link>

        </div>

      </section>


      {/* Footer */}

      <footer className="border-t border-slate-800 py-10 text-center text-slate-500 text-lg relative z-10">

        © 2026 Mitram AI — AI Powered Mental Wellness Intelligence Platform

      </footer>

    </div>
  );
}