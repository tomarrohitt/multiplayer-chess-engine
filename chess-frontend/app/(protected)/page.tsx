import { getUserFromSession } from "@/actions/session";
import { LobbyClient } from "@/components/game/lobby-client";
import { GameHistory } from "@/app/(protected)/_components/game-history";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import GameHistoryLoading from "./_components/game-history-loading";

export default async function HomePage() {
  const user = await getUserFromSession();
  if (!user) redirect("/login");

  return (
    <main className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full gap-10 pt-6">
      <div className="flex-1">
        <LobbyClient />
      </div>
      <div className="w-full lg:w-96 shrink-0">
        <Suspense fallback={<GameHistoryLoading />}>
          <GameHistory currentUserId={user.id} />
        </Suspense>
      </div>
    </main>
  );
}
