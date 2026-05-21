import { Swords } from "lucide-react";
import { ProfileBackground } from "./_components/profile";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] relative overflow-hidden font-['Georgia','Times_New_Roman',serif] text-[#d4d4d4]">
      <ProfileBackground />

      <div className="relative z-10 max-w-275 mx-auto pt-6 px-6 pb-12">
        <div className="flex justify-between items-center mb-9">
          <div className="flex items-center gap-2.5">
            <span className="text-[28px] drop-shadow-[0_0_6px_rgba(74,222,128,0.4)]">
              ♔
            </span>
            <span className="text-[20px] font-bold tracking-wider text-[#e5e5e5]">
              ChessBoard
            </span>
          </div>
          <div className="w-24 h-8 bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-[20px] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
          <div className="flex flex-col gap-3.5">
            <div className="bg-[#141414] border border-[#242424] rounded-[14px] backdrop-blur-sm pt-8 px-6 pb-8 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#4ade80] to-transparent opacity-70" />

              <div className="relative mb-4.5 w-25 h-25 rounded-full bg-[#1a1a1a] animate-pulse border-2 border-[#2a2a2a] shadow-[0_0_20px_rgba(0,0,0,0.8)]" />

              <div className="w-32 h-6 bg-[#1a1a1a] rounded mt-2 mb-2 animate-pulse" />
              <div className="w-24 h-4 bg-[#1a1a1a] rounded mb-3 animate-pulse" />

              <div className="w-28 h-6 bg-[#1a1a1a] rounded-[20px] animate-pulse" />

              <div className="w-full h-px bg-[#1f1f1f] my-4" />

              <div className="grid grid-cols-2 gap-2.5 w-full">
                <div className="bg-[#111] rounded-[10px] py-3 px-2 border border-[#1e1e1e] flex flex-col items-center gap-1 animate-pulse">
                  <div className="w-10 h-6 bg-[#1a1a1a] rounded" />
                  <div className="w-12 h-3 bg-[#1a1a1a] rounded" />
                </div>
                <div className="bg-[#111] rounded-[10px] py-3 px-2 border border-[#1e1e1e] flex flex-col items-center gap-1 animate-pulse">
                  <div className="w-10 h-6 bg-[#1a1a1a] rounded" />
                  <div className="w-12 h-3 bg-[#1a1a1a] rounded" />
                </div>
              </div>

              <div className="mt-7 w-full flex flex-col items-center gap-2">
                <div className="w-20 h-3 bg-[#1a1a1a] rounded animate-pulse" />
                <div className="w-32 h-4 bg-[#1a1a1a] rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="bg-[#141414] border border-[#242424] rounded-[14px] backdrop-blur-sm p-7 relative overflow-hidden">
              <div className="absolute -top-15 -right-15 w-55 h-55 bg-[radial-gradient(circle,rgba(74,222,128,0.04)_0%,transparent_70%)] rounded-full" />
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <div className="w-24 h-3 bg-[#1a1a1a] rounded mb-3 animate-pulse" />
                  <div className="w-32 h-12 bg-[#1a1a1a] rounded mb-2 animate-pulse" />
                  <div className="w-16 h-3 bg-[#1a1a1a] rounded animate-pulse" />
                </div>
                <div className="w-30 h-30 rounded-full border-10 border-[#1a1a1a] animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#141414] border border-[#242424] rounded-[14px] backdrop-blur-sm py-5 px-4 flex flex-col items-center gap-2 animate-pulse"
                >
                  <div className="w-5 h-5 bg-[#1a1a1a] rounded" />
                  <div className="w-12 h-8 bg-[#1a1a1a] rounded" />
                  <div className="w-14 h-3 bg-[#1a1a1a] rounded" />
                </div>
              ))}
            </div>

            <div className="bg-[#141414] border border-[#242424] rounded-[14px] backdrop-blur-sm py-5.5 px-6 animate-pulse">
              <div className="flex justify-between items-center mb-3.5">
                <div className="w-24 h-4 bg-[#1a1a1a] rounded" />
                <div className="w-20 h-4 bg-[#1a1a1a] rounded" />
              </div>
              <div className="h-1.75 rounded bg-[#1a1a1a] overflow-hidden gap-0.5" />
              <div className="flex gap-5 mt-2.5">
                <div className="w-12 h-3 bg-[#1a1a1a] rounded" />
                <div className="w-12 h-3 bg-[#1a1a1a] rounded" />
                <div className="w-12 h-3 bg-[#1a1a1a] rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#242424] rounded-[14px] backdrop-blur-sm py-5.5 px-6 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <Swords size={15} color="#4ade80" />
            <span className="text-[14px] font-semibold text-[#e5e5e5]">
              Recent Games
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-stretch bg-[#0c0c0c] border border-[#242424] rounded-lg overflow-hidden h-41 animate-pulse"
              >
                <div className="w-41 h-41 bg-[#1a1a1a] shrink-0 border-r border-[#242424]" />

                <div className="flex flex-col flex-1 px-4 py-3 gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-2 w-full">
                      <div className="w-8 h-3 bg-[#1a1a1a] rounded" />
                      <div className="w-32 h-5 bg-[#1a1a1a] rounded" />
                      <div className="w-24 h-4 bg-[#1a1a1a] rounded" />
                    </div>
                    <div className="w-12 h-6 bg-[#1a1a1a] rounded shrink-0" />
                  </div>

                  <div className="h-12 bg-[#1a1a1a] rounded-md mt-1 w-full" />

                  <div className="flex items-center gap-2 min-h-4 mt-2">
                    <div className="w-48 h-4 bg-[#1a1a1a] rounded" />
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-1">
                    <div className="w-40 h-3 bg-[#1a1a1a] rounded" />
                    <div className="w-10 h-3 bg-[#1a1a1a] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
