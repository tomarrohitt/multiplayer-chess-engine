"use client";
import { useSocket } from "@/store/socket-provider";
import { useGameStore } from "@/store/use-game-store";
import { useRouter } from "next/navigation";
import { GameStatus } from "@/types/chess";

type JoinButtonProps = { label: string; value: string; category: string };

const JoinButton = ({ label, value, category }: JoinButtonProps) => {
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
      className="h-34 w-50 bg-neutral-5 shadow-2xl rounded-xs transition-all duration-300"
    >
      <span className="">{label}</span>
    </button>
  );
};

export default JoinButton;
