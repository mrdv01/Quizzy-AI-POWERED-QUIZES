import { useEffect, useMemo, useState } from "react";
import { fetchHistory } from "../services/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface HistoryItem {
  _id: string;
  topic: string;
  score: number;
  createdAt: string;
}

export default function AnalyticsPanel() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch {
        setError("Could not load analytics");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = history.length;

  const { avgScore, bestScore, lastScore, topicStats, scoreTrend } =
    useMemo(() => {
      if (!history.length) {
        return {
          avgScore: 0,
          bestScore: 0,
          lastScore: 0,
          topicStats: [] as {
            topic: string;
            avgScore: number;
            attempts: number;
          }[],
          scoreTrend: [] as { index: number; score: number; label: string }[],
        };
      }

      const scores = history.map((h) => h.score);
      const bestScore = Math.max(...scores);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const lastScore = history[0].score;

      const topicMap = new Map<string, { totalScore: number; count: number }>();

      history.forEach((h) => {
        if (!topicMap.has(h.topic)) {
          topicMap.set(h.topic, { totalScore: h.score, count: 1 });
        } else {
          const t = topicMap.get(h.topic)!;
          t.totalScore += h.score;
          t.count += 1;
        }
      });

      const topicStats = Array.from(topicMap.entries()).map(
        ([topic, { totalScore, count }]) => ({
          topic,
          avgScore: totalScore / count,
          attempts: count,
        })
      );

      const scoreTrend = [...history].reverse().map((h, idx) => ({
        index: idx + 1,
        score: h.score,
        label: new Date(h.createdAt).toLocaleDateString(),
      }));

      return { avgScore, bestScore, lastScore, topicStats, scoreTrend };
    }, [history]);

  if (loading) {
    return <p className="text-xs text-slate-400 mt-4">Loading analytics…</p>;
  }

  if (error) {
    return <p className="text-xs text-red-400 mt-4">{error}</p>;
  }

  if (!total) {
    return (
      <p className="text-xs text-slate-300 mt-4">
        Do a few quizzes to unlock your analytics dashboard 📊
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-3">
          <p className="text-[11px] text-slate-400 uppercase tracking-wide">
            Total quizzes
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-50">{total}</p>
        </div>

        <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-3">
          <p className="text-[11px] text-slate-400 uppercase tracking-wide">
            Best score
          </p>
          <p className="mt-1 text-xl font-semibold text-emerald-400">
            {bestScore}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-3">
          <p className="text-[11px] text-slate-400 uppercase tracking-wide">
            Avg score
          </p>
          <p className="mt-1 text-xl font-semibold text-indigo-400">
            {avgScore.toFixed(1)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-3">
          <p className="text-[11px] text-slate-400 uppercase tracking-wide">
            Last quiz
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-50">
            {lastScore}
          </p>
        </div>
      </div>

      {/* Score trend */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">Score trend</h2>
          <span className="text-[11px] text-slate-400">
            Last {scoreTrend.length} attempts
          </span>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="index"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1f2937",
                  borderRadius: 8,
                  fontSize: 11,
                }}
                labelFormatter={(v) => `Attempt ${v}`}
                formatter={(value) => [`Score: ${value}`, ""]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic-wise performance */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Topic performance
          </h2>
          <span className="text-[11px] text-slate-400">
            Average score per topic
          </span>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
              <XAxis
                dataKey="topic"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1f2937",
                  borderRadius: 8,
                  fontSize: 11,
                }}
                formatter={(value, name) =>
                  name === "avgScore"
                    ? [`Avg: ${Number(value).toFixed(1)}`, "Score"]
                    : [`Attempts: ${value}`, "Attempts"]
                }
              />
              <Legend wrapperStyle={{ fontSize: 10, color: "#9ca3af" }} />
              <Bar dataKey="avgScore" name="Avg score" fill="#6366f1" />
              <Bar dataKey="attempts" name="Attempts" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
