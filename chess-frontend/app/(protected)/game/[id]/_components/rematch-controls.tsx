"use client";

import { useGameStore } from "@/store/use-game-store";
import { useSocket } from "@/store/socket-provider";
import { DrawOffer } from "@/types/chess";
import { memo } from "react";

interface RematchControlsProps {
  gameId: string;
  timeControl: string;
  isPlayer: boolean;
}

function RematchControlsComponent({
  gameId,
  timeControl,
  isPlayer,
}: RematchControlsProps) {
  const rematchOffer = useGameStore((s) => s.rematchOffer);
  const rematchOfferSent = useGameStore((s) => s.rematchOfferSent);
  const { offerRematch } = useSocket();

  if (!isPlayer) return null;

  if (rematchOfferSent === DrawOffer.SENT) {
    return (
      <div className="flex-1 py-2 font-mono text-sm text-neutral-600 bg-neutral-900/40 border-neutral-800/30 rounded-xs text-center">
        Rematch sent...
      </div>
    );
  }

  if (rematchOfferSent === DrawOffer.DECLINE) {
    return (
      <div className="flex-1 py-2 font-mono text-sm text-sky-400/80 bg-sky-950/20 border-sky-900/30 rounded-xs hover:bg-sky-950/40 hover:text-sky-300 transition-all text-center">
        Rematch declined
      </div>
    );
  }

  if (!rematchOffer) {
    return (
      <button
        onClick={() => offerRematch(gameId, timeControl)}
        className="flex-1 py-2 font-mono text-sm bg-neutral-5 hover:bg-neutral-5/60 text-white transition-all"
      >
        Rematch
      </button>
    );
  }

  return null;
}

export const RematchControls = memo(RematchControlsComponent);
