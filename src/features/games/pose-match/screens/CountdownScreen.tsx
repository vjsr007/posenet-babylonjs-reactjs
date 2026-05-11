import { useEffect, useState } from "react";
import { useGameStore } from "../state";

export function CountdownScreen(): JSX.Element {
  const setPhase = useGameStore((s) => s.setPhase);
  const round = useGameStore((s) => s.round);
  const totalRounds = useGameStore((s) => s.totalRounds);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      setPhase("round");
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 800);
    return () => clearTimeout(id);
  }, [count, setPhase]);

  return (
    <div className="h-full grid place-items-center">
      <div className="text-center space-y-3">
        <p className="text-white/60 font-mono text-sm">
          Ronda {round} / {totalRounds}
        </p>
        <span className="text-9xl font-bold text-arena-accent2">{count > 0 ? count : "¡YA!"}</span>
      </div>
    </div>
  );
}
