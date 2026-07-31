interface LegendDotProps {
  color: string;
  label: string;
}

interface StatCardProps {
  value: string | number;
  color: string;
  icon: React.ReactNode;
}

interface MiniStatProps {
  label: string;
  value: string | number;
}

export function LegendDot({ color, label }: LegendDotProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-[11px] text-neutral-400">{label}</span>
    </div>
  );
}

export function MiniStat({ label, value }: MiniStatProps) {
  return (
    <div className="flex flex-col items-center bg-neutral-5 py-3 px-2">
      <span className="text-lg font-bold text-[#e5e5e5]">{value}</span>
      <span className="text-[11px] text-neutral-300 mt-0.5 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function StatCard({ value, color, icon }: StatCardProps) {
  return (
    <div className="bg-neutral-5 rounded-sm py-8 px-4 flex flex-col items-center gap-1">
      <span className="text-md font-bold font-mono" style={{ color }}>
        {icon}
      </span>
      <span className="text-[36px] font-bold leading-[1.1]" style={{ color }}>
        {value}
      </span>
    </div>
  );
}
