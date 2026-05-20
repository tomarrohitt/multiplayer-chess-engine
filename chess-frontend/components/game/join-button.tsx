"use client";
import { useSocket } from "@/store/socket-provider";
import { useGameStore } from "@/store/use-game-store";
import { useRouter } from "next/navigation";
import { GameStatus } from "@/types/chess";

type JoinButtonProps = { label: string; value: string };

const JoinButton = ({ label, value }: JoinButtonProps) => {
  const { joinQueue } = useSocket();
  const activeGame = useGameStore((s) => s.activeGame);
  const router = useRouter();

  const handleClick = () => {
    if (activeGame && activeGame.status === GameStatus.IN_PROGRESS) {
      router.push(`/game/${activeGame.gameId}`);
    } else {
      joinQueue(value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative w-full py-2 px-4 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800/80 hover:border-zinc-700 transition-all duration-150 text-left overflow-hidden"
    >
      <span className="absolute inset-y-0 left-0 w-0.5 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full" />
      <span className="font-mono text-sm font-medium text-zinc-400 group-hover:text-zinc-100 transition-colors duration-150 pl-1">
        {label}
      </span>
    </button>
  );
};

export default JoinButton;
