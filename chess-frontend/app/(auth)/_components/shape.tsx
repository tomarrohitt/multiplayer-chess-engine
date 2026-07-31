import { cn } from "@/lib/utils";

export const AuthShape = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "absolute bottom-9 right-9 w-12 h-12 border-green-5/50 z-2 opacity-70 select-none",
        className,
      )}
    />
  );
};
