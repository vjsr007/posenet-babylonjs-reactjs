import { useLobbyStore } from "@/features/lobby/state";
import { CalibrationView } from "@/features/pose-detection/CalibrationView";
import { StatueMenuScreen } from "./screens/StatueMenuScreen";
import { StatuePlayingScreen } from "./screens/StatuePlayingScreen";
import { StatueResultScreen } from "./screens/StatueResultScreen";
import { useStatueStore } from "./state";

export function StatueGame(): JSX.Element {
  const phase = useStatueStore((s) => s.phase);
  const setPhase = useStatueStore((s) => s.setPhase);
  const reset = useStatueStore((s) => s.reset);
  const exit = useLobbyStore((s) => s.exit);

  if (phase === "menu") return <StatueMenuScreen />;
  if (phase === "calibration") {
    return (
      <CalibrationView
        title="Calibración · Estatua"
        onCalibrated={() => setPhase("playing")}
        onCancel={() => {
          reset();
          exit();
        }}
      />
    );
  }
  if (phase === "playing") return <StatuePlayingScreen />;
  return <StatueResultScreen />;
}
