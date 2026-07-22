import Link from "next/link";
import { OpponentInfo } from "./opponent-info";
import { ResultBadge } from "./result-badge";
import { GameMeta } from "./game-meta";
import { formatDate, formatStatus } from "@/lib/chess-utils";
import { RatingDiff } from "./rating-diff";
import { GameStatus } from "@/types/chess";
import { Player } from "./game-history";

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

type GameListItemProps = {
  currentUserId: string;
  game: GameRecord;
};

export function GameListItem({ game, currentUserId }: GameListItemProps) {
  const isWhite = game.white.id === currentUserId;
  const isBlack = game.black.id === currentUserId;
  const isPlayer = isWhite || isBlack;

  const won = game.winnerId === currentUserId;
  const draw = game.result === "d";
  const lost = isPlayer && !won && !draw;
  const abandoned = game.status === GameStatus.ABANDONED;

  const opponent = isWhite ? game.black : game.white;
  const player = isWhite ? game.white : game.black;

  const result = abandoned ? "—" : won ? "W" : lost ? "L" : "D";

  return (
    <Link
      href={`/game/${game.id}`}
      className="group flex items-center gap-3 px-3 py-3 hover:bg-neutral-900/70 transition-all duration-100 relative"
    >
      <ResultBadge result={result} />

      <div className="flex-1 min-w-0">
        <OpponentInfo
          username={opponent.username}
          rating={opponent.matchRating}
        />
        <GameMeta
          timeControl={game.timeControl}
          status={formatStatus(game.status)}
          date={formatDate(game.createdAt)}
        />
      </div>

      {isPlayer && <RatingDiff diff={player.diff} />}
    </Link>
  );
}
