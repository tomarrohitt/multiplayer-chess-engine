import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardNav } from "./_components/leaderboard-nav";

const Loading = () => {
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
        <LeaderboardNav active={"live_blitz"} />
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
            {[1, 2, 3].map((player) => {
              return (
                <div
                  key={player}
                  className="rounded-sm bg-neutral-5/70 h-72 animate-pulse"
                />
              );
            })}
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
                {/* Changed length from 10 to 47 to match the actual data (50 total minus 3 podium) */}
                {Array.from({ length: 47 }).map((_, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <TableRow
                      key={index}
                      className={`border-white/4 transition-colors ${
                        isEven ? "bg-white/1" : ""
                      } hover:bg-transparent`}
                    >
                      {/* Rank */}
                      <TableCell className="text-center py-3.5 w-16">
                        <div className="w-4 h-4 rounded bg-neutral-800 animate-pulse mx-auto" />
                      </TableCell>

                      {/* Player Info */}
                      <TableCell className="py-3.5 w-60">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse shrink-0" />
                          <div className="flex flex-col min-w-0 gap-1.5">
                            <div className="w-24 h-3.5 rounded bg-neutral-800 animate-pulse" />
                            <div className="w-16 h-2.5 rounded bg-neutral-800 animate-pulse" />
                          </div>
                        </div>
                      </TableCell>

                      {/* Rating */}
                      <TableCell className="text-right py-3.5 w-60">
                        <div className="w-12 h-5 rounded bg-neutral-800 animate-pulse ml-auto" />
                      </TableCell>

                      {/* Wins (W) */}
                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <div className="w-6 h-5 rounded bg-neutral-800 animate-pulse ml-auto" />
                      </TableCell>

                      {/* Draws (D) */}
                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <div className="w-6 h-5 rounded bg-neutral-800 animate-pulse ml-auto" />
                      </TableCell>

                      {/* Losses (L) */}
                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <div className="w-6 h-5 rounded bg-neutral-800 animate-pulse ml-auto" />
                      </TableCell>

                      {/* Win Ratio */}
                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <div className="w-8 h-5 rounded bg-neutral-800 animate-pulse ml-auto" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Updated footer styling to match the real page.tsx exactly */}
        <footer className="text-center text-lg text-neutral-500 font-mono pb-6 tracking-wide">
          Refreshes every hour &nbsp;·&nbsp; Source: Chess.com Public API
        </footer>
      </main>
    </div>
  );
};

export default Loading;
