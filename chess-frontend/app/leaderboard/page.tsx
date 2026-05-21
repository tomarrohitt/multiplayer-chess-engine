import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

type LeaderboardsResponse = {
  live_blitz: Player[];
  live_rapid: Player[];
  live_bullet: Player[];
  daily: Player[];
};

const TABS: { id: keyof LeaderboardsResponse; label: string; sup: string }[] = [
  { id: "live_blitz", label: "Blitz", sup: "⚡" },
  { id: "live_rapid", label: "Rapid", sup: "♟" },
  { id: "live_bullet", label: "Bullet", sup: "🔥" },
  { id: "daily", label: "Daily", sup: "🏛" },
];

function PlayerTitle({ title }: { title?: string }) {
  if (!title) return null;
  return (
    <span className="font-mono text-[10px] font-black tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-sm">
      {title}
    </span>
  );
}

function WinLossRecord({
  wins,
  draws,
  losses,
}: {
  wins: number;
  draws: number;
  losses: number;
}) {
  const total = wins + draws + losses;
  if (total === 0)
    return <span className="text-slate-600 text-xs font-mono">—</span>;
  const pct = Math.round((wins / total) * 100);

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-0.5 font-mono text-xs tabular-nums">
        <span className="text-emerald-400 font-semibold">{wins}</span>
        <span className="text-slate-600 mx-0.5">·</span>
        <span className="text-slate-400">{draws}</span>
        <span className="text-slate-600 mx-0.5">·</span>
        <span className="text-rose-400 font-semibold">{losses}</span>
      </div>
      <span className="text-[10px] text-slate-600 font-mono">{pct}% win</span>
    </div>
  );
}

function PodiumCard({ player }: { player: Player }) {
  const isFirst = player.rank === 1;
  const medalEmoji = player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉";
  const ratingColor = isFirst
    ? "text-amber-400"
    : player.rank === 2
      ? "text-slate-300"
      : "text-orange-300/80";
  const borderColor = isFirst
    ? "border-amber-500/30"
    : player.rank === 2
      ? "border-slate-500/30"
      : "border-orange-700/30";
  const bgColor = isFirst
    ? "bg-amber-950/20"
    : player.rank === 2
      ? "bg-slate-800/20"
      : "bg-orange-950/20";

  return (
    <div
      className={`relative flex flex-col items-center gap-3 rounded-2xl border ${borderColor} ${bgColor} px-5 py-6 flex-1 min-w-0 overflow-hidden`}
    >
      <span className="absolute right-3 top-1 font-serif text-7xl font-black text-white/3 select-none pointer-events-none leading-none">
        {player.rank}
      </span>

      <Avatar className="w-14 h-14 rounded-full ring-2 ring-white/10">
        <AvatarImage
          src={player.avatar}
          alt={player.username}
          className="object-cover"
        />
        <AvatarFallback className="rounded-full bg-slate-800 text-slate-400 text-sm font-bold">
          {player.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-1 text-center min-w-0 w-full">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <PlayerTitle title={player.title} />
          <a
            href={player.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-slate-100 hover:text-amber-400 transition-colors truncate max-w-full"
          >
            {player.username}
          </a>
        </div>
        {player.name && (
          <span className="text-[11px] text-slate-600 truncate w-full">
            {player.name}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center">
        <span
          className={`font-mono text-2xl font-black tabular-nums ${ratingColor}`}
        >
          {player.score.toLocaleString()}
        </span>
        <span className="text-[10px] text-slate-600 uppercase tracking-widest mt-0.5">
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

  const activeTabMeta = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400/20">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-lg">{activeTabMeta.sup}</span>
            <div>
              <h1 className="font-serif text-base font-black text-slate-100 leading-none tracking-tight w-50">
                {activeTabMeta.label} Leaderboard
              </h1>
              <p className="text-[10px] text-slate-600 tracking-widest uppercase mt-0.5">
                Top 50 · Chess.com
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-0.5 bg-slate-900 border border-white/5 p-1 rounded-xl overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/leaderboard?tab=${tab.id}`}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className="text-sm">{tab.sup}</span>
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 md:px-10 py-10 space-y-10">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/5" />
            <span className="text-[11px] text-slate-600 font-mono uppercase tracking-widest">
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
            <span className="text-[11px] text-slate-600 font-mono uppercase tracking-widest">
              Rankings
            </span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/5" />
          </div>

          <div className="rounded-2xl border border-white/5 overflow-hidden bg-slate-900/30">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="w-16 text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold py-3.5">
                    Rank
                  </TableHead>
                  <TableHead className="text-[10px] text-slate-600 uppercase tracking-widest font-bold py-3.5 w-60">
                    Player
                  </TableHead>
                  <TableHead className="text-right text-[10px] text-slate-600 uppercase tracking-widest font-bold py-3.5 w-60">
                    Rating
                  </TableHead>
                  <TableHead className="text-right text-[10px] text-slate-600 uppercase tracking-widest font-bold py-3.5 hidden sm:table-cell w-50 ">
                    W · D · L
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rest.map((player, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <TableRow
                      key={player.player_id}
                      className={`border-white/4 transition-colors group ${
                        isEven ? "bg-white/1" : ""
                      } hover:bg-amber-400/5`}
                    >
                      <TableCell className="text-center py-3.5 w-16">
                        <span className="font-mono text-sm tabular-nums text-slate-500 font-medium">
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
                            <AvatarFallback className="rounded-full bg-slate-800 text-slate-500 text-[11px] font-bold">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0 gap-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <PlayerTitle title={player.title} />
                              <a
                                href={player.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors truncate"
                              >
                                {player.username}
                              </a>
                            </div>
                            {player.name && (
                              <span className="text-[11px] text-slate-600 truncate">
                                {player.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right py-3.5 w-60">
                        <span className="font-mono text-base font-black tabular-nums text-slate-200 group-hover:text-amber-400 transition-colors">
                          {player.score.toLocaleString()}
                        </span>
                      </TableCell>

                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <WinLossRecord
                          wins={player.win_count}
                          draws={player.draw_count}
                          losses={player.loss_count}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>

        <footer className="text-center text-[11px] text-slate-700 font-mono pb-6 tracking-wide">
          Refreshes every hour &nbsp;·&nbsp; Source: Chess.com Public API
        </footer>
      </main>
    </div>
  );
};

export default LeaderBoardPage;
