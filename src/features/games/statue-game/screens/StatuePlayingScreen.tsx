import { useLobbyStore } from "@/features/lobby/state";
import { usePoseDetection } from "@/features/pose-detection/usePoseDetection";
import { usePoseStore } from "@/features/pose-detection/usePoseStore";
import { EMASmoother, poseMovement } from "@/lib/movement";
import type { Pose } from "@/types/pose";
import { useEffect, useRef } from "react";
import { INITIAL_LIVES, useStatueStore } from "../state";

const MOVEMENT_THRESHOLD = 0.06;
const RED_MIN_MS = 1500;
const RED_MAX_MS = 3500;
const GREEN_MIN_MS = 2000;
const GREEN_MAX_MS = 4500;
const HIT_COOLDOWN_MS = 700;

type Light = "green" | "red";

function randomDuration(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function StatuePlayingScreen(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePoseDetection(videoRef);

  const finish = useStatueStore((s) => s.finish);
  const exit = useLobbyStore((s) => s.exit);

  const livesDomRef = useRef<HTMLSpanElement>(null);
  const lightDomRef = useRef<HTMLDivElement>(null);
  const lightLabelRef = useRef<HTMLSpanElement>(null);
  const timerDomRef = useRef<HTMLSpanElement>(null);
  const survivedDomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const startedAt = performance.now();
    let lightStart = startedAt;
    let light: Light = "green";
    let lightDuration = randomDuration(GREEN_MIN_MS, GREEN_MAX_MS);
    let lastHitAt = 0;
    let lives = INITIAL_LIVES;
    const smoother = new EMASmoother(0.4);
    let prevPose: Pose | null = null;
    let prevPoseTs = 0;

    const setLightUI = (l: Light): void => {
      if (lightDomRef.current) {
        lightDomRef.current.style.background = l === "green" ? "rgb(34 197 94)" : "rgb(239 68 68)";
      }
      if (lightLabelRef.current) {
        lightLabelRef.current.textContent = l === "green" ? "MUÉVETE" : "ESTATUA";
      }
    };
    setLightUI(light);

    const tick = (): void => {
      if (cancelled) return;
      const now = performance.now();
      const elapsed = now - startedAt;
      if (survivedDomRef.current) {
        survivedDomRef.current.textContent = (elapsed / 1000).toFixed(1);
      }

      const sinceLight = now - lightStart;
      const remaining = Math.max(0, lightDuration - sinceLight);
      if (timerDomRef.current) timerDomRef.current.textContent = (remaining / 1000).toFixed(1);
      if (sinceLight >= lightDuration) {
        light = light === "green" ? "red" : "green";
        lightStart = now;
        lightDuration =
          light === "green"
            ? randomDuration(GREEN_MIN_MS, GREEN_MAX_MS)
            : randomDuration(RED_MIN_MS, RED_MAX_MS);
        smoother.reset();
        setLightUI(light);
      }

      const pose = usePoseStore.getState().pose;
      if (pose && pose.ts !== prevPoseTs) {
        if (prevPose && light === "red" && now - lightStart > 200) {
          const m = poseMovement(prevPose, pose);
          const smooth = smoother.push(m);
          if (smooth > MOVEMENT_THRESHOLD && now - lastHitAt > HIT_COOLDOWN_MS) {
            lastHitAt = now;
            lives -= 1;
            if (livesDomRef.current) {
              livesDomRef.current.textContent = "❤".repeat(Math.max(0, lives));
            }
            if (lightDomRef.current) {
              lightDomRef.current.animate(
                [
                  { boxShadow: "0 0 0 0 rgba(239,68,68,0.9)" },
                  { boxShadow: "0 0 0 60px rgba(239,68,68,0)" },
                ],
                { duration: 500 },
              );
            }
            if (lives <= 0) {
              cancelled = true;
              finish(elapsed);
              return;
            }
          }
        }
        prevPose = pose;
        prevPoseTs = pose.ts;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [finish]);

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div className="arena-card flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs font-mono text-white/50">
          <span>
            Vidas <span ref={livesDomRef}>{"❤".repeat(INITIAL_LIVES)}</span>
          </span>
          <span>
            ⏱ <span ref={survivedDomRef}>0.0</span>s
          </span>
          <button type="button" onClick={exit} className="arena-btn-ghost py-1 px-2 text-xs">
            Salir
          </button>
        </div>
        <div className="flex-1 grid place-items-center">
          <div
            ref={lightDomRef}
            className="w-56 h-56 rounded-full grid place-items-center text-white text-2xl font-bold shadow-2xl"
            style={{ background: "rgb(34 197 94)" }}
          >
            <span ref={lightLabelRef}>MUÉVETE</span>
          </div>
        </div>
        <p className="text-center text-white/60 font-mono text-sm">
          Cambia en <span ref={timerDomRef}>0.0</span>s
        </p>
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
        </div>
      </div>
    </div>
  );
}
