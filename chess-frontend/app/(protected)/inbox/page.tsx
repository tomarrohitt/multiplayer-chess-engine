import { MessageSquare } from "lucide-react";

export default function InboxPage() {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center text-neutral-400 rounded-sm"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="w-16 h-16 rounded-sm flex items-center justify-center mb-4"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <MessageSquare size={36} className="opacity-50" />
      </div>
      <p
        className="text-2xl font-semibold text-zinc-400"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Your Messages
      </p>
      <p className="text-md mt-1">Select a friend to start chatting</p>
    </div>
  );
}
