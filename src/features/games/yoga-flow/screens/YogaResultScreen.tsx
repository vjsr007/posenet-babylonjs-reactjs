import { useLobbyStore } from "@/features/lobby/state";
import { ASANAS } from "../asanas";
import { useYogaStore } from "../state";

export function YogaResultScreen(): JSX.Element {
  const heldMsByAsana = useYogaStore((s) => s.heldMsByAsana);
  const start = useYogaStore((s) => s.start);
  const reset = useYogaStore((s) => s.reset);
  const exit = useLobbyStore((s) => s.exit);

  const totalHeld = heldMsByAsana.reduce((a, b) => a + b, 0);
  const totalTarget = ASANAS.slice(0, heldMsByAsana.length).reduce((a, b) => a + b.holdMs, 0);
  const pct = totalTarget > 0 ? Math.round((totalHeld / totalTarget) * 100) : 0;

  return (
    <div className="h-full grid place-items-center px-6">
      <div className="max-w-md w-full text-center space-y-6 arena-card">
        <h2 className="text-3xl font-bold">¡Namasté!</h2>
        <div className="space-y-1">
          <p className="text-6xl font-bold text-arena-accent2 font-mono">{pct}%</p>
          <p className="text-white/60 text-sm">de las asanas completadas</p>
        </div>
        <ul className="text-left text-sm text-white/70 font-mono space-y-1">
          {heldMsByAsana.map((ms, i) => {
            const asana = ASANAS[i];
            return (
              <li key={asana?.id ?? i} className="flex justify-between">
                <span>{asana?.name ?? `Asana ${i + 1}`}</span>
                <span>{(ms / 1000).toFixed(1)}s</span>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2 justify-center">
          <button type="button" onClick={start} className="arena-btn-primary">
            Reintentar
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              exit();
            }}
            className="arena-btn-ghost"
          >
            Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
