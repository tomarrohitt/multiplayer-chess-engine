"use client";

import { useGameStore } from "@/store/use-game-store";
import { useSocket } from "@/store/socket-provider";

interface IncomingDrawOfferProps {
  gameId: string;
  isPlayer: boolean;
}

export function IncomingDrawOffer({
  gameId,
  isPlayer,
}: IncomingDrawOfferProps) {
  const drawOffer = useGameStore((s) => s.drawOffer);
  const { acceptDraw, declineDraw } = useSocket();

  if (!isPlayer || !drawOffer) return null;

  return (
    <div className="mx-3 mb-2 p-3 bg-neutral-5  rounded-sm absolute w-90 bottom-60">
      <p className="font-mono text-xs text-neutral-200 text-center mb-3">
        Opponent offered a draw
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => acceptDraw(gameId)}
          className="flex-1 py-1.5 bg-green-5/50 hover:bg-green-5/60  text-green font-mono text-xs font-medium rounded-xs transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => declineDraw(gameId)}
          className="flex-1 py-1.5 bg-neutral-6 text-neutral-300 font-mono text-xs font-medium rounded-xs hover:bg-neutral-6/50 transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
