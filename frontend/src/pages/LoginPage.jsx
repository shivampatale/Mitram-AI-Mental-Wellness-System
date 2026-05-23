import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  const login = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
          email: email,
          password: password
        }
      );

      if (response.data.access_token) {

        localStorage.setItem(
          "token",
          response.data.access_token
        );

        localStorage.setItem(
          "email",
          email
        );

        navigate("/dashboard");

      }

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setMessage("Invalid Credentials");

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-6 py-10">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>


      {/* Grid Background */}

      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      </div>


      {/* Login Card */}

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center p-14 border-r border-slate-800 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>

          <div className="relative z-10">

            <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-6xl shadow-2xl shadow-cyan-500/20 mb-10">

              🧠

            </div>


            <h1 className="text-6xl font-black leading-tight mb-8">

              Welcome Back to

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}Mitram AI
              </span>

            </h1>


            <p className="text-slate-400 text-xl leading-10 max-w-xl">

              Continue your AI-powered mental wellness journey with emotional
              analytics, burnout detection, intelligent recommendations,
              and wellness tracking.

            </p>


            {/* Features */}

            <div className="space-y-6 mt-12">

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">

                  📊

                </div>

                <div>

                  <h3 className="text-xl font-bold text-cyan-400">

                    Emotional Analytics

                  </h3>

                  <p className="text-slate-500">

                    AI based emotional wellness monitoring

                  </p>

                </div>

              </div>


              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">

                  🔥

                </div>

                <div>

                  <h3 className="text-xl font-bold text-red-400">

                    Burnout Detection

                  </h3>

                  <p className="text-slate-500">

                    Detect emotional stress and overload

                  </p>

                </div>

              </div>


              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-2xl">

                  🤖

                </div>

                <div>

                  <h3 className="text-xl font-bold text-yellow-400">

                    AI Recommendations

                  </h3>

                  <p className="text-slate-500">

                    Personalized wellness improvement guidance

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Right Side */}

        <div className="p-8 lg:p-14 flex items-center justify-center">

          <form
            onSubmit={login}
            className="w-full max-w-md"
          >

            <div className="mb-10">

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-6">

                <span className="animate-pulse">
                  ●
                </span>

                Secure AI Wellness Access

              </div>


              <h1 className="text-5xl font-black mb-5 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                Login

              </h1>


              <p className="text-slate-400 text-lg leading-8">

                Sign in to access your wellness analytics dashboard,
                assessments, AI recommendations, and emotional insights.

              </p>

            </div>


            {/* Email */}

            <div className="mb-6">

              <label className="block text-slate-400 mb-3 text-lg">

                Email Address

              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-6 py-5 text-lg outline-none focus:border-cyan-400 transition-all duration-300"
              />

            </div>


            {/* Password */}

            <div className="mb-6">

              <label className="block text-slate-400 mb-3 text-lg">

                Password

              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-6 py-5 text-lg outline-none focus:border-cyan-400 transition-all duration-300"
              />

            </div>


            {/* Error Message */}

            {
              message && (

                <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl px-5 py-4">

                  {message}

                </div>
              )
            }


            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] transition-all duration-300 py-5 text-xl font-black shadow-2xl shadow-cyan-500/20 disabled:opacity-60"
            >

              {
                loading ? (

                  <div className="flex items-center justify-center gap-4">

                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

                    Logging In...

                  </div>

                ) : (

                  "Login"
                )
              }

            </button>


            {/* Signup Link */}

            <p className="text-slate-400 text-center mt-8 text-lg">

              Don’t have an account?

              <Link
                to="/signup"
                className="text-cyan-400 ml-3 hover:text-cyan-300 font-bold transition-all duration-300"
              >

                Signup

              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}