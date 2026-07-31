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
      className="flex-1 px-2 py-1.5 font-mono text-sm bg-green-5/50 hover:bg-green-5/30 transition-colors"
    >
      New game
    </button>
  );
};

export const NewGame = memo(NewGameComponent);
