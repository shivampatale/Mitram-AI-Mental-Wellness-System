import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";

export default function AnalyticsChart({ analytics }) {

  const wellnessData = [

    {
      name: "Average",
      score: analytics?.average_score || 0
    },

    {
      name: "Assessments",
      score: analytics?.total_assessments || 0
    }

  ];


  const riskData = [

    {
      level: "Low",
      value: analytics?.low_risk_count || 0
    },

    {
      level: "Moderate",
      value: analytics?.moderate_risk_count || 0
    },

    {
      level: "High",
      value: analytics?.high_risk_count || 0
    }

  ];


  const trendData = analytics?.history || [];


  const CustomTooltip = ({ active, payload, label }) => {

    if (active && payload && payload.length) {

      return (

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl">

          <p className="text-slate-300 mb-2">
            {label}
          </p>

          <p className="text-cyan-400 font-bold text-lg">
            Score: {payload[0].value}
          </p>

        </div>
      );
    }

    return null;
  };


  return (

    <div className="mt-10 space-y-10">

      {/* Top Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Wellness Analytics */}

        <div className="bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-8 border border-slate-800 shadow-2xl hover:border-cyan-500/30 transition-all duration-500">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-3xl font-black text-cyan-400 mb-2">

                Wellness Analytics

              </h2>

              <p className="text-slate-500">

                Emotional wellness performance overview

              </p>

            </div>


            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-4xl">

              📈

            </div>

          </div>


          <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={wellnessData}>

                <defs>

                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">

                    <stop
                      offset="5%"
                      stopColor="#22d3ee"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#22d3ee"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>


                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#22d3ee"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Risk Distribution */}

        <div className="bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-8 border border-slate-800 shadow-2xl hover:border-red-500/30 transition-all duration-500">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-3xl font-black text-red-400 mb-2">

                Risk Distribution

              </h2>

              <p className="text-slate-500">

                Emotional risk level distribution

              </p>

            </div>


            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-4xl">

              🚨

            </div>

          </div>


          <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={riskData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="level"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="value"
                  fill="#f87171"
                  radius={[12, 12, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* Wellness Trend */}

      <div className="bg-slate-900/70 backdrop-blur-2xl rounded-[32px] p-8 border border-slate-800 shadow-2xl hover:border-cyan-500/30 transition-all duration-500">

        <div className="flex items-center justify-between flex-wrap gap-5 mb-10">

          <div>

            <h2 className="text-4xl font-black text-cyan-400 mb-3">

              Wellness Trend Timeline

            </h2>

            <p className="text-slate-500 text-lg">

              Emotional wellness progression over time

            </p>

          </div>


          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-5xl">

            📊

          </div>

        </div>


        {
          trendData.length > 0 ? (

            <div className="w-full h-[420px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={trendData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                  />

                  <XAxis
                    dataKey="created_at"
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    stroke="#94a3b8"
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="wellness_score"
                    stroke="#22d3ee"
                    strokeWidth={5}
                    dot={{
                      r: 6,
                      fill: "#22d3ee"
                    }}
                    activeDot={{
                      r: 10
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          ) : (

            <div className="h-[350px] flex flex-col items-center justify-center text-center">

              <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-5xl mb-6">

                📉

              </div>

              <h3 className="text-3xl font-black text-slate-300 mb-4">

                No Trend Data Available

              </h3>

              <p className="text-slate-500 text-lg max-w-2xl leading-8">

                Complete multiple wellness assessments to generate
                emotional wellness progression analytics and AI trends.

              </p>

            </div>

          )
        }

      </div>

    </div>
  );
}