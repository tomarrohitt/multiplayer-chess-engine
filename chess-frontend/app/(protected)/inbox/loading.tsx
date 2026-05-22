import { MessageSquare } from "lucide-react";

export default function InboxLoading() {
  return (
    <div
      aria-hidden="true"
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
  );
}
