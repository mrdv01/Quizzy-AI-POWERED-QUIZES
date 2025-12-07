import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import HistoryPanel from "../components/HistoryPanel";

export default function ResultScreen() {
  const { topic, score, feedback, questions, setScreen } = useQuiz();

  if (typeof score !== "number") return null;

  const ratio = score / questions.length;
  const moodColor =
    ratio >= 0.8
      ? "text-emerald-400"
      : ratio >= 0.5
      ? "text-amber-300"
      : "text-rose-400";

  return (
    <div className="min-h-[70vh] flex items-start justify-center pt-4">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card
          className="
          bg-slate-900/90 
          border border-slate-700/70 
          shadow-2xl 
          backdrop-blur-lg 
          text-slate-50
        "
        >
          <CardHeader>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-indigo-300 bg-slate-900/80"
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
            >
              <span>RESULT</span>
            </motion.div>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  Nice work on this quiz! 🎉
                </h1>
                <p className="text-sm text-slate-300">
                  Topic:{" "}
                  <span className="font-medium text-slate-200">{topic}</span>
                </p>
              </div>

              <motion.div
                className="flex items-baseline gap-1"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <span className={`text-5xl font-bold ${moodColor}`}>
                  {score}
                </span>
                <span className="text-slate-400 text-xl">
                  / {questions.length}
                </span>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent>
            <motion.div
              className="text-[15px] text-slate-200 leading-relaxed mb-6 whitespace-pre-line"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {feedback}
            </motion.div>

            {/* primary CTA */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={() => setScreen("topic")}
                className="
                  w-full
                  font-semibold tracking-wide text-white rounded-xl
                  bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
                  hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400
                  shadow-lg shadow-indigo-600/25
                  transition-all
                "
                asChild
              >
                <motion.button whileTap={{ scale: 0.98 }}>
                  Take another quiz
                </motion.button>
              </Button>
            </div>

            {/* history panel */}
            <HistoryPanel />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
