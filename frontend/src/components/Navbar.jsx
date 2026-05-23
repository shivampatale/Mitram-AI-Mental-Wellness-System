import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();


  const navLinks = [

    {
      name: "Dashboard",
      path: "/dashboard"
    },

    {
      name: "Assessment",
      path: "/assessment"
    },

    {
      name: "AI Chat",
      path: "/chatbot"
    }

  ];


  return (

    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/70 border-b border-slate-800 shadow-2xl">

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo */}

        <div
          onClick={()=>navigate("/dashboard")}
          className="flex items-center gap-4 cursor-pointer group"
        >

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-2xl shadow-cyan-500/20 group-hover:scale-110 transition-all duration-300">

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


        {/* Navigation Links */}

        <div className="hidden md:flex items-center gap-4">

          {
            navLinks.map((item,index)=>(

              <Link
                key={index}
                to={item.path}
                className={`px-6 py-3 rounded-2xl text-lg font-semibold transition-all duration-300 border

                ${
                  location.pathname === item.path

                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-500/20"

                  : "border-transparent text-slate-300 hover:text-cyan-400 hover:bg-slate-800/70"
                }
                `}
              >

                {item.name}

              </Link>
            ))
          }

        </div>


        {/* Right Section */}

        <div className="flex items-center gap-4">

          <div className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

            <p className="text-slate-300 font-medium">
              AI Active
            </p>

          </div>


          <button
            onClick={()=>{
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 transition-all duration-300 text-lg font-bold shadow-xl shadow-red-500/20"
          >

            Logout

          </button>

        </div>

      </div>

    </nav>
  );
}