import { Calendar } from "lucide-react";

import { User } from "@/types/auth";
import { MiniStat } from "./common";
import { UserProfile } from "./user-profile";
import { PlayerProfile } from "./player-profile";

export async function UserInfoCard({
  user,
  currentUser,
  totalGames,
  winRate,
}: {
  currentUser: User | null;
  user: Omit<User, "emailVerified">;
  rank: { title: string; color: string };
  totalGames: number;
  winRate: string | number;
}) {
  return (
    <div className="bg-neutral-5 rounded-sm p-6 flex flex-col items-center relative overflow-hidden">
      <div className="relative mb-5">
        {currentUser?.id === user.id ? (
          <UserProfile name={user.name} image={user.image} />
        ) : (
          <div className="w-40 h-40 rounded-full bg-neutral-7 flex items-center justify-center overflow-hidden">
            <PlayerProfile name={user.name} image={user.image} />
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold text-neutral-100 m-0 tracking-wider">
        {user.name}
      </h2>
      <p className="text-md text-neutral-400 mt-1 mb-3 font-mono">
        @{user.username}
      </p>

      <div className="grid grid-cols-2 gap-2.5 w-full mt-1">
        <MiniStat label="Games" value={totalGames} />
        <MiniStat label="Win Rate" value={`${winRate}%`} />
      </div>

      <div className="mt-2">
        <p className="text-2xs text-center text-neutral-400 uppercase tracking-widest mb-1 font-mono">
          Member Since
        </p>
        <div className="flex items-center gap-2.5">
          <Calendar size={14} className="text-neutral-300" />
          <span
            suppressHydrationWarning
            className="text-sm text-neutral-300 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
