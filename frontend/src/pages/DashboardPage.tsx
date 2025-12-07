import { motion } from "framer-motion";
import HistoryPanel from "../components/HistoryPanel";
import AnalyticsPanel from "../components/AnalyticsPanel";
import { Button } from "../components/ui/button";

interface Props {
  onStartQuiz?: () => void; // optional callback to jump to quiz
}

export default function DashboardPage({ onStartQuiz }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6 flex justify-center">
      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">
              Dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-50">
              Your learning analytics
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your progress across topics, see trends over time, and plan
              your next quiz.
            </p>
          </div>

          {onStartQuiz && (
            <Button
              className="
                bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
                hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400
                text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30
              "
              onClick={onStartQuiz}
            >
              Start a new quiz
            </Button>
          )}
        </header>

        {/* Content layout */}
        <div className="space-y-6">
          {/* Analytics charts */}
          <section>
            <AnalyticsPanel />
          </section>

          {/* Recent history */}
          <section>
            <h2 className="text-sm font-semibold text-slate-200 mb-2">
              Recent activity
            </h2>
            <HistoryPanel />
          </section>
        </div>
      </motion.div>
    </div>
  );
}
