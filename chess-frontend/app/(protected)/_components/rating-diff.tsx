import { cn } from "@/lib/utils";

export function RatingDiff({ diff }: { diff: number }) {
  const color =
    diff > 0
      ? "text-emerald-300/80"
      : diff < 0
        ? "text-rose-400/70"
        : "text-neutral-400";
  const label = diff > 0 ? `+${diff}` : diff < 0 ? `−${Math.abs(diff)}` : "±0";

  return (
    <p className={cn("font-mono text-md font-semibold shrink-0 pr-8", color)}>
      {label}
    </p>
  );
}
