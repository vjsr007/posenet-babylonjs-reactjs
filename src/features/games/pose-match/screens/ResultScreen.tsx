import { useGameStore } from "../state";

export function ResultScreen(): JSX.Element {
  const score = useGameStore((s) => s.score);
  const totalRounds = useGameStore((s) => s.totalRounds);
  const reset = useGameStore((s) => s.reset);
  const start = useGameStore((s) => s.start);

  const maxScore = totalRounds * 1000;
  const pct = Math.round((score / maxScore) * 100);

  return (
    <div className="h-full grid place-items-center px-6">
      <div className="max-w-md w-full text-center space-y-6 arena-card">
        <h2 className="text-3xl font-bold">¡Resultado!</h2>
        <div className="space-y-1">
          <p className="text-6xl font-bold text-arena-accent2 font-mono">{score}</p>
          <p className="text-white/60 text-sm">
            de {maxScore} ({pct}%)
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <button type="button" onClick={start} className="arena-btn-primary">
            Reintentar
          </button>
          <button type="button" onClick={reset} className="arena-btn-ghost">
            Menú
          </button>
        </div>
      </div>
    </div>
  );
}
