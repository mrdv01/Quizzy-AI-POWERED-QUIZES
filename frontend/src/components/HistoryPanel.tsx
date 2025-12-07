import { useEffect, useState, useMemo } from "react";
import { fetchHistory } from "../services/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface HistoryItem {
  _id: string;
  topic: string;
  score: number;
  createdAt: string;
}

const PAGE_SIZE = 5;

export default function HistoryPanel() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch {
        setError("Could not load history");
      }
    })();
  }, []);

  const totalPages = Math.max(1, Math.ceil(history.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return history.slice(start, start + PAGE_SIZE);
  }, [history, page]);

  // data for chart: oldest to newest
  const chartData = useMemo(
    () =>
      [...history].reverse().map((h, idx) => ({
        index: idx + 1,
        score: h.score,
        label: new Date(h.createdAt).toLocaleTimeString(),
      })),
    [history]
  );

  if (error) {
    return <p className="text-xs text-red-400 mt-2">{error}</p>;
  }

  if (!history.length) {
    return (
      <p className="text-xs text-slate-300 mt-2">
        No previous quizzes yet — finish a few and they’ll show up here 📊
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Chart */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">Score trend</h2>
          <span className="text-[11px] text-slate-400">
            Last {history.length} attempts
          </span>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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

      {/* List with pagination */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Recent quizzes
          </h2>
          <span className="text-[11px] text-slate-400">
            Page {page} of {totalPages}
          </span>
        </div>

        <div className="space-y-1 text-xs">
          {paginated.map((h) => {
            const scoreColor =
              h.score >= 4
                ? "text-emerald-400"
                : h.score >= 2
                ? "text-amber-300"
                : "text-rose-400";

            return (
              <div
                key={h._id}
                className="flex justify-between items-center px-2 py-2
                           border-b border-slate-700/50 last:border-none
                           hover:bg-slate-800/40 transition-all rounded-lg"
              >
                <div className="flex flex-col">
                  <div className="font-medium text-slate-200 text-sm">
                    {h.topic}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {new Date(h.createdAt).toLocaleString()}
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold px-2 py-0.5 rounded-md border border-slate-700 ${scoreColor}`}
                >
                  {h.score}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pagination controls */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-2 py-1 rounded-md border border-slate-700/70
              ${
                page === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-slate-800/70"
              }`}
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`px-2 py-1 rounded-md border border-slate-700/70
              ${
                page === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-slate-800/70"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
