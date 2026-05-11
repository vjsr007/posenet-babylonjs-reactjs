import { Play, Sparkles } from "lucide-react";
import { useGameStore } from "../state";

export function MenuScreen(): JSX.Element {
  const start = useGameStore((s) => s.start);
  return (
    <div className="h-full grid place-items-center px-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-arena-accent2 text-sm font-mono">
          <Sparkles size={16} /> v1 · Pose Match
        </div>
        <h2 className="text-4xl font-bold leading-tight">
          Imita la pose objetivo
          <br />
          <span className="text-arena-accent">con tu cuerpo</span>.
        </h2>
        <p className="text-white/60">
          Necesitas webcam y un espacio donde quepas de pie. 5 rondas, 4–5 segundos cada una.
        </p>
        <button type="button" onClick={start} className="arena-btn-primary text-lg px-6 py-3">
          <Play size={20} /> Empezar
        </button>
      </div>
    </div>
  );
}
