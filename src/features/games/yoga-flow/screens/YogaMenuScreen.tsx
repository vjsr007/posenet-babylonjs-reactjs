import { useLobbyStore } from "@/features/lobby/state";
import { Play, Sparkles } from "lucide-react";
import { useYogaStore } from "../state";

export function YogaMenuScreen(): JSX.Element {
  const start = useYogaStore((s) => s.start);
  const totalAsanas = useYogaStore((s) => s.totalAsanas);
  const exit = useLobbyStore((s) => s.exit);
  return (
    <div className="h-full grid place-items-center px-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-arena-accent2 text-sm font-mono">
          <Sparkles size={16} /> Juego · Yoga Flow
        </div>
        <h2 className="text-4xl font-bold leading-tight">
          Sostén la <span className="text-arena-accent">asana</span>.
        </h2>
        <p className="text-white/60">
          {totalAsanas} posturas. Cuando alcances el umbral mínimo de similitud, empezarás a
          acumular tiempo. Llega al objetivo para completar.
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
