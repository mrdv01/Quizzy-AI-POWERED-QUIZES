interface Props {
  current: number; // zero based index
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
