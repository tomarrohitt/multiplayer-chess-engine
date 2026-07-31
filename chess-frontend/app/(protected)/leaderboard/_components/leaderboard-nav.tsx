"use client";

import { motion } from "framer-motion";
import { useOptimistic, useTransition } from "react";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LeaderboardsResponse } from "../page";

import { Zap, Timer, Rocket, CalendarDays } from "lucide-react";

type TabConfig = {
  id: keyof LeaderboardsResponse;
  label: string;
  icon: React.ElementType;
};

const TABS: TabConfig[] = [
  {
    id: "live_blitz",
    label: "Blitz",
    icon: Zap,
  },
  {
    id: "live_rapid",
    label: "Rapid",
    icon: Timer,
  },
  {
    id: "live_bullet",
    label: "Bullet",
    icon: Rocket,
  },
  {
    id: "daily",
    label: "Daily",
    icon: CalendarDays,
  },
];

export function LeaderboardNav({ active }: { active: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [_, startTransition] = useTransition();
  const [optimisticActive, setOptimisticActive] = useOptimistic(active);

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setOptimisticActive(id);
      const params = new URLSearchParams(searchParams);
      params.set("tab", id);
      params.delete("q");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };
  return (
    <div
      className="flex gap-1 p-1 rounded-xs mb-6"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        isolation: "isolate",
      }}
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = optimisticActive === id;

        return (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            className={cn(
              "relative rounded-xs px-3 py-1.5 text-sm font-semibold text-white outline-sky-400 transition focus-visible:outline-2 flex-1 flex items-center justify-center gap-1.5 h-9 cursor-pointer",
              isActive ? "" : "hover:text-white/60",
            )}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-white mix-blend-difference rounded-md"
                style={{
                  background: isActive
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
