import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400/20">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-5 h-5 rounded bg-slate-800 animate-pulse" />
            <div>
              <div className="w-48 h-5 rounded bg-slate-800 animate-pulse mb-1" />
              <div className="w-24 h-3 rounded bg-slate-800 animate-pulse" />
            </div>
          </div>

          <nav className="flex items-center gap-0.5 bg-slate-900 border border-white/5 p-1 rounded-xl overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-21 h-7 rounded-lg bg-slate-800/50 animate-pulse mx-0.5 my-0.5"
              />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800 animate-pulse" />
            <div className="w-8 h-3 rounded bg-slate-800 animate-pulse" />
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
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative flex flex-col items-center gap-3 rounded-2xl border border-slate-800/50 bg-slate-900/20 px-5 py-6 flex-1 min-w-0 animate-pulse"
              >
                <div className="w-14 h-14 rounded-full bg-slate-800" />
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <div className="w-24 h-4 rounded bg-slate-800" />
                  <div className="w-16 h-3 rounded bg-slate-800" />
                </div>
                <div className="flex flex-col items-center mt-2 gap-1.5">
                  <div className="w-20 h-6 rounded bg-slate-800" />
                  <div className="w-10 h-2.5 rounded bg-slate-800" />
                </div>
                <div className="w-6 h-6 rounded bg-slate-800 mt-1" />
              </div>
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
                {Array.from({ length: 15 }).map((_, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <TableRow
                      key={index}
                      className={`border-white/4 transition-colors ${
                        isEven ? "bg-white/1" : ""
                      } hover:bg-transparent`}
                    >
                      <TableCell className="text-center py-3.5 w-16">
                        <div className="w-4 h-4 rounded bg-slate-800 animate-pulse mx-auto" />
                      </TableCell>

                      <TableCell className="py-3.5 w-60">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse shrink-0" />
                          <div className="flex flex-col min-w-0 gap-1.5">
                            <div className="w-24 h-3.5 rounded bg-slate-800 animate-pulse" />
                            <div className="w-16 h-2.5 rounded bg-slate-800 animate-pulse" />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right py-3.5 w-60">
                        <div className="w-16 h-5 rounded bg-slate-800 animate-pulse ml-auto" />
                      </TableCell>

                      <TableCell className="text-right py-3.5 hidden sm:table-cell w-60">
                        <div className="flex flex-col items-end gap-1.5">
                          <div className="w-24 h-3.5 rounded bg-slate-800 animate-pulse" />
                          <div className="w-12 h-2.5 rounded bg-slate-800 animate-pulse" />
                        </div>
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

export default Loading;
