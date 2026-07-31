import { ProfileBackground } from "./_components/profile";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-neutral-6 relative overflow-hidden text-neutral-100">
      <ProfileBackground />

      <div className="relative z-10 max-w-275 mx-auto pt-6 px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
          {/* UserInfoCard skeleton */}
          <div className="bg-neutral-5 rounded-sm p-6 flex flex-col items-center relative overflow-hidden">
            {/* avatar */}
            <div className="relative mb-5">
              <div className="w-40 h-40 rounded-full bg-neutral-7 animate-pulse" />
            </div>

            <div className="w-36 h-8 bg-neutral-7 rounded animate-pulse" />
            <div className="w-20 h-4 bg-neutral-7 rounded mt-2 mb-3 animate-pulse" />

            {/* MiniStat grid: Games / Win Rate */}
            <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
              <div className="flex flex-col items-center py-3 px-2 gap-1 animate-pulse">
                <div className="w-8 h-5 bg-neutral-7 rounded" />
                <div className="w-14 h-2.5 bg-neutral-7 rounded" />
              </div>
              <div className="flex flex-col items-center py-3 px-2 gap-1 animate-pulse">
                <div className="w-8 h-5 bg-neutral-7 rounded" />
                <div className="w-14 h-2.5 bg-neutral-7 rounded" />
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-2">
              <div className="w-24 h-2.5 bg-neutral-7 rounded animate-pulse" />
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 bg-neutral-7 rounded animate-pulse" />
                <div className="w-28 h-3.5 bg-neutral-7 rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* RatingCard skeleton */}
            <div className="bg-neutral-5 rounded-sm backdrop-blur-sm px-7 py-4 relative overflow-hidden">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <div className="w-28 h-3 bg-neutral-6 rounded mb-3 animate-pulse" />
                  <div className="w-32 h-14 bg-neutral-6 rounded mb-2 animate-pulse" />
                  <div className="w-20 h-4 bg-neutral-6 rounded animate-pulse" />
                </div>
                <div className="shrink-0 w-30 h-30 rounded-full border-10 border-neutral-6 animate-pulse" />
              </div>
            </div>

            {/* StatCard x3 skeleton */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-neutral-5 rounded-sm py-8 px-4 flex flex-col items-center gap-2 animate-pulse"
                >
                  <div className="w-5 h-5 bg-neutral-6 rounded" />
                  <div className="w-12 h-9 bg-neutral-6 rounded" />
                </div>
              ))}
            </div>

            {/* PerformanceCard skeleton */}
            <div className="bg-neutral-5 rounded-sm py-5.5 px-6 animate-pulse">
              <div className="flex justify-between items-center mb-3.5">
                <div className="w-24 h-4 bg-neutral-6 rounded" />
                <div className="w-20 h-4 bg-neutral-6 rounded" />
              </div>
              <div className="h-1.75 rounded bg-neutral-6 overflow-hidden" />
              <div className="flex gap-5 mt-2.5">
                <div className="w-12 h-3 bg-neutral-6 rounded" />
                <div className="w-12 h-3 bg-neutral-6 rounded" />
                <div className="w-12 h-3 bg-neutral-6 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* RecentGames skeleton */}
        <div className="bg-neutral-5 border border-[#242424] rounded-sm backdrop-blur-sm py-5.5 px-6 mt-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-9 h-9 bg-neutral-6 rounded animate-pulse" />
            <div className="w-32 h-7 bg-neutral-6 rounded animate-pulse" />
          </div>

          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-stretch bg-neutral-6 rounded-sm overflow-hidden animate-pulse"
              >
                <div className="shrink-0 flex flex-col">
                  <div
                    style={{ width: 190, height: 190 }}
                    className="bg-neutral-5"
                  />
                  <div className="h-3 bg-[#242424] border-t border-[#242424]" />
                </div>

                <div className="flex flex-col flex-1 min-w-0 px-4 py-3 gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-28 h-5 bg-neutral-5 rounded" />
                      <div className="w-10 h-3 bg-neutral-5 rounded" />
                    </div>
                    <div className="w-12 h-5 bg-neutral-5 rounded shrink-0" />
                  </div>

                  <div className="w-16 h-4 bg-neutral-5 rounded mt-0.5" />

                  <div className="flex bg-neutral-5 rounded-md my-1 h-10" />

                  <div className="w-40 h-3 bg-neutral-5 rounded mt-1" />

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-3 bg-neutral-5 rounded" />
                      <span className="w-1 h-1 rounded-full bg-neutral-5" />
                      <div className="w-20 h-3 bg-neutral-5 rounded" />
                    </div>
                    <div className="w-10 h-3 bg-neutral-5 rounded" />
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
