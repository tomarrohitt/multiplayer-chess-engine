"use client";
import { useSocket } from "@/store/socket-provider";
import { useGameStore } from "@/store/use-game-store";
import { QueueStatus } from "@/types/chess";
import { memo } from "react";

const NewGameComponent = ({ timeControl }: { timeControl: string }) => {
  const { joinQueue } = useSocket();
  const action = useGameStore.getState().actions;

  return (
    <button
      onClick={() => {
        action.setQueue(QueueStatus.WAITING, timeControl);
        if (timeControl) joinQueue(timeControl);
      }}
      className="flex-1 px-2 py-1.5 font-mono text-xs text-emerald-400/80 bg-emerald-950/20 border border-emerald-900/30 rounded-lg hover:bg-emerald-950/40 hover:text-emerald-300 hover:border-emerald-800/50 transition-all "
    >
      New game
    </button>
  );
};

export const NewGame = memo(NewGameComponent);
