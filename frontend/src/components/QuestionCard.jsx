export default function QuestionCard({

  question,
  value,
  onChange

}) {

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        {question}
      </h2>

      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e)=>onChange(Number(e.target.value))}
        className="w-full"
      />

      <div className="flex justify-between text-slate-400 mt-4">

        <span>Low</span>

        <span className="text-blue-400 font-bold">
          {value}
        </span>

        <span>High</span>

      </div>

    </div>
  );
}