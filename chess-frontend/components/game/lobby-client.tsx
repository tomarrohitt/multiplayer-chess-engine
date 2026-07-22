import { Zap, Flame, Clock, Timer } from "lucide-react";
import JoinButton from "./join-button";

const TIME_CONTROLS = [
  {
    icon: Zap,

    options: [
      { label: "1 + 0", category: "Bullet", value: "1+0" },
      { label: "2 + 1", category: "Bullet", value: "2+1" },
      { label: "3 + 0", category: "Bullet", value: "3+0" },
    ],
  },
  {
    icon: Flame,
    options: [
      { label: "3 + 2", category: "Blitz", value: "3+2" },
      { label: "5 + 0", category: "Blitz", value: "5+0" },
      { label: "5 + 3", category: "Blitz", value: "5+3" },
    ],
  },
  {
    icon: Clock,
    options: [
      { label: "10 + 0", category: "Rapid", value: "10+0" },
      { label: "10 + 5", category: "Rapid", value: "10+5" },
      { label: "15 + 10", category: "Rapid", value: "15+10" },
    ],
  },
  {
    icon: Timer,
    options: [
      { label: "30 + 0", category: "Classical", value: "30+0" },
      { label: "30 + 20", category: "Classical", value: "30+20" },
    ],
  },
];

export function LobbyClient() {
  return (
    <div className="py-5 lg:ml-16">
      <p className="font-mono text-3xl text-green-4 uppercase mb-2 tracking-wider">
        Find a game
      </p>

      <p className="font-mono text-sm text-neutral-1 tracking-wide">
        Choose your time control
      </p>

      <ul className="grid grid-cols-3 gap-3 mt-6">
        {TIME_CONTROLS.map(({ options, icon }) =>
          options.map(({ category, label, value }) => {
            return (
              <li key={value}>
                <JoinButton value={value} label={label} category={category} />
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}
