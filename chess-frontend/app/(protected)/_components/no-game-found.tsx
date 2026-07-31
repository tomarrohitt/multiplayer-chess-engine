import { cn, scrollClass } from "@/lib/utils";
import NotFoundCat from "@/public/assets/lottie/404-cat.svg";
import Image from "next/image";

export const NoGameFound = () => {
  return (
    <div className={cn("h-svh overflow-auto scrollbar-none", scrollClass)}>
      <div className="flex items-center justify-between px-6 mt-8 mb-4">
        <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-green-5">
          <span className="h-4 w-0.5 bg-green-5/50" />
          Recent Games
        </h2>
        <span className="text-xs font-medium text-neutral-200 mr-2">
          0 matches
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 px-4 mt-16">
        <Image src={NotFoundCat} width={500} height={500} alt="not found cat" />
        <div className="text-center space-y-2">
          <p className="text-neutral-300 font-semibold text-xl tracking-tight">
            Nothing here yet!
          </p>
          <p className="font-mono text-md text-neutral-500 leading-relaxed max-w-70">
            Your match history will appear here after your first game
          </p>
        </div>
      </div>
    </div>
  );
};
