import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";

export default function Loader() {
  const { topic, loadingType } = useQuiz();

  const isSubmit = loadingType === "submit";

  const title = isSubmit
    ? "Checking your answers…"
    : `Crafting your ${topic} quiz…`;

  const subtitle = isSubmit
    ? "Calculating your score and asking Gemini to generate personalised feedback."
    : "Talking to Gemini and building questions tailored to you.";

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-600 ${
          isSubmit ? "border-t-emerald-400" : "border-t-indigo-400"
        }`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="text-lg font-medium text-slate-50"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.p>
      <p className="text-xs text-slate-400 mt-2 text-center max-w-md">
        {subtitle}
      </p>
    </div>
  );
}
