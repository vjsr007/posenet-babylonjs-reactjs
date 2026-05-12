import { GameHud } from "@/components/GameHud";
import { ResultsCard } from "@/components/ResultsCard";
import { useLobbyStore } from "@/features/lobby/state";
import { useGameMusic } from "@/lib/music";
import { useEffect, useRef, useState } from "react";

type Phase = "intro" | "play" | "done";
type HitQuality = "perfect" | "good" | "ok";

interface Target {
  id: number;
  side: "L" | "R";
  y: number;
  type: "jab" | "hook";
  born: number;
}

interface HitFeedback {
  id: number;
  label: string;
  pts: number;
}

const SPAWN_INTERVAL_MS = 700;
const MAX_TARGETS = 12;
const GAME_DURATION = 45;

export function ShadowBoxerGame() {
  const closeGame = useLobbyStore((s) => s.closeGame);
  const { play, fadeOut } = useGameMusic();

  const [phase, setPhase] = useState<Phase>("intro");
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedbacks, setFeedbacks] = useState<HitFeedback[]>([]);

  const nextIdRef = useRef(1);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expireRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const comboRef = useRef(0);

  function startGame() {
    setPhase("play");
    play("boxing");
  }

  function endGame() {
    setPhase("done");
    fadeOut();
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (expireRef.current) clearInterval(expireRef.current);
  }

  useEffect(() => {
    if (phase !== "play") return;

    spawnRef.current = setInterval(() => {
      setTargets((prev) => {
        if (prev.length >= MAX_TARGETS) return prev;
        const id = nextIdRef.current++;
        const side: "L" | "R" = Math.random() > 0.5 ? "L" : "R";
        const y = 15 + Math.random() * 55;
        const type: "jab" | "hook" = Math.random() > 0.4 ? "jab" : "hook";
        return [...prev, { id, side, y, type, born: Date.now() }];
      });
    }, SPAWN_INTERVAL_MS);

    expireRef.current = setInterval(() => {
      const now = Date.now();
      setTargets((prev) => {
        const expired = prev.filter((t) => now - t.born > 2200);
        if (expired.length > 0) {
          setMisses((m) => m + expired.length);
          comboRef.current = 0;
          setCombo(0);
        }
        return prev.filter((t) => now - t.born <= 2200);
      });
    }, 200);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (expireRef.current) clearInterval(expireRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function hitTarget(id: number) {
    setTargets((prev) => {
      const target = prev.find((t) => t.id === id);
      if (!target) return prev;

      const age = Date.now() - target.born;
      let quality: HitQuality;
      let base: number;

      if (age < 600) {
        quality = "perfect";
        base = 250;
      } else if (age < 1200) {
        quality = "good";
        base = 150;
      } else {
        quality = "ok";
        base = 80;
      }

      const multiplier = target.type === "hook" ? 2 : 1;
      const newCombo = comboRef.current + 1;
      comboRef.current = newCombo;
      const pts = Math.round(base * multiplier * (1 + newCombo * 0.1));

      setCombo(newCombo);
      setHits((h) => h + 1);
      setScore((s) => s + pts);

      const fbId = id;
      const label = quality === "perfect" ? "PERFECT!" : quality === "good" ? "GOOD" : "OK";
      setFeedbacks((f) => [...f, { id: fbId, label, pts }]);
      setTimeout(() => setFeedbacks((f) => f.filter((fb) => fb.id !== fbId)), 800);

      return prev.filter((t) => t.id !== id);
    });
  }

  const leftTargets = targets.filter((t) => t.side === "L");
  const rightTargets = targets.filter((t) => t.side === "R");
  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;

  if (phase === "done") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "grid",
          placeItems: "center",
          background: "radial-gradient(ellipse at center, #2a1428 0%, #0a0008 70%)",
        }}
      >
        <ResultsCard
          score={score}
          rating={score >= 8000 ? "S+" : score >= 6000 ? "S" : score >= 4000 ? "A" : "B"}
          breakdown={[
            { label: "Golpes", value: String(hits) },
            { label: "Precisión", value: `${accuracy}%` },
            { label: "Combo máx", value: String(combo) },
            { label: "Fallos", value: String(misses) },
          ]}
          onAgain={() => {
            setScore(0);
            setCombo(0);
            setHits(0);
            setMisses(0);
            setTimeLeft(GAME_DURATION);
            setTargets([]);
            comboRef.current = 0;
            startGame();
          }}
          onExit={closeGame}
        />
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "grid",
          placeItems: "center",
          background: "radial-gradient(ellipse at center, #2a1428 0%, #0a0008 70%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <div className="eyebrow" style={{ color: "var(--pink-2)" }}>
            Pose game
          </div>
          <h1 className="serif" style={{ fontSize: 64, fontStyle: "italic", margin: "12px 0" }}>
            Shadow Boxer
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 400, margin: "0 auto 28px" }}>
            Golpea los guantes con tus manos. Izquierda → guante izquierdo. Derecha → guante
            derecho. ¡Combos multiplican puntos!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              className="btn btn-pink"
              type="button"
              style={{ padding: "14px 28px", fontSize: 16 }}
              onClick={startGame}
            >
              ¡A pelear!
            </button>
            <button className="btn btn-ghost" type="button" onClick={closeGame}>
              Salir
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GameHud
      title="Shadow Boxer"
      eyebrow="Pose game"
      onExit={closeGame}
      bg="radial-gradient(ellipse at center, #2a1428 0%, #0a0008 70%)"
      hud={
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="chip chip-dark" style={{ fontFamily: "var(--mono)", fontSize: 16 }}>
            {timeLeft}s
          </span>
          <span className="chip chip-pink">{score.toLocaleString()}</span>
        </div>
      }
    >
      <div className="mg-box-ring">
        <div className="ring-floor" />
        <div className="ring-targets ring-left">
          {leftTargets.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`mg-glove mg-glove-${t.type}`}
              style={{ top: `${t.y}%` }}
              onClick={() => hitTarget(t.id)}
            >
              🥊
            </button>
          ))}
        </div>
        <div className="ring-center">
          <div className="fighter-silhouette">🥋</div>
          {combo > 2 && (
            <div className="combo-display">
              ×{combo} <span style={{ fontSize: 12 }}>COMBO</span>
            </div>
          )}
          {feedbacks.map((fb) => (
            <div key={fb.id} className="hit-feedback">
              {fb.label} <span style={{ color: "var(--pink-2)" }}>+{fb.pts}</span>
            </div>
          ))}
        </div>
        <div className="ring-targets ring-right">
          {rightTargets.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`mg-glove mg-glove-${t.type}`}
              style={{ top: `${t.y}%` }}
              onClick={() => hitTarget(t.id)}
            >
              🥊
            </button>
          ))}
        </div>
      </div>
    </GameHud>
  );
}
