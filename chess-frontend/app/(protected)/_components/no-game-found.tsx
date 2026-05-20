import { LottieAnimation } from "@/components/ui/lottie-animation";
import NotFoundCat from "@/public/assets/lottie/404-cat.json";

export const NoGameFound = () => {
  return (
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
          <p className="font-mono text-xl font-semibold text-zinc-700 leading-none">
            0
          </p>
          <p className="font-mono text-[10px] text-zinc-700 tracking-[0.14em] uppercase mt-1">
            played
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 px-4">
        <LottieAnimation data={NotFoundCat} className="" />

        <div className="text-center space-y-2">
          <p className="text-zinc-300 font-semibold text-sm tracking-tight">
            No games played yet
          </p>
          <p className="font-mono text-[11px] text-zinc-600 leading-relaxed max-w-50">
            Your match history will appear here after your first game
          </p>
        </div>
      </div>
    </div>
  );
};
