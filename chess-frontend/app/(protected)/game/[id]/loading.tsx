import Image from "next/image";
import WildKnight from "@/public/assets/lottie/Knight.svg";

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center w-full">
      <div className="w-24 h-24 sm:w-32 sm:h-32 opacity-70 mb-4">
        <Image src={WildKnight} width={100} height={100} alt="jumping knight" />
      </div>
      <span className="font-mono text-md tracking-[0.25em] text-green-5/60 uppercase">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
