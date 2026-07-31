export function RatingCard({ rating }: { rating: number }) {
  return (
    <div className="bg-neutral-5 rounded-sm backdrop-blur-sm px-7 py-4 relative overflow-hidden">
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <p className="text-xs text-neutral-400  uppercase tracking-wider mb-2 font-medium">
            Current Rating
          </p>
          <p className="text-[56px] font-bold text-green-5 m-0 leading-none">
            {rating}
          </p>
          <p className="text-md font-semibold text-neutral-300 mt-1.5 font-mono">
            ELO Points
          </p>
        </div>
        <div className="shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="var(--green-5)"
              strokeWidth="10"
              strokeDasharray={`${(rating / 2000) * 314} 314`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="62"
              textAnchor="middle"
              fill="#d4d4d4"
              fontSize="16"
              fontWeight="700"
            >
              {Math.round((rating / 2000) * 100)}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
