import { LottieAnimation } from "@/components/ui/lottie-animation";
import WildKnight from "@/public/assets/lottie/knight.json";

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center w-full">
      <div className="w-24 h-24 sm:w-32 sm:h-32 opacity-70 mb-4">
        <LottieAnimation data={WildKnight} />
      </div>
      <span className="font-mono text-xs tracking-[0.25em] text-amber-500/60 uppercase">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
