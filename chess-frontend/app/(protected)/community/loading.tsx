import { Bell, Search, Users, UserX } from "lucide-react";
import { PlayerListSkeleton } from "./_components/community-shared";

const TABS = [
  {
    id: "friends",
    label: "Friends",
    icon: Users,
  },
  {
    id: "find",
    label: "Find Players",
    icon: Search,
  },
  {
    id: "requests",
    label: "Requests",
    icon: Bell,
  },
  {
    id: "blocked",
    label: "Blocked",
    icon: UserX,
  },
] as const;
export default function CommunityLoading() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "#0d0d10",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]" />

      <div className="relative max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1
            className="text-2xl font-bold text-white tracking-tight mb-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Community
          </h1>
          <p className="text-sm text-zinc-500">
            Manage your connections, discover players, handle requests.
          </p>
        </div>

        <div
          className="flex gap-1 p-1 rounded-2xl mb-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {TABS.map(({ id, icon: Icon, label }) => (
            <div
              key={id}
              className="relative rounded-full px-3 py-1.5 text-sm font-semibold text-white outline-sky-400 transition focus-visible:outline-2 flex-1 flex items-center justify-center gap-1.5 h-9 cursor-pointer"
            >
              {id === "friends" && (
                <span
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.1)",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              )}
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="w-full h-10 rounded-xl animate-pulse"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <PlayerListSkeleton />
        </div>
      </div>
    </div>
  );
}
