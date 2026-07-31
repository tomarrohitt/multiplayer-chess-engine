"use client";

import { useGameStore } from "@/store/use-game-store";
import { useSocket } from "@/store/socket-provider";
import { DrawOffer } from "@/types/chess";

interface ActiveGameControlsProps {
  gameId: string;
  isPlayer: boolean;
}

export function ActiveGameControls({
  gameId,
  isPlayer,
}: ActiveGameControlsProps) {
  const drawOfferSent = useGameStore((s) => s.drawOfferSent);
  const { offerDraw, resign } = useSocket();

  if (!isPlayer) return null;

  return (
    <div className="flex gap-4 mt-4 relative">
      {!drawOfferSent && (
        <button
          onClick={() => offerDraw(gameId)}
          className="cursor-pointer flex-1 py-2 font-mono text-sm text-neutral-300 bg-neutral-700/40 border-neutral-800/30 rounded-xs hover:bg-neutral-500/40   hover:text-neutral-200 transition-all font-semibold"
        >
          ½ Offer draw
        </button>
      )}
      {drawOfferSent === DrawOffer.SENT && (
        <div className="flex-1 py-2 font-mono text-sm text-neutral-600 bg-neutral-900/40 border-neutral-800/30 rounded-xs text-center">
          Draw offered...
        </div>
      )}
      {drawOfferSent === DrawOffer.DECLINE && (
        <div className="flex-1 py-2 font-mono text-sm text-rose-500/70 bg-rose-950/20 rounded-xs text-center">
          Draw declined
        </div>
      )}

      <button
        onClick={() => resign(gameId)}
        className="cursor-pointer flex-1 py-2 font-mono text-sm text-rose-200 bg-rose-500/10 rounded-xs hover:bg-rose-600/10 font-semibold hover:text-rose-300 transition-all"
      >
        Resign
      </button>
    </div>
  );
}
