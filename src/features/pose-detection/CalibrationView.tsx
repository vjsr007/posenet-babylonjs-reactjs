import { calibrate } from "@/lib/normalize";
import { useEffect, useRef, useState } from "react";
import { usePoseDetection } from "./usePoseDetection";
import { usePoseStore } from "./usePoseStore";

interface Props {
  /** Texto de cabecera. */
  title?: string;
  /** Texto descriptivo. */
  description?: string;
  /** Llamado una vez se calibra correctamente. */
  onCalibrated: () => void;
  /** Botón opcional para volver al lobby. */
  onCancel?: () => void;
}

/**
 * Vista de calibración T-pose reutilizable por todos los juegos.
 * Captura la pose 3 segundos después de pulsar el botón.
 */
export function CalibrationView({
  title = "Calibración",
  description = "Adopta la pose en T (brazos extendidos a los lados) y mantén 3 segundos.",
  onCalibrated,
  onCancel,
}: Props): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePoseDetection(videoRef);

  const ready = usePoseStore((s) => s.ready);
  const error = usePoseStore((s) => s.error);
  const setCalibration = usePoseStore((s) => s.setCalibration);
  const calibration = usePoseStore((s) => s.calibration);

  const [countdown, setCountdown] = useState(3);
  const [calibrating, setCalibrating] = useState(false);

  useEffect(() => {
    if (calibration) onCalibrated();
  }, [calibration, onCalibrated]);

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
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-white/60">{description}</p>
        <div className="relative aspect-video bg-arena-surface rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
          />
          {!ready && !error && (
            <div className="absolute inset-0 grid place-items-center bg-black/60 text-white/80">
              Cargando MoveNet...
            </div>
          )}
          {error && (
            <div className="absolute inset-0 grid place-items-center bg-black/80 text-center px-6">
              <div className="space-y-3">
                <p className="text-red-400 font-bold">No se pudo iniciar la cámara</p>
                <p className="text-white/70 text-sm">{error}</p>
                <button
                  type="button"
                  onClick={() => location.reload()}
                  className="arena-btn-primary"
                >
                  Recargar
                </button>
              </div>
            </div>
          )}
          {calibrating && (
            <div className="absolute inset-0 grid place-items-center bg-black/40">
              <span className="text-7xl font-bold text-arena-accent2">{countdown}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={captureCalibration}
            disabled={!ready || calibrating || !!error}
            className="arena-btn-primary"
          >
            {calibrating ? "Capturando..." : "Capturar T-pose"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="arena-btn-ghost">
              Volver
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
