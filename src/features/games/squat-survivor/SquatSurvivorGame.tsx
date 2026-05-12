import { GameHud } from "@/components/GameHud";
import { ResultsCard } from "@/components/ResultsCard";
import { useLobbyStore } from "@/features/lobby/state";
import { useGameMusic } from "@/lib/music";
import { useEffect, useRef, useState } from "react";

type Phase = "intro" | "play" | "done";
type Stance = "up" | "down";
type EnemyType = "minion" | "boss";

interface Enemy {
  id: number;
  x: number;
  y: number;
  type: EnemyType;
  hp: number;
}

const GAME_DURATION = 60;
const TICK_MS = 600;
const SQUAT_COOLDOWN_MS = 1100;

export function SquatSurvivorGame() {
  const closeGame = useLobbyStore((s) => s.closeGame);
  const { play, fadeOut } = useGameMusic();

  const [phase, setPhase] = useState<Phase>("intro");
  const [hp, setHp] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [squats, setSquats] = useState(0);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [stance, setStance] = useState<Stance>("up");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [perks] = useState<string[]>(["aura"]);

  const nextIdRef = useRef(1);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stanceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const squatCoolRef = useRef(false);

  function startGame() {
    setPhase("play");
    play("squat");
  }

  function endGame() {
    setPhase("done");
    fadeOut();
    if (tickRef.current) clearInterval(tickRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (stanceRef.current) clearInterval(stanceRef.current);
  }

  useEffect(() => {
    if (phase !== "play") return;

    stanceRef.current = setInterval(() => {
      setStance((s) => (s === "up" ? "down" : "up"));
    }, SQUAT_COOLDOWN_MS);

    tickRef.current = setInterval(() => {
      const now = Date.now();
      const isBoss = Math.random() < 0.15;
      const newEnemy: Enemy = {
        id: nextIdRef.current++ + now,
        x: 10 + Math.random() * 80,
        y: 0,
        type: isBoss ? "boss" : "minion",
        hp: isBoss ? 3 : 1,
      };

      setEnemies((prev) => {
        const moved = prev.map((e) => ({
          ...e,
          y: e.y + (e.type === "boss" ? 1.2 : 2),
        }));
        const reached = moved.filter((e) => e.y > 75);
        const alive = moved.filter((e) => e.y <= 75);
        if (reached.length > 0) {
          setHp((h) => Math.max(0, h - reached.length * 8));
        }
        return [...alive, newEnemy];
      });
    }, TICK_MS);

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
      if (tickRef.current) clearInterval(tickRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (stanceRef.current) clearInterval(stanceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (hp <= 0 && phase === "play") {
      endGame();
    }
  }, [hp, phase]);

  function doSquat() {
    if (squatCoolRef.current || phase !== "play") return;
    squatCoolRef.current = true;
    setTimeout(() => {
      squatCoolRef.current = false;
    }, 500);

    setEnemies((prev) => {
      const killed = prev.filter((e) => {
        const e2 = { ...e, hp: e.hp - 1 };
        return e2.hp <= 0;
      });
      const remaining = prev.map((e) => ({ ...e, hp: e.hp - 1 })).filter((e) => e.hp > 0);

      const killCount = killed.length;
      if (killCount > 0) {
        const bossKills = killed.filter((e) => e.type === "boss").length;
        const pts = killCount * 100 + bossKills * 200;
        setScore((s) => s + pts);
        setXp((x) => {
          const newXp = x + killCount * 12;
          const threshold = level * 100;
          if (newXp >= threshold) {
            setLevel((l) => l + 1);
            return newXp - threshold;
          }
          return newXp;
        });
      }
      setSquats((sq) => sq + 1);
      return remaining;
    });
  }

  const xpPct = Math.min((xp / (level * 100)) * 100, 100);
  const hpPct = Math.max(0, hp);

  if (phase === "done") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "grid",
          placeItems: "center",
          background: "radial-gradient(circle at 50% 80%, #2a1438 0%, #0a0008 80%)",
        }}
      >
        <ResultsCard
          score={score}
          rating={score >= 8000 ? "S+" : score >= 5000 ? "S" : score >= 3000 ? "A" : "B"}
          breakdown={[
            { label: "Squats", value: String(squats) },
            { label: "Nivel", value: String(level) },
            { label: "HP final", value: `${hp}%` },
            { label: "Enemigos", value: String(squats * 3) },
          ]}
          onAgain={() => {
            setScore(0);
            setHp(100);
            setXp(0);
            setLevel(1);
            setSquats(0);
            setTimeLeft(GAME_DURATION);
            setEnemies([]);
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
          background: "radial-gradient(circle at 50% 80%, #2a1438 0%, #0a0008 80%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <div className="eyebrow" style={{ color: "var(--pink-2)" }}>
            Cardio game
          </div>
          <h1 className="serif" style={{ fontSize: 64, fontStyle: "italic", margin: "12px 0" }}>
            Squat Survivor
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 400,
              margin: "0 auto 28px",
            }}
          >
            ¡Aplasta enemigos con squats! Cada sentadilla es un ataque en área. Vampire Survivors +
            cardio. 60 segundos de supervivencia.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              className="btn btn-pink"
              type="button"
              style={{ padding: "14px 28px", fontSize: 16 }}
              onClick={startGame}
            >
              ¡A squatear!
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
      title="Squat Survivor"
      eyebrow="Cardio game"
      onExit={closeGame}
      bg="radial-gradient(circle at 50% 80%, #2a1438 0%, #0a0008 80%)"
      hud={
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="chip chip-dark" style={{ fontFamily: "var(--mono)", fontSize: 16 }}>
            {timeLeft}s
          </span>
          <span className="chip chip-pink">{score.toLocaleString()}</span>
        </div>
      }
    >
      <div className="mg-sq-arena">
        {/* Left HUD */}
        <div className="sq-hud">
          <div className="sq-stat-label">HP</div>
          <div className="sq-bar">
            <div className="sq-bar-fill sq-bar-hp" style={{ width: `${hpPct}%` }} />
          </div>
          <div className="sq-stat-label" style={{ marginTop: 12 }}>
            XP · Lv {level}
          </div>
          <div className="sq-bar">
            <div className="sq-bar-fill sq-bar-xp" style={{ width: `${xpPct}%` }} />
          </div>
          <div className="sq-perks">
            {perks.map((p) => (
              <span key={p} className="chip chip-pink" style={{ fontSize: 10 }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Arena */}
        <div className="arena-inner">
          {enemies.map((e) => (
            <div
              key={e.id}
              className={`sq-enemy sq-enemy-${e.type}`}
              style={{
                left: `${e.x}%`,
                top: `${e.y}%`,
              }}
            >
              {e.type === "boss" ? "👾" : "💀"}
              {e.hp > 1 && <span className="enemy-hp">{e.hp}</span>}
            </div>
          ))}

          {/* Player */}
          <button
            type="button"
            className={`sq-player sq-player-${stance}`}
            onClick={doSquat}
            title="¡Squat!"
            style={{ bottom: 24, left: "50%", transform: "translateX(-50%)" }}
          >
            {stance === "up" ? "🧍" : "🏋️"}
          </button>
        </div>
      </div>
    </GameHud>
  );
}
