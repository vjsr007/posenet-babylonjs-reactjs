import { useLobbyStore } from "@/features/lobby/state";
import { Play, Sparkles } from "lucide-react";
import { useStatueStore } from "../state";

export function StatueMenuScreen(): JSX.Element {
  const start = useStatueStore((s) => s.start);
  const exit = useLobbyStore((s) => s.exit);
  return (
    <div className="h-full grid place-items-center px-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-arena-accent2 text-sm font-mono">
          <Sparkles size={16} /> Juego · Estatua
        </div>
        <h2 className="text-4xl font-bold leading-tight">
          Muévete con la <span className="text-arena-accent">música</span>.<br />
          Quédate quieto cuando para.
        </h2>
        <p className="text-white/60">
          3 vidas. Si te mueves durante la fase roja, pierdes una. Sobrevive lo más posible.
        </p>
        <div className="flex justify-center gap-2">
          <button type="button" onClick={start} className="arena-btn-primary text-lg px-6 py-3">
            <Play size={20} /> Empezar
          </button>
          <button type="button" onClick={exit} className="arena-btn-ghost">
            Volver al lobby
          </button>
        </div>
      </div>
    </div>
  );
}
