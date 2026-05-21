export default function InboxIdLoading() {
  return (
    <>
      <div
        className="flex-1 flex flex-col rounded-2xl h-[calc(100vh-90px)] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="h-16 px-6 border-b border-white/10 flex items-center shrink-0"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
            <div className="space-y-1.5">
              <div className="w-24 h-4 rounded bg-white/10 animate-pulse" />
              <div className="w-16 h-3 rounded bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
          {[1, 2, 3, 4].map((i) => {
            const isMe = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`flex flex-col w-full max-w-[75%] ${
                  isMe ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div className="px-4 py-3 rounded-2xl bg-white/5 animate-pulse w-48 h-10" />
              </div>
            );
          })}
        </div>

        <div
          className="p-4 border-t border-white/10"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 h-10 rounded-xl bg-white/5 animate-pulse" />
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 animate-pulse shrink-0" />
          </div>
        </div>
      </div>

      <div
        className="w-72 flex flex-col rounded-2xl overflow-hidden shrink-0"
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
          <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse" />
          <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>
    </>
  );
}
