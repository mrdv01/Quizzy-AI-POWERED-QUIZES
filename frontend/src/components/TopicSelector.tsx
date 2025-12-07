import { useQuiz } from "../context/QuizContext";
import { generateQuiz } from "../services/api";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const topics = [
  {
    label: "Wellness",
    description: "Habits, sleep, stress & healthy routines.",
  },
  {
    label: "Tech Trends",
    description: "AI, cloud, dev tools & modern stacks.",
  },
  {
    label: "Productivity",
    description: "Deep work, focus, time management.",
  },
  {
    label: "Finance Basics",
    description: "Budgeting, saving, compounding & risk.",
  },
];

export default function TopicSelector() {
  const { setTopicAndStart, setQuestions, setScreen } = useQuiz();

  const handleSelect = async (topic: string) => {
    setTopicAndStart(topic); // sets topic and loading
    try {
      const qs = await generateQuiz(topic);
      setQuestions(qs);
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz. Please try again.");
      setScreen("topic");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6 space-y-2">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-indigo-400"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            START HERE
          </motion.p>
          <motion.h1
            className="text-3xl font-semibold"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            What would you like to get quizzed on today?
          </motion.h1>
          <motion.p
            className="text-sm text-slate-300 max-w-xl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Pick a topic and we’ll generate a personalised set of questions,
            then store your attempts so you can track your progress.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06 },
            },
          }}
        >
          {topics.map((t) => (
            <motion.div
              key={t.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="bg-slate-900/80 border-slate-800/80 p-4 hover:border-indigo-500/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-white tracking-wide">
                      {t.label}
                    </div>
                    <span className="text-[11px] rounded-full border border-slate-700 px-2 py-0.5 text-slate-400">
                      5 questions
                    </span>
                  </div>
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {t.description}
                  </div>
                  <Button
                    size="sm"
                    className="
    mt-2 w-full justify-center 
    font-semibold tracking-wide
    text-white
    bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
    hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400
    shadow-lg shadow-indigo-600/25
    rounded-xl
    transition-all
  "
                    onClick={() => handleSelect(t.label)}
                    asChild
                  >
                    <motion.button whileTap={{ scale: 0.96 }}>
                      Start quiz
                    </motion.button>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
