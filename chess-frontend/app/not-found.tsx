import Link from "next/link";
import NotFoundCat from "@/public/assets/lottie/404-cat.svg";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        <Image src={NotFoundCat} width={500} height={500} alt="not found cat" />
        <h2 className="text-5xl font-black tracking-tight text-neutral-100 mb-3">
          Page Not Found
        </h2>
        <p className="font-mono text-md text-neutral-400 leading-relaxed mb-8">
          We couldn&apos;t find the page you were looking for. It might have
          been moved or doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="bg-green-5/50 hover:bg-green-5/40 text-neutral-200 font-bold px-8 py-3 rounded-sm transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
