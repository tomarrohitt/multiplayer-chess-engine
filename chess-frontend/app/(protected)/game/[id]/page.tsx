import { getUserFromSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { Gameboard } from "./_components/gameboard";
import { ArchiveBoard, GamePlayer } from "./_components/archive-board";
import { GameStatus } from "@/types/chess";
import { safeFetch } from "@/lib/constants/safe-fetch";

export interface InitialGameData {
  id: string;
  status: GameStatus;
  result: string;
  winnerId: string | null;
  timeControl: string;
  createdAt: string;
  pgn: string;
  finalFen: string;
  moveTimes: number[];
  whiteTimeLeftMs: number;
  blackTimeLeftMs: number;
  white: GamePlayer;
  black: GamePlayer;
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserFromSession();
  if (!user) redirect("/login");

  const { id } = await params;

  const initialGameData = await safeFetch<InitialGameData>(`/games/${id}`);

  if (initialGameData) {
    return <ArchiveBoard gameData={initialGameData} user={user} />;
  }

  return <Gameboard gameId={id} user={user} />;
}
