import { getUserFromSession } from "@/actions/session";
import { LobbyClient } from "@/components/game/lobby-client";

import { redirect } from "next/navigation";
import { Suspense } from "react";
import GameHistoryLoading from "./_components/game-history-loading";
import { GameHistory } from "./_components/game-history";

export default async function HomePage() {
  const user = await getUserFromSession();
  if (!user) redirect("/login");

  return (
    <main className="flex justify-between px-auto bg-neutral-4">
      <LobbyClient />
      <div className="w-96 bg-neutral-5">
        <Suspense fallback={<GameHistoryLoading />}>
          <GameHistory currentUserId={user.id} />
        </Suspense>
      </div>
    </main>
  );
}
