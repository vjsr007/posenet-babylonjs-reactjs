import { CalibrationScreen } from "@/features/games/pose-match/screens/CalibrationScreen";
import { CountdownScreen } from "@/features/games/pose-match/screens/CountdownScreen";
import { MenuScreen } from "@/features/games/pose-match/screens/MenuScreen";
import { ResultScreen } from "@/features/games/pose-match/screens/ResultScreen";
import { RoundScreen } from "@/features/games/pose-match/screens/RoundScreen";
import { useGameStore } from "@/features/games/pose-match/state";

export function App() {
  const phase = useGameStore((s) => s.phase);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-arena-accent2">Pose</span>
          <span className="text-arena-accent">Arena</span>
        </h1>
        <span className="text-sm text-white/50 font-mono">v1 · pose-match</span>
      </header>
      <main className="flex-1">
        {phase === "menu" && <MenuScreen />}
        {phase === "calibration" && <CalibrationScreen />}
        {phase === "countdown" && <CountdownScreen />}
        {phase === "round" && <RoundScreen />}
        {phase === "result" && <ResultScreen />}
      </main>
    </div>
  );
}
