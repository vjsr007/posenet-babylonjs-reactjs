import { usePoseDetection } from "@/features/pose-detection/usePoseDetection";
import { usePoseStore } from "@/features/pose-detection/usePoseStore";
import { normalizePose } from "@/lib/normalize";
import { type ScoreTier, scorePose } from "@/lib/scoring";
import { useEffect, useMemo, useRef } from "react";
import { GameHUD } from "../components/GameHUD";
import { TargetPoseView } from "../components/TargetPoseView";
import { TARGET_POSES, type TargetPose, pickRandomPoses } from "../poses";
import { useGameStore } from "../state";

/**
 * Pantalla de ronda. NO re-renderiza durante el rAF loop:
 * - HUD (score/similarity) se actualiza vía refs.
 * - Solo el cambio de fase (round end) dispara setState.
 */
export function RoundScreen(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePoseDetection(videoRef);

  const round = useGameStore((s) => s.round);
  const totalRounds = useGameStore((s) => s.totalRounds);
  const addScore = useGameStore((s) => s.addScore);
  const nextRound = useGameStore((s) => s.nextRound);

  // Selecciona poses una vez por sesión
  const sessionPoses = useMemo<TargetPose[]>(() => {
    return pickRandomPoses(Math.min(useGameStore.getState().totalRounds, TARGET_POSES.length));
  }, []);
  const target = sessionPoses[Math.max(0, round - 1)] ?? sessionPoses[0];

  const similarityRef = useRef<HTMLSpanElement>(null);
  const tierRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const bestRef = useRef<{ similarity: number; tier: ScoreTier }>({
    similarity: 0,
    tier: "MISS",
  });

  useEffect(() => {
    if (!target) return;
    const startTs = performance.now();
    let raf = 0;

    const tick = (): void => {
      const elapsed = performance.now() - startTs;
      const remaining = Math.max(0, target.durationMs - elapsed);
      if (timeRef.current) timeRef.current.textContent = (remaining / 1000).toFixed(1);

      const pose = usePoseStore.getState().pose;
      const calibration = usePoseStore.getState().calibration;
      if (pose && calibration) {
        const norm = normalizePose(pose, calibration);
        const r = scorePose(norm, target.pose);
        if (similarityRef.current) {
          similarityRef.current.textContent = (r.similarity * 100).toFixed(0);
        }
        if (tierRef.current) tierRef.current.textContent = r.tier;
        if (r.similarity > bestRef.current.similarity) {
          bestRef.current = { similarity: r.similarity, tier: r.tier };
        }
      }

      if (remaining <= 0) {
        const timeBonus = 1; // v1: sin bonus de velocidad
        const points = Math.round(
          { PERFECT: 1000, GREAT: 700, GOOD: 400, MISS: 0 }[bestRef.current.tier] * timeBonus,
        );
        addScore(points);
        nextRound();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, addScore, nextRound]);

  if (!target) return <div className="p-8">No hay poses configuradas.</div>;

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div className="arena-card flex flex-col">
        <p className="text-xs text-white/50 font-mono mb-2">
          Ronda {round} / {totalRounds} · Objetivo: {target.name}
        </p>
        <TargetPoseView pose={target.pose} />
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
          <GameHUD similarityRef={similarityRef} tierRef={tierRef} timeRef={timeRef} />
        </div>
      </div>
    </div>
  );
}
