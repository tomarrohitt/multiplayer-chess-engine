import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaderboardNav } from "./_components/leaderboard-nav";

type Player = {
  player_id: number;
  username: string;
  name?: string;
  title?: string;
  score: number;
  rank: number;
  avatar?: string;
  win_count: number;
  loss_count: number;
  draw_count: number;
  url: string;
};

export type LeaderboardsResponse = {
  live_blitz: Player[];
  live_rapid: Player[];
  live_bullet: Player[];
  daily: Player[];
};

function PodiumCard({ player }: { player: Player }) {
  const medalEmoji = player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉";

  return (
    <div className="relative flex flex-col items-center gap-3 rounded-sm bg-neutral-5/70 px-5 py-6 flex-1 min-w-0 overflow-hidden h-72">
      <span className="absolute right-3 top-1 font-serif text-7xl font-black text-white/10 select-none pointer-events-none leading-none">
        {player.rank}
      </span>

      <Avatar className="w-14 h-14 rounded-full">
        <AvatarImage
          src={player.avatar}
          alt={player.username}
          className="object-cover"
        />
        <AvatarFallback className="rounded-full bg-neutral-800 text-neutral-400 text-sm font-bold">
          {player.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-1 text-center min-w-0 w-full h-12">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <a
            href={player.url}
            target="_blank"
            rel="noreferrer"
            className="text-md font-bold hover:underline underline-offset-2"
          >
            {player.username}
          </a>
        </div>
        {player.name && (
          <span className="text-sm text-neutral-400 truncate w-full">
            {player.name}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center">
        <span className="font-mono text-2xl font-black tabular-nums">
          {player.score.toLocaleString()}
        </span>
        <span className="text-sm text-neutral-400 uppercase tracking-widest mt-0.5">
          Rating
        </span>
      </div>

      <span className="text-xl">{medalEmoji}</span>
    </div>
  );
}

const LeaderBoardPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await Promise.resolve(searchParams);
  const activeTab = (params?.tab as keyof LeaderboardsResponse) || "live_blitz";

  const leaderboardData = await fetch(
    "https://api.chess.com/pub/leaderboards",
    { next: { revalidate: 3600 } },
  );
  const data: LeaderboardsResponse = await leaderboardData.json();
  const allPlayers = data[activeTab]?.slice(0, 50) || [];
  const podium = allPlayers.slice(0, 3);
  const rest = allPlayers.slice(3);

  return (
    <div className="min-h-svh text-neutral-100 bg-neutral-6">
      <header className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between gap-4">
          <h3 className=" text-neutral-200 font-semibold tracking-widest uppercase mt-0.5">
            Top 50 · Chess.com
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-neutral-300 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>
      </header>
      <nav className="max-w-3xl mx-auto mt-5">
        <LeaderboardNav active={activeTab} />
      </nav>

      <main className="max-w-5xl mx-auto px-5 md:px-10 space-y-10">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/5" />
            <span className="text-sm text-neutral-600 font-mono uppercase tracking-widest">
              Top Performers
            </span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/5" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {podium.map((player) => (
              <PodiumCard key={player.player_id} player={player} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/5" />
            <span className="text-sm text-neutral-600 font-mono uppercase tracking-widest">
              Rankings
            </span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/5" />
          </div>

          <div className="rounded-sm border border-white/5 overflow-hidden bg-neutral-900/30">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="w-16 text-center text-sm text-neutral-600 uppercase tracking-widest font-bold py-3.5">
                    Rank
                  </TableHead>
                  <TableHead className="text-sm text-neutral-600 uppercase tracking-widest font-bold py-3.5 w-60">
                    Player
                  </TableHead>
                  <TableHead className="text-right text-sm text-neutral-600 uppercase tracking-widest font-bold py-3.5 w-60">
                    Rating
                  </TableHead>
                  <TableHead className="text-right text-sm text-neutral-600 uppercase tracking-widest font-bold py-3.5 hidden sm:table-cell w-50 ">
                    W
                  </TableHead>
                  <TableHead className="text-right text-sm text-neutral-600 uppercase tracking-widest font-bold py-3.5 hidden sm:table-cell w-50 ">
                    D
                  </TableHead>
                  <TableHead className="text-right text-sm text-neutral-600 uppercase tracking-widest font-bold py-3.5 hidden sm:table-cell w-50 ">
                    L
                  </TableHead>
                  <TableHead className="text-right text-sm text-neutral-600 uppercase tracking-widest font-bold py-3.5 hidden sm:table-cell w-50 ">
                    Win Ratio
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rest.map((player, index) => {
                  const isEven = index % 2 === 0;
                  const total =
                    player.win_count + player.draw_count + player.loss_count;

                  const pct = Math.round((player.win_count / total) * 100);
                  return (
                    <TableRow
                      key={player.player_id}
                      className={`border-white/4 transition-colors group ${
                        isEven ? "bg-white/1" : ""
                      } hover:bg-neutral-5/50`}
                    >
                      <TableCell className="text-center py-3.5 w-16">
                        <span className="font-mono text-sm tabular-nums text-neutral-500 font-medium">
                          {player.rank}
                        </span>
                      </TableCell>

                      <TableCell className="py-3.5 w-60">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 rounded-full ring-1 ring-white/10 shrink-0">
                            <AvatarImage
                              src={player.avatar}
                              alt={player.username}
                              className="object-cover"
                            />
                            <AvatarFallback className="rounded-full bg-neutral-800 text-neutral-500 text-sm font-bold">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0 gap-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <a
                                href={player.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold text-neutral-200 group-hover:underline underline-offset-2 transition-colors truncate"
                              >
                                {player.username}
                              </a>
                            </div>
                            {player.name && (
                              <span className="text-sm text-neutral-600 truncate">
                                {player.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right py-3.5 w-60">
                        <span className="font-mono text-base font-black tabular-nums text-neutral-200  transition-colors">
                          {player.score.toLocaleString()}
                        </span>
                      </TableCell>

                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <span className="text-emerald-400 font-semibold">
                          {player.win_count}
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <span className="text-neutral-400">
                          {player.draw_count}
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <span className="text-rose-400 font-semibold">
                          {player.loss_count}
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <span className="text-sm text-neutral-300 font-mono">
                          {pct}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>

        <footer className="text-center text-lg text-neutral-500 font-mono pb-6 tracking-wide">
          Refreshes every hour &nbsp;·&nbsp; Source: Chess.com Public API
        </footer>
      </main>
    </div>
  );
};

export default LeaderBoardPage;
