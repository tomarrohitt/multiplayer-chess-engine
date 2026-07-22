import { DotSeparator } from "./dot-separator";

export function GameMeta({
  timeControl,
  status,
  date,
}: {
  timeControl: string;
  status: string;
  date: string;
}) {
  return (
    <div className="flex items-center gap-1.5 mt-0.5 font-mono  text-neutral-600">
      <span className="text-neutral-500 font-semibold text-md">
        {timeControl}
      </span>
      <DotSeparator />
      <span className="text-sm">{status}</span>
      <DotSeparator />
      <span className="text-sm">{date}</span>
    </div>
  );
}
