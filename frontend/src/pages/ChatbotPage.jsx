import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

export default function ChatbotPage() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text:
        "Hello 👋 I am Mitram AI. How are you feeling today?"
    }
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);


  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);


  const sendMessage = async () => {

    if (message.trim() === "") return;

    const currentMessage = message;

    const userMessage = {
      role: "user",
      text: currentMessage
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setMessage("");

    setLoading(true);

    try {

      const response = await axios.post(
        `${API_BASE_URL}/chat`,
        {
          message: currentMessage
        }
      );

      const botMessage = {
        role: "bot",
        text: response.data.reply
      };

      setMessages((prev) => [
        ...prev,
        botMessage
      ]);

    }

    catch (error) {

      console.log(error);

      const botMessage = {
        role: "bot",
        text:
          "⚠️ AI assistant is temporarily unavailable. Please try again later."
      };

      setMessages((prev) => [
        ...prev,
        botMessage
      ]);

    }

    setLoading(false);

  };


  const handleKeyPress = (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }
  };


  return (

    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>


      {/* Grid Background */}

      <div className="absolute inset-0 opacity-[0.03]">

        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      </div>


      <div className="relative z-10 p-6 lg:p-8">

        {/* Header */}

        <div className="mb-8 flex flex-col lg:flex-row justify-between lg:items-center gap-6">

          <div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-5">

              <span className="animate-pulse">
                ●
              </span>

              AI Mental Wellness Assistant

            </div>


            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Mitram AI Assistant

            </h1>


            <p className="text-slate-400 text-lg mt-4 max-w-3xl leading-8">

              Talk with Mitram AI about stress, wellness, emotional balance,
              motivation, burnout, productivity, and mental health guidance.

            </p>

          </div>


          {/* Status */}

          <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl px-6 py-5 shadow-2xl">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-3xl">

                🤖

              </div>


              <div>

                <h3 className="text-cyan-400 font-bold text-xl">

                  AI Assistant

                </h3>

                <p className="text-green-400 text-sm">

                  Online

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Chat Container */}

        <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-[32px] shadow-2xl overflow-hidden">

          {/* Top Bar */}

          <div className="border-b border-slate-800 px-8 py-5 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-xl">

                🧠

              </div>


              <div>

                <h2 className="text-2xl font-black text-cyan-400">

                  Wellness Chat

                </h2>

                <p className="text-slate-500">

                  AI powered emotional support

                </p>

              </div>

            </div>


            <div className="hidden md:flex items-center gap-3 text-green-400">

              <span className="animate-pulse text-xl">
                ●
              </span>

              Active

            </div>

          </div>


          {/* Messages */}

          <div className="h-[65vh] overflow-y-auto p-6 lg:p-8 space-y-6">

            {
              messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[90%] lg:max-w-[70%] rounded-[28px] px-6 py-5 shadow-xl border ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400/20"
                        : "bg-slate-800/90 border-slate-700"
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      {
                        msg.role === "bot" && (

                          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl flex-shrink-0">

                            🤖

                          </div>
                        )
                      }


                      <div className="flex-1">

                        <p className={`text-sm mb-2 font-semibold ${
                          msg.role === "user"
                            ? "text-cyan-100"
                            : "text-cyan-400"
                        }`}>

                          {
                            msg.role === "user"
                              ? "You"
                              : "Mitram AI"
                          }

                        </p>


                        <p className="text-lg leading-9 whitespace-pre-wrap text-slate-100 break-words">

                          {msg.text}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))
            }


            {/* Typing */}

            {
              loading && (

                <div className="flex justify-start">

                  <div className="bg-slate-800/90 border border-slate-700 rounded-[28px] px-6 py-5 shadow-xl">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">

                        🤖

                      </div>


                      <div>

                        <p className="text-cyan-400 font-semibold mb-2">

                          Mitram AI

                        </p>

                        <p className="animate-pulse text-slate-300">

                          Typing response...

                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              )
            }


            <div ref={messagesEndRef}></div>

          </div>


          {/* Input */}

          <div className="border-t border-slate-800 p-5 lg:p-6 bg-slate-900/80">

            <div className="flex flex-col md:flex-row gap-4">

              <input
                type="text"
                placeholder="Talk with Mitram AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-slate-800/80 border border-slate-700 rounded-3xl px-6 py-5 outline-none text-lg focus:border-cyan-400 transition-all duration-300"
              />


              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-10 py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 text-lg font-bold shadow-2xl shadow-cyan-500/20 disabled:opacity-50"
              >

                {
                  loading
                    ? "Sending..."
                    : "Send"
                }

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}