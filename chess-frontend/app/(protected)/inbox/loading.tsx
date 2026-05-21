import { MessageSquare } from "lucide-react";

export default function InboxLoading() {
  return (
    <div className="flex-1 max-w-6xl w-full mx-auto flex gap-x-2 h-[calc(100vh-100px)] py-2 px-4">
      <div
        className="w-80 shrink-0 flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="p-4 border-b border-white/10">
          <div className="h-10 rounded-xl bg-white/5 animate-pulse w-full" />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 shrink-0" />
              <div className="flex-1 min-w-0 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-4 rounded bg-white/10" />
                  <div className="w-8 h-3 rounded bg-white/5" />
                </div>
                <div className="w-32 h-3 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center text-zinc-500 rounded-2xl h-[calc(100vh-90px)]"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4 animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <MessageSquare size={32} className="opacity-20" />
        </div>
        <div className="w-32 h-5 rounded bg-white/10 animate-pulse mb-2" />
        <div className="w-48 h-3 rounded bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}
