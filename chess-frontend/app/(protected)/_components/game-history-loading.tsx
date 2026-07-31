import { cn, scrollClass } from "@/lib/utils";

const GameHistoryLoading = () => {
  return (
    <div className="w-full  shrink-0">
      <div className="flex items-center justify-between px-6 mt-8 mb-4">
        <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-green-5 ">
          <span className="h-4 w-0.5 bg-green-5/50" />
          Recent Games
        </h2>
        <span className="text-xs font-medium text-neutral-200 mr-2">
          0 matches
        </span>
      </div>
      <div className={cn("flex flex-col gap-0.5", scrollClass)}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            className="group flex items-center gap-3 px-3 py-3 hover:bg-neutral-900/70 transition-all duration-100 relative min-h-17.5"
          >
            <div className="w-8 h-8 rounded-md bg-zinc-800/80 animate-pulse shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="w-32 h-5 bg-zinc-800/80 rounded animate-pulse" />
              <div className="w-40 h-3 bg-zinc-800/80 rounded animate-pulse mt-1" />
            </div>
            <div className="w-8 h-4 mr-8 bg-zinc-800/80 rounded animate-pulse shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistoryLoading;
