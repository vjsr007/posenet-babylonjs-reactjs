import { PoseMatchGame } from "@/features/games/pose-match/PoseMatchGame";
import { StatueGame } from "@/features/games/statue-game/StatueGame";
import { YogaFlowGame } from "@/features/games/yoga-flow/YogaFlowGame";
import { LobbyScreen } from "@/features/lobby/LobbyScreen";
import { GAMES, useLobbyStore } from "@/features/lobby/state";
import { ChevronLeft } from "lucide-react";

export function App() {
  const current = useLobbyStore((s) => s.current);
  const exit = useLobbyStore((s) => s.exit);
  const meta = current ? GAMES.find((g) => g.id === current) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {current && (
            <button
              type="button"
              onClick={exit}
              className="arena-btn-ghost py-1 px-2 text-xs"
              aria-label="Volver al lobby"
            >
              <ChevronLeft size={14} /> Lobby
            </button>
          )}
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-arena-accent2">Pose</span>
            <span className="text-arena-accent">Arena</span>
          </h1>
        </div>
        <span className="text-sm text-white/50 font-mono">
          {meta ? `v1 · ${meta.id}` : "v1 · lobby"}
        </span>
      </header>
      <main className="flex-1">
        {current === null && <LobbyScreen />}
        {current === "pose-match" && <PoseMatchGame />}
        {current === "statue-game" && <StatueGame />}
        {current === "yoga-flow" && <YogaFlowGame />}
      </main>
    </div>
  );
}
