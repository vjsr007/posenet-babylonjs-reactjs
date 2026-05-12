interface BreakdownRow {
  label: string;
  value: string | number;
}

interface ResultsCardProps {
  score: number;
  rating: string;
  breakdown: BreakdownRow[];
  onAgain: () => void;
  onExit: () => void;
}

export function ResultsCard({ score, rating, breakdown, onAgain, onExit }: ResultsCardProps) {
  return (
    <div className="mg-result-card">
      <div className="mg-result-eyebrow">Resultados</div>
      <div className="mg-result-score">{score.toLocaleString()}</div>
      <div className="mg-result-rating">{rating}</div>
      <div className="mg-result-breakdown">
        {breakdown.map((row) => (
          <div key={row.label} className="mg-result-row">
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>
      <div className="mg-result-actions">
        <button className="btn btn-ghost" type="button" onClick={onExit}>
          Salir
        </button>
        <button className="btn btn-primary" type="button" onClick={onAgain}>
          Otra ronda
        </button>
      </div>
    </div>
  );
}
