import { TrendingUp } from "lucide-react";
import { LegendDot } from "./common";
import { User } from "@/types/auth";

export function PerformanceCard({
  user,
  totalGames,
  winRate,
}: {
  user: Omit<User, "emailVerified">;
  totalGames: number;
  winRate: string | number;
}) {
  return (
    <div className="bg-neutral-5  rounded-sm py-5.5 px-6">
      <div className="flex justify-between items-center mb-3.5">
        <div className="flex items-center gap-2">
          <TrendingUp size={15} color="#4ade80" />
          <span className="text-[14px] font-semibold text-neutral-100">
            Performance
          </span>
        </div>
        <span className="text-sm text-green-5 font-medium">
          {winRate}% win rate
        </span>
      </div>
      <div className="h-1.75 rounded bg-[#1a1a1a] flex overflow-hidden gap-0.5">
        <div
          className="h-full bg-green-5 rounded-l"
          style={{
            width: totalGames ? `${(user.wins / totalGames) * 100}%` : "0%",
          }}
        />
        <div
          className="h-full bg-[#525252]"
          style={{
            width: totalGames ? `${(user.draws / totalGames) * 100}%` : "0%",
          }}
        />
        <div
          className="h-full bg-[#f87171] rounded-r"
          style={{
            width: totalGames ? `${(user.losses / totalGames) * 100}%` : "0%",
          }}
        />
      </div>
      <div className="flex gap-5 mt-2.5">
        <LegendDot color="#4ade80" label="Wins" />
        <LegendDot color="#737373" label="Draws" />
        <LegendDot color="#f87171" label="Losses" />
      </div>
    </div>
  );
}
