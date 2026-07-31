import JoinButton from "./join-button";

const TIME_CONTROLS = [
  {
    options: [
      { label: "1 + 0", value: "1+0" },
      { label: "2 + 1", value: "2+1" },
      { label: "3 + 0", value: "3+0" },
    ],
  },
  {
    options: [
      { label: "3 + 2", value: "3+2" },
      { label: "5 + 0", value: "5+0" },
      { label: "5 + 3", value: "5+3" },
    ],
  },
  {
    options: [
      { label: "10 + 0", value: "10+0" },
      { label: "10 + 5", value: "10+5" },
      { label: "15 + 10", value: "15+10" },
    ],
  },
  {
    options: [
      { label: "30 + 0", value: "30+0" },
      { label: "30 + 20", value: "30+20" },
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
        {TIME_CONTROLS.map(({ options }) =>
          options.map(({ label, value }) => {
            return (
              <li key={value}>
                <JoinButton value={value} label={label} />
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}
