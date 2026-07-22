import { cn } from "@/lib/utils";

type Result = "W" | "L" | "D" | "—";

const RESULT_STYLES: Record<Result, string> = {
  "—": "bg-neutral-700 text-neutral-300",
  W: "bg-emerald-950/60 text-neutral-200",
  L: "bg-red-500/20 text-neutral-200",
  D: "bg-neutral-700 text-neutral-300",
};

export function ResultBadge({ result }: { result: Result }) {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-md flex-center font-mono text-2xs font-bold shrink-0 tracking-wider shadow-2xl",
        RESULT_STYLES[result],
      )}
    >
      {result}
    </div>
  );
}
