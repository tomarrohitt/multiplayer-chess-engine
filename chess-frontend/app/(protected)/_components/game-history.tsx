import { cn, scrollClass } from "@/lib/utils";
import { getRecentGames } from "@/actions/game";
import { NoGameFound } from "./no-game-found";
import { GameListItem } from "./game-list-item";

export type Player = {
  id: string;
  username: string;
  currentRating: number;
  matchRating: number;
  diff: number;
};

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
    <div className={cn("max-h-svh overflow-auto scrollbar-none", scrollClass)}>
      <div className="flex items-center justify-between px-6 mt-8 mb-4">
        <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-green-5">
          <span className="h-4 w-0.5 bg-green-5/50" />
          Recent Games
        </h2>
        <span className="text-xs font-medium text-neutral-200">
          {games?.length ?? 0} matches
        </span>
      </div>

      <div className={cn("flex flex-col gap-0.5", scrollClass)}>
        {games?.map((game) => (
          <GameListItem
            key={game.id}
            game={game}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
}
