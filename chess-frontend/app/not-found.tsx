import Link from "next/link";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import NotFoundCat from "@/public/assets/lottie/404-cat.json";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        <LottieAnimation
          data={NotFoundCat}
          className="w-64 h-64 md:w-80 md:h-80 opacity-80 mb-2"
        />

        <h2 className="text-3xl font-black tracking-tight text-zinc-100 mb-3">
          Page Not Found
        </h2>
        <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-8">
          We couldn&apos;t find the page you were looking for. It might have
          been moved or doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-3 rounded-lg transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
