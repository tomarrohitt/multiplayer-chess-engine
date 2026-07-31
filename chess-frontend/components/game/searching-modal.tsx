"use client";
import { useGameStore } from "@/store/use-game-store";
import { useSocket } from "@/store/socket-provider";
import { Loader2 } from "lucide-react";
import { QueueStatus } from "@/types/chess";
import Image from "next/image";
import Stamp from "@/public/assets/lottie/Stamp.svg";

export function SearchingModal() {
  const queueStatus = useGameStore((s) => s.queueStatus);
  const queueTimeControl = useGameStore((s) => s.queueTimeControl);
  const { leaveQueue } = useSocket();

  if (queueStatus !== QueueStatus.WAITING) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center">
      <div className="bg-neutral-5 border  rounded-sm p-4 flex flex-col items-center gap-5 shadow-2xl w-108 h-90">
        <Image
          src={Stamp}
          width={200}
          height={200}
          alt="Stamp"
          className="absolute"
        />
        <div className="h-42" />
        <div className="text-center">
          <p className="text-neutral-400 text-xl">
            Searching for a {queueTimeControl ? `${queueTimeControl} ` : ""}
            match...
          </p>
        </div>

        <div className="flex items-center gap-2 text-neutral-500 text-md">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>In queue</span>
        </div>

        <button
          onClick={() => leaveQueue()}
          className="bg-red-500/60 hover:bg-red-500/50 text-white font-semibold px-4 py-1 rounded-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
