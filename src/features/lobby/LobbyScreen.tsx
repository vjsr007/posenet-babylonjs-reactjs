import { GAME_CATALOG, type GameId, useLobbyStore } from "./state";

export function LobbyScreen(): JSX.Element {
  const openGame = useLobbyStore((s) => s.openGame);
  return (
    <div className="h-full px-6 py-10 grid place-items-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold leading-tight">
            Elige un <span className="text-arena-accent">juego</span>
          </h2>
          <p className="text-white/60">Necesitas webcam y un espacio donde quepas de pie.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GAME_CATALOG.map((g) => (
            <GameCard key={g.id} id={g.id} onPlay={() => openGame(g.id)} />
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
  const meta = GAME_CATALOG.find((g) => g.id === id);
  if (!meta) return <div />;
  return (
    <button
      type="button"
      onClick={onPlay}
      className="arena-card text-left hover:bg-arena-surface/80 transition-colors flex flex-col gap-3 group"
    >
      <h3 className="text-lg font-bold group-hover:text-arena-accent transition-colors">
        {meta.name}
      </h3>
      <p className="text-sm text-white/60">{meta.tag}</p>
    </button>
  );
}
