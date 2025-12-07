import { useQuiz } from "../context/QuizContext";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { submitQuiz } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";

export default function QuizLayout() {
  const {
    topic,
    questions,
    currentIndex,
    answers,
    goNext,
    goPrev,
    answerCurrent,
    setResult,
    setScreen,
    setLoadingType,
  } = useQuiz();

  const total = questions.length;
  const isLast = currentIndex === total - 1;

  if (!questions.length) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate-300 text-sm">Preparing your quiz…</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      setLoadingType("submit");
      setScreen("loading");
      const res = await submitQuiz(topic, questions, answers);
      setResult(res.score, res.feedback);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz. Please try again.");
      setScreen("quiz");
      setLoadingType(null);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-start justify-center pt-4">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header className="mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 mb-1">
            LIVE QUIZ
          </p>
          <h1 className="text-2xl font-semibold text-slate-50">{topic}</h1>
        </header>

        <ProgressBar current={currentIndex} total={total} />

        <div className="relative mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
            >
              <QuestionCard
                question={questions[currentIndex]}
                selectedIndex={answers[currentIndex] ?? -1}
                onSelect={answerCurrent}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-6 gap-3">
          <Button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-md"
          >
            Previous
          </Button>

          <Button
            onClick={isLast ? handleSubmit : goNext}
            asChild
            className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-md"
          >
            <motion.button whileTap={{ scale: 0.97 }}>
              {isLast ? "Finish Quiz" : "Next"}
            </motion.button>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
