import { useLobbyStore } from "@/features/lobby/state";
import { CalibrationView } from "@/features/pose-detection/CalibrationView";
import { YogaMenuScreen } from "./screens/YogaMenuScreen";
import { YogaResultScreen } from "./screens/YogaResultScreen";
import { YogaRoundScreen } from "./screens/YogaRoundScreen";
import { useYogaStore } from "./state";

export function YogaFlowGame(): JSX.Element {
  const phase = useYogaStore((s) => s.phase);
  const setPhase = useYogaStore((s) => s.setPhase);
  const reset = useYogaStore((s) => s.reset);
  const exit = useLobbyStore((s) => s.exit);

  if (phase === "menu") return <YogaMenuScreen />;
  if (phase === "calibration") {
    return (
      <CalibrationView
        title="Calibración · Yoga Flow"
        onCalibrated={() => setPhase("round")}
        onCancel={() => {
          reset();
          exit();
        }}
      />
    );
  }
  if (phase === "round") return <YogaRoundScreen />;
  return <YogaResultScreen />;
}
