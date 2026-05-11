import { Gamepad2, Sparkles } from "lucide-react";
import { GAMES, type GameId, useLobbyStore } from "./state";

export function LobbyScreen(): JSX.Element {
  const open = useLobbyStore((s) => s.open);
  return (
    <div className="h-full px-6 py-10 grid place-items-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-arena-accent2 text-sm font-mono">
            <Sparkles size={16} /> PoseArena · Lobby
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Elige un <span className="text-arena-accent">juego</span>
          </h2>
          <p className="text-white/60">
            Necesitas webcam y un espacio donde quepas de pie. Todos los juegos usan tu pose
            corporal como mando.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GAMES.map((g) => (
            <GameCard key={g.id} id={g.id} onPlay={() => open(g.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface GameCardProps {
  id: GameId;
  onPlay: () => void;
}

function GameCard({ id, onPlay }: GameCardProps): JSX.Element {
  const meta = GAMES.find((g) => g.id === id);
  if (!meta) return <div />;
  return (
    <button
      type="button"
      onClick={onPlay}
      className="arena-card text-left hover:bg-arena-surface/80 transition-colors flex flex-col gap-3 group"
    >
      <div className="flex items-center justify-between">
        <Gamepad2 size={20} className="text-arena-accent2" />
        <span
          className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded ${
            meta.status === "ready"
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {meta.status}
        </span>
      </div>
      <h3 className="text-lg font-bold group-hover:text-arena-accent transition-colors">
        {meta.name}
      </h3>
      <p className="text-sm text-white/60">{meta.tagline}</p>
    </button>
  );
}
