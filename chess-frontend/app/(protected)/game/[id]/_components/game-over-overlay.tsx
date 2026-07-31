import { useState } from "react";
import { useGameStore } from "@/store/use-game-store";
import { useSocket } from "@/store/socket-provider";
import {
  DrawOffer,
  GameOverState,
  GameStatus,
  QueueStatus,
} from "@/types/chess";

export function GameOverOverlay({
  gameOver,
  userId,
}: {
  gameOver: GameOverState;
  userId: string;
}) {
  const activeGame = useGameStore((s) => s.activeGame);
  const rematchOffer = useGameStore((s) => s.rematchOffer);
  const rematchOfferSent = useGameStore((s) => s.rematchOfferSent);

  const queueStatus = useGameStore((s) => s.queueStatus);

  const { joinQueue, offerRematch } = useSocket();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || queueStatus === QueueStatus.WAITING) return null;

  const won = gameOver.winnerId === userId;
  const isDraw =
    !gameOver.winnerId ||
    gameOver.status === GameStatus.AGREEMENT ||
    gameOver.status === GameStatus.STALEMATE;
  const isAbandoned = gameOver.status === GameStatus.ABANDONED;
  const isPlayer =
    userId === activeGame?.white.id || userId === activeGame?.black.id;

  const winnerColor = gameOver.winnerId
    ? gameOver.winnerId === activeGame?.white.id
      ? "White"
      : "Black"
    : null;

  let subtitle = isAbandoned
    ? "Game aborted"
    : isDraw
      ? "Game drawn"
      : `${winnerColor} won`;

  if (gameOver.reason && !isAbandoned) {
    subtitle += ` by ${gameOver.reason.toLowerCase()}`;
  } else if (isAbandoned && winnerColor) {
    subtitle = `${winnerColor} won (abandoned)`;
  }

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-sm z-50">
      <div className="relative bg-neutral-7  rounded-sm p-6 flex flex-col items-center gap-4 w-100 h-60 text-center">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-neutral-700 hover:text-neutral-400 transition-colors"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div>
          <h2 className="font-serif text-3xl font-light tracking-tight">
            Game Over{" "}
          </h2>
          <p className="font-mono text-sm text-neutral-600 mt-1 tracking-wide">
            {subtitle}
          </p>
        </div>

        <div className="font-mono text-lg font-medium mt-2">
          {won ? (
            <span className="text-green-5/50">Gained 8 points</span>
          ) : isDraw ? (
            <span className="text-neutral-400">Rating unchanged</span>
          ) : (
            <span className="text-rose-400">Lost 8 points</span>
          )}
        </div>
        <div className="w-full h-px bg-neutral-4" />
        {isPlayer && (
          <div className="flex w-full gap-5">
            <button
              onClick={() => {
                const tc = activeGame?.timeControl;
                if (tc) joinQueue(tc);
                setIsVisible(false);
              }}
              className="flex-1 py-2 font-mono text-sm font-medium bg-green-5/50 hover:bg-green-5/30 rounded-xs transition-all"
            >
              New game
            </button>

            {!rematchOffer && !rematchOfferSent && (
              <button
                onClick={() =>
                  activeGame &&
                  offerRematch(activeGame.gameId, activeGame.timeControl)
                }
                className="flex-1 py-2 font-mono text-sm font-medium text-white bg-neutral-5 rounded-xs hover:bg-neutral-5/60 transition-all"
              >
                Rematch
              </button>
            )}
            {rematchOfferSent === DrawOffer.SENT && (
              <div className="flex-1 py-2 font-mono text-sm text-neutral-600 bg-neutral-900/40 border border-neutral-800/30 rounded-sm text-center">
                Sent...
              </div>
            )}
            {rematchOfferSent === DrawOffer.DECLINE && (
              <div className="flex-1 py-2 font-mono text-sm text-rose-500/60 bg-rose-950/20 border border-rose-900/30 rounded-sm text-center">
                Declined
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
