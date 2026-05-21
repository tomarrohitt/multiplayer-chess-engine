const GameHistoryLoading = () => {
  return (
    <div className="w-full lg:w-96 shrink-0">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-end justify-between mb-6 pb-4 border-b border-zinc-800/60">
          <div>
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-amber-500/70 mb-2 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-amber-500/50" />
              Recent
            </p>
            <h2 className="text-2xl font-black tracking-tight text-zinc-100 leading-none">
              History
            </h2>
          </div>
          <div className="text-right">
            <p className="font-mono text-xl font-semibold text-zinc-200 leading-none" />
            <p className="font-mono text-[10px] text-zinc-600 tracking-[0.14em] uppercase mt-1">
              played
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-px overflow-y-auto max-h-[calc(100vh-220px)] gap-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-3 rounded-lg bg-zinc-900/40 border border-transparent"
            >
              <div className="w-8 h-8 rounded-md bg-zinc-800/80 animate-pulse shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="w-32 h-5 bg-zinc-800/80 rounded animate-pulse" />
                <div className="w-40 h-3 bg-zinc-800/80 rounded animate-pulse mt-1" />
              </div>
              <div className="w-8 h-4 bg-zinc-800/80 rounded animate-pulse shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHistoryLoading;
