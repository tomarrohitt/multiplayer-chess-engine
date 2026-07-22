export const AnimatingRings = () => {
  return (
    <>
      <div className="absolute w-125 h-125 rounded-full border border-green-6/30 pointer-events-none animate-ring-pulse-delayed" />
      <div className="absolute w-95 h-95 rounded-full border border-green-3/20 pointer-events-none animate-ring-pulse" />
      <div className="absolute w-115 h-115 rounded-full pointer-events-none animate-green-6 bg-radial from-green-6/10  from-0% via-bg-green-3 via-40% to-transparent to-70%" />
    </>
  );
};
