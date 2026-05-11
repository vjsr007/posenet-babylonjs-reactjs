import { CalibrationView } from "@/features/pose-detection/CalibrationView";
import { useGameStore } from "../state";

export function CalibrationScreen(): JSX.Element {
  const setPhase = useGameStore((s) => s.setPhase);
  const nextRound = useGameStore((s) => s.nextRound);

  return (
    <CalibrationView
      onCalibrated={() => {
        setPhase("countdown");
        nextRound();
      }}
    />
  );
}
