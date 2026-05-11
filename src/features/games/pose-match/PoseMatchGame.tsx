import { CalibrationScreen } from "./screens/CalibrationScreen";
import { CountdownScreen } from "./screens/CountdownScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { RoundScreen } from "./screens/RoundScreen";
import { useGameStore } from "./state";

export function PoseMatchGame(): JSX.Element {
  const phase = useGameStore((s) => s.phase);
  return (
    <>
      {phase === "menu" && <MenuScreen />}
      {phase === "calibration" && <CalibrationScreen />}
      {phase === "countdown" && <CountdownScreen />}
      {phase === "round" && <RoundScreen />}
      {phase === "result" && <ResultScreen />}
    </>
  );
}
