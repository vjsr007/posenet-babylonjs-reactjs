import { usePoseDetection } from "@/features/pose-detection/usePoseDetection";
import { usePoseStore } from "@/features/pose-detection/usePoseStore";
import { calibrate } from "@/lib/normalize";
import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../state";

export function CalibrationScreen(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePoseDetection(videoRef);

  const ready = usePoseStore((s) => s.ready);
  const setCalibration = usePoseStore((s) => s.setCalibration);
  const calibration = usePoseStore((s) => s.calibration);
  const setPhase = useGameStore((s) => s.setPhase);
  const nextRound = useGameStore((s) => s.nextRound);

  const [countdown, setCountdown] = useState(3);
  const [calibrating, setCalibrating] = useState(false);

  useEffect(() => {
    if (calibration) {
      setPhase("countdown");
      nextRound();
    }
  }, [calibration, setPhase, nextRound]);

  function captureCalibration(): void {
    setCalibrating(true);
    let n = 3;
    setCountdown(n);
    const interval = setInterval(() => {
      n -= 1;
      setCountdown(n);
      if (n <= 0) {
        clearInterval(interval);
        const pose = usePoseStore.getState().pose;
        if (pose) {
          const cal = calibrate(pose);
          if (cal) setCalibration(cal);
          else setCalibrating(false);
        } else {
          setCalibrating(false);
        }
      }
    }, 1000);
  }

  return (
    <div className="h-full grid place-items-center px-6 py-8">
      <div className="max-w-3xl w-full space-y-4 text-center">
        <h2 className="text-3xl font-bold">Calibración</h2>
        <p className="text-white/60">
          Adopta la pose en T (brazos extendidos a los lados) y mantén 3 segundos.
        </p>
        <div className="relative aspect-video bg-arena-surface rounded-xl overflow-hidden">
          {/* mirror para UX */}
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
          />
          {!ready && (
            <div className="absolute inset-0 grid place-items-center bg-black/60 text-white/80">
              Cargando MoveNet...
            </div>
          )}
          {calibrating && (
            <div className="absolute inset-0 grid place-items-center bg-black/40">
              <span className="text-7xl font-bold text-arena-accent2">{countdown}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={captureCalibration}
          disabled={!ready || calibrating}
          className="arena-btn-primary"
        >
          {calibrating ? "Capturando..." : "Capturar T-pose"}
        </button>
      </div>
    </div>
  );
}
