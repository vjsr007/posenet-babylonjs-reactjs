import { useLobbyStore } from "@/features/lobby/state";
import { useStatueStore } from "../state";

export function StatueResultScreen(): JSX.Element {
  const survivedMs = useStatueStore((s) => s.survivedMs);
  const start = useStatueStore((s) => s.start);
  const reset = useStatueStore((s) => s.reset);
  const exit = useLobbyStore((s) => s.exit);

  const seconds = (survivedMs / 1000).toFixed(1);

  return (
    <div className="h-full grid place-items-center px-6">
      <div className="max-w-md w-full text-center space-y-6 arena-card">
        <h2 className="text-3xl font-bold">¡Te pillaron!</h2>
        <div className="space-y-1">
          <p className="text-6xl font-bold text-arena-accent2 font-mono">{seconds}s</p>
          <p className="text-white/60 text-sm">de supervivencia</p>
        </div>
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
