"use client";
import { useSocket } from "@/store/socket-provider";
import { useGameStore } from "@/store/use-game-store";
import { useRouter } from "next/navigation";
import { GameStatus } from "@/types/chess";

type JoinButtonProps = {
  label: string;
  value: string;
};

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
      className="h-34 w-50 bg-neutral-5 shadow-5xl rounded-xs transition-all duration-200 hover:bg-neutral-6 flex flex-col flex-center"
    >
      <span className="text-3xl">{label}</span>
    </button>
  );
};

export default JoinButton;
