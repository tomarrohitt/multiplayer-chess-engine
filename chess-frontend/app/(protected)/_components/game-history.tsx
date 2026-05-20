import Link from "next/link";
import { GameStatus } from "@/types/chess";
import { cn, scrollClass } from "@/lib/utils";
import { getRecentGames } from "@/actions/game";
import { NoGameFound } from "./no-game-found";

export type Player = {
  id: string;
  username: string;
  currentRating: number;
  matchRating: number;
  diff: number;
};

export type GameRecord = {
  id: string;
  status: GameStatus;
  timeControl: string;
  createdAt: string;
  winnerId: string | null;
  result: string;
  finalFen: string;
  white: Player;
  black: Player;
};

function formatStatus(status: GameStatus) {
  switch (status) {
    case GameStatus.RESIGN:
      return "Resign";
    case GameStatus.TIME_OUT:
      return "Timeout";
    case GameStatus.AGREEMENT:
      return "Agreement";
    case GameStatus.CHECKMATE:
      return "Checkmate";
    case GameStatus.ABANDONED:
      return "Abandoned";
    case GameStatus.STALEMATE:
      return "Stalemate";
    default:
      return status.charAt(0) + status.slice(1).toLowerCase();
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export async function GameHistory({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const games = await getRecentGames(currentUserId);

  if (games?.length === 0) {
    return <NoGameFound />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-end justify-between mb-6 pb-4 border-b border-zinc-800/60">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-amber-500/70 mb-2 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-amber-500/50" />
            Recent
          </p>
          <h2 className="text-2xl font-black tracking-tight text-zinc-100 leading-none">
            History
          </h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-semibold text-zinc-200 leading-none">
            {games?.length}
          </p>
          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.14em] uppercase mt-1">
            played
          </p>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-px overflow-y-auto max-h-[calc(100vh-220px)]",
          scrollClass,
        )}
      >
        {games?.map((game) => {
          const isWhite = game.white.id === currentUserId;
          const isBlack = game.black.id === currentUserId;
          const isPlayer = isWhite || isBlack;

          const won = game.winnerId === currentUserId;
          const draw = game.result === "d";
          const lost = isPlayer && !won && !draw;
          const abandoned = game.status === GameStatus.ABANDONED;

          const opponent = isWhite ? game.black : game.white;
          const player = isWhite ? game.white : game.black;

          const badgeClass = abandoned
            ? "bg-zinc-900/60 text-zinc-600 border-zinc-800/40"
            : won
              ? "bg-emerald-950/60 text-emerald-400 border-emerald-900/60"
              : lost
                ? "bg-rose-950/60 text-rose-400 border-rose-900/60"
                : "bg-zinc-900 text-zinc-400 border-zinc-700/50";

          const badgeLabel = abandoned ? "—" : won ? "W" : lost ? "L" : "D";

          const diffColor =
            player.diff > 0
              ? "text-emerald-400"
              : player.diff < 0
                ? "text-rose-400"
                : "text-zinc-600";

          const diffLabel =
            player.diff > 0
              ? `+${player.diff}`
              : player.diff < 0
                ? `−${Math.abs(player.diff)}`
                : "±0";

          return (
            <Link
              key={game.id}
              href={`/game/${game.id}`}
              className="group flex items-center gap-3 px-3 py-3 rounded-lg border border-transparent hover:bg-zinc-900/70 hover:border-zinc-800/60 transition-all duration-100 relative"
            >
              <span className="absolute inset-y-2 left-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-amber-500/40" />

              <div
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center font-mono text-[10px] font-bold border shrink-0 tracking-wider",
                  badgeClass,
                )}
              >
                {badgeLabel}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors truncate">
                  {opponent.username}
                  <span className="text-zinc-600 font-normal text-xs ml-1.5">
                    ({opponent.matchRating})
                  </span>
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-mono text-[10px] text-zinc-600">
                    {game.timeControl}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-zinc-700 shrink-0" />
                  <span className="font-mono text-[10px] text-zinc-600">
                    {formatStatus(game.status)}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-zinc-700 shrink-0" />
                  <span className="font-mono text-[10px] text-zinc-600">
                    {formatDate(game.createdAt)}
                  </span>
                </div>
              </div>

              {isPlayer && (
                <p
                  className={cn(
                    "font-mono text-xs font-semibold shrink-0",
                    diffColor,
                  )}
                >
                  {diffLabel}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
