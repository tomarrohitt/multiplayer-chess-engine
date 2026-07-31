export default function InboxIdLoading() {
  return (
    <>
      <div
        aria-hidden="true"
        className="flex-1 flex flex-col rounded-sm h-[calc(100svh-16px)] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="h-16 px-6 border-b border-white/10 flex items-center justify-between shrink-0"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/5 animate-pulse shrink-0" />
            <div className="space-y-2">
              <div className="w-24 h-4 rounded bg-white/10 animate-pulse" />
              <div className="w-16 h-3 rounded bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-end gap-4 overflow-hidden">
          <div className="self-start w-64 h-10 rounded-sm rounded-bl-sm bg-zinc-800 animate-pulse" />
          <div className="self-end w-48 h-10 rounded-sm rounded-br-sm bg-blue-600/20 animate-pulse" />
          <div className="self-start w-56 h-10 rounded-sm rounded-bl-sm bg-zinc-800 animate-pulse" />
        </div>

        <div
          className="border-white/10 shrink-0"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center">
            <div className="flex-1 h-10 bg-white/5 animate-pulse" />
            <div className="w-10 h-10 bg-blue-600/20 animate-pulse shrink-0" />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="w-72 flex flex-col rounded-sm overflow-hidden shrink-0"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="p-6 flex flex-col items-center border-b border-white/10"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="w-20 h-20 rounded-full bg-white/5 animate-pulse" />
          <div className="w-32 h-5 rounded bg-white/10 animate-pulse mt-4 mb-2" />
          <div className="w-20 h-3 rounded bg-white/5 animate-pulse" />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="w-full h-11 rounded-sm bg-white/5 animate-pulse" />
          <div className="w-full h-11 rounded-sm bg-white/5 animate-pulse" />
        </div>
      </div>
    </>
  );
}
