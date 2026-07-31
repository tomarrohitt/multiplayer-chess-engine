export function OpponentInfo({
  username,
  rating,
}: {
  username: string;
  rating: number;
}) {
  return (
    <p className="text-sm font-medium text-neutral-200 group-hover:text-neutral-100 transition-colors truncate">
      {username}
      <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-400 ml-1.5">
        ({rating})
      </span>
    </p>
  );
}
