import { LottieAnimation } from "@/components/ui/lottie-animation";
import type { Metadata } from "next";
import WildKnight from "@/public/assets/lottie/knight.json";
import Stamp from "@/public/assets/lottie/Stamp.json";

export const metadata: Metadata = {
  title: "Chess: Sign in or create an account",
  description: "Sign in or create an account",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="flex min-h-[90lvh] overflow-hidden bg-[#080808]"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        <div className="relative hidden lg:flex flex-col w-[55%] overflow-hidden border-r border-[rgba(201,168,76,0.18)] bg-[#111111]">
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="absolute top-9 left-9 w-12 h-12 border-t-[1.5px] border-l-[1.5px] border-[#C9A84C] z-2 opacity-70" />

          <div className="absolute bottom-9 right-9 w-12 h-12 border-b-[1.5px] border-r-[1.5px] border-[#C9A84C] z-2 opacity-70" />

          <div className="absolute top-11 left-0 right-0 text-center z-3 pointer-events-none">
            <h1
              className="m-0 uppercase leading-none tracking-[0.25em] text-[#C9A84C] font-light text-[clamp(52px,6vw,88px)]"
              style={{
                fontFamily: "'Cormorant Garant', serif",
                fontWeight: 300,
              }}
            >
              Chess
            </h1>
            <p
              className="mt-2.5 mb-0 uppercase tracking-[0.35em] text-[10px] text-[rgba(240,232,208,0.45)] font-light"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Every move defines the player
            </p>
          </div>

          <div
            className="absolute top-40 left-20 right-20 h-px z-2"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center z-1">
            <div className="absolute w-125 h-125 rounded-full border border-[rgba(201,168,76,0.06)] pointer-events-none animate-ring-pulse-delayed" />
            <div className="absolute w-95 h-95 rounded-full border border-[rgba(201,168,76,0.12)] pointer-events-none animate-ring-pulse" />
            <div
              className="absolute w-115 h-115 rounded-full pointer-events-none animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)",
              }}
            />
            <div
              className="relative w-85 h-85 z-2"
              style={{
                filter:
                  "drop-shadow(0 0 32px rgba(201,168,76,0.25)) drop-shadow(0 0 64px rgba(201,168,76,0.1))",
              }}
            >
              <LottieAnimation data={WildKnight} />
            </div>
          </div>

          <div
            className="absolute bottom-13 left-13 w-25 h-25 z-3 opacity-65"
            style={{ filter: "drop-shadow(0 0 12px rgba(201,168,76,0.3))" }}
          >
            <LottieAnimation data={Stamp} />
          </div>

          <div
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-5.5 z-2 opacity-25 tracking-[0.2em] text-[10px] text-[#C9A84C]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>

          <div
            className="absolute -right-px top-[15%] bottom-[15%] w-px z-10 opacity-50"
            style={{
              background:
                "linear-gradient(180deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)",
              boxShadow: "0 0 12px 1px rgba(201,168,76,0.4)",
            }}
          />
        </div>

        <div
          className="flex-1 flex items-center justify-center px-8 py-10 relative bg-[#080808]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          <span
            className="absolute top-8 right-8 text-[10px] tracking-[0.2em] text-[#C9A84C] opacity-35 z-2 uppercase"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            ♙ Your move
          </span>

          <span
            className="absolute bottom-8 left-8 text-[10px] tracking-[0.2em] text-[#C9A84C] opacity-35 z-2 uppercase"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            e4 · e5 · Nf3
          </span>

          <div className="relative z-1 w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
