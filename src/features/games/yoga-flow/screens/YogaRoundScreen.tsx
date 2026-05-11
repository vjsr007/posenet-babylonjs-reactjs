import { TargetPoseView } from "@/features/games/pose-match/components/TargetPoseView";
import { useLobbyStore } from "@/features/lobby/state";
import { usePoseDetection } from "@/features/pose-detection/usePoseDetection";
import { usePoseStore } from "@/features/pose-detection/usePoseStore";
import { normalizePose } from "@/lib/normalize";
import { scorePose } from "@/lib/scoring";
import { useEffect, useRef } from "react";
import { ASANAS } from "../asanas";
import { useYogaStore } from "../state";

const SIMILARITY_THRESHOLD = 0.7; // GOOD o mejor

export function YogaRoundScreen(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePoseDetection(videoRef);

  const asanaIndex = useYogaStore((s) => s.asanaIndex);
  const totalAsanas = useYogaStore((s) => s.totalAsanas);
  const recordHold = useYogaStore((s) => s.recordHold);
  const exit = useLobbyStore((s) => s.exit);

  const asana = ASANAS[asanaIndex] ?? ASANAS[0];

  const similarityRef = useRef<HTMLSpanElement>(null);
  const heldRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!asana) return;
    let raf = 0;
    let cancelled = false;
    let heldMs = 0;
    let lastFrame = performance.now();

    if (targetRef.current) targetRef.current.textContent = (asana.holdMs / 1000).toFixed(0);

    const tick = (): void => {
      if (cancelled) return;
      const now = performance.now();
      const dt = now - lastFrame;
      lastFrame = now;

      const pose = usePoseStore.getState().pose;
      const calibration = usePoseStore.getState().calibration;
      let similarity = 0;
      if (pose && calibration) {
        const norm = normalizePose(pose, calibration);
        similarity = scorePose(norm, asana.pose).similarity;
      }
      if (similarityRef.current) {
        similarityRef.current.textContent = (similarity * 100).toFixed(0);
      }
      if (similarity >= SIMILARITY_THRESHOLD) {
        heldMs = Math.min(asana.holdMs, heldMs + dt);
      }
      const pct = (heldMs / asana.holdMs) * 100;
      if (heldRef.current) heldRef.current.textContent = (heldMs / 1000).toFixed(1);
      if (barRef.current) barRef.current.style.width = `${pct.toFixed(1)}%`;

      if (heldMs >= asana.holdMs) {
        cancelled = true;
        recordHold(heldMs);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [asana, recordHold]);

  if (!asana) return <div className="p-8">No hay asanas configuradas.</div>;

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div className="arena-card flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-white/50 font-mono">
            Asana {asanaIndex + 1} / {totalAsanas} · {asana.name}
          </p>
          <button type="button" onClick={exit} className="arena-btn-ghost py-1 px-2 text-xs">
            Salir
          </button>
        </div>
        <TargetPoseView pose={asana.pose} />
      </div>
      <div className="arena-card flex flex-col">
        <p className="text-xs text-white/50 font-mono mb-2">Tu cámara</p>
        <div className="relative flex-1 bg-black/40 rounded overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
          />
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1 font-mono text-sm bg-black/60 rounded-md px-3 py-2">
            <div>
              match <span ref={similarityRef}>0</span>%
            </div>
            <div>
              hold <span ref={heldRef}>0.0</span>/<span ref={targetRef}>0</span>s
            </div>
          </div>
        </div>
        <div className="mt-3 h-3 bg-arena-bg/60 rounded overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-arena-accent transition-[width] duration-75"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
