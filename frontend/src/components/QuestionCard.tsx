import type { Question } from "../services/api";
import { Button } from "../components/ui/button";

interface Props {
  question: Question;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function QuestionCard({
  question,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="text-sm text-slate-400 uppercase tracking-wide">
        Question
      </div>
      <h2 className="text-lg font-semibold text-slate-50">
        {question.question}
      </h2>

      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === question.correctIndex;
          const isAnswered = selectedIndex !== -1; // user already chose

          // Determine color
          let style = "";
          if (isAnswered) {
            if (isCorrect)
              style = "bg-emerald-600/80 text-white border-emerald-500";
            else if (isSelected)
              style = "bg-rose-600/80 text-white border-rose-500";
            else style = "bg-slate-800/40 border-slate-700 text-slate-300";
          } else {
            style =
              "bg-slate-800/50 text-slate-200 hover:bg-slate-800 border-slate-700";
          }

          return (
            <Button
              key={idx}
              type="button"
              disabled={isAnswered} // disable further selection after choosing
              className={`w-full justify-start text-left transition-all transform hover:scale-[1.01] active:scale-[0.97]
 ${style}`}
              onClick={() => onSelect(idx)}
            >
              <span
                className={`mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs
            ${
              isAnswered
                ? isCorrect
                  ? "bg-emerald-500 text-white border-emerald-400"
                  : isSelected
                  ? "bg-rose-500 text-white border-rose-400"
                  : "border-slate-600 text-slate-300"
                : isSelected
                ? "bg-indigo-500 text-white border-indigo-400"
                : "border-slate-600 text-slate-300"
            }`}
              >
                {String.fromCharCode(65 + idx)}
              </span>

              <span className="text-sm">{opt}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
