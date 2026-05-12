/* global React, PA_UI, PA_MINIGAMES */
const { useState: useStateMG2, useEffect: useEffectMG2, useRef: useRefMG2 } = React;
const { GameHud, Pill, ResultsCard } = PA_MINIGAMES;

// =================================================================
// 2. STATUE GAME — música → muévete, silencio → congélate
// =================================================================
const StatueGame = ({ onExit }) => {
  const [phase, setPhase] = useStateMG2("intro");
  const [round, setRound] = useStateMG2(0);
  const [mode, setMode] = useStateMG2("dance"); // dance | freeze
  const [motion, setMotion] = useStateMG2(0);
  const [score, setScore] = useStateMG2(0);
  const [combo, setCombo] = useStateMG2(0);
  const [phaseTime, setPhaseTime] = useStateMG2(0);
  const ROUNDS = 6;

  useEffectMG2(() => {
    if (phase !== "play") return;
    const danceDur = 2200 + Math.random() * 1800;
    const freezeDur = 1800 + Math.random() * 1200;
    setMode("dance");
    setPhaseTime(0);
    const t1 = setTimeout(() => {
      setMode("freeze");
      setPhaseTime(0);
      const t2 = setTimeout(() => {
        // Score based on stillness during freeze
        const m = Math.random();
        const gained = m < 0.25 ? 1000 : m < 0.6 ? 700 : 250;
        setScore((s) => s + gained * (1 + combo * 0.2));
        if (gained >= 700) setCombo((c) => c + 1);
        else setCombo(0);
        if (round + 1 >= ROUNDS) setPhase("done");
        else {
          setRound((r) => r + 1);
          setPhase("between");
          setTimeout(() => setPhase("play"), 700);
        }
      }, freezeDur);
      return () => clearTimeout(t2);
    }, danceDur);
    return () => clearTimeout(t1);
  }, [phase, round]);

  // Motion simulator
  useEffectMG2(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      const target = mode === "dance" ? 60 + Math.random() * 40 : Math.random() * 30;
      setMotion((m) => m + (target - m) * 0.25);
      setPhaseTime((t) => t + 0.06);
    }, 60);
    return () => clearInterval(id);
  }, [phase, mode]);

  if (phase === "intro")
    return (
      <GameHud
        title="Statue Game"
        eyebrow="Mini-juego · 6 rondas"
        onExit={onExit}
        bg="linear-gradient(135deg, #ffd86b 0%, #ff85b8 50%, #b48bff 100%)"
        hud={<Pill>612K jugando</Pill>}
      >
        <div className="mg-intro">
          <div className="mg-intro-icon">🗿</div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: 56, margin: "12px 0 6px" }}>
            Música on → muévete
          </h2>
          <p
            style={{ maxWidth: 460, textAlign: "center", color: "var(--ink-2)", marginBottom: 28 }}
          >
            Cuando la música pare, <strong>congélate como una estatua</strong>. Mientras menos te
            muevas en el silencio, más puntos. Combo x2 al encadenar freezes perfectos.
          </p>
          <button
            className="btn btn-primary"
            style={{ height: 56, padding: "0 36px", fontSize: 16 }}
            onClick={() => {
              setRound(0);
              setScore(0);
              setCombo(0);
              setPhase("play");
            }}
          >
            Empezar
          </button>
        </div>
      </GameHud>
    );

  if (phase === "done") {
    const finalScore = Math.round(score);
    const rating =
      finalScore > 4500 ? "S+" : finalScore > 3500 ? "S" : finalScore > 2500 ? "A" : "B";
    return (
      <GameHud
        title="Statue Game"
        eyebrow="Run completo"
        onExit={onExit}
        bg="var(--bg)"
        hud={<Pill accent="var(--pink-deep)">+{Math.round(finalScore / 10)} XP</Pill>}
      >
        <div style={{ display: "grid", placeItems: "center", padding: 40 }}>
          <ResultsCard
            score={finalScore}
            rating={rating}
            breakdown={[
              { label: "Freezes perfectos", value: combo + Math.floor(Math.random() * 3) },
              { label: "Combo máximo", value: `x${combo}` },
              { label: "Rondas", value: `${ROUNDS}/${ROUNDS}` },
              { label: "Bonus música", value: "+820" },
            ]}
            onAgain={() => {
              setRound(0);
              setScore(0);
              setCombo(0);
              setPhase("play");
            }}
            onExit={onExit}
          />
        </div>
      </GameHud>
    );
  }

  return (
    <GameHud
      title="Statue Game"
      eyebrow={`Ronda ${round + 1} / ${ROUNDS}`}
      onExit={onExit}
      bg={
        mode === "dance"
          ? "linear-gradient(135deg, #ff85b8, #ffd86b, #71f5c5)"
          : "linear-gradient(180deg, #1a0d14, #2a1428)"
      }
    >
      <div className="mg-statue-stage" data-mode={mode}>
        <div className="mg-statue-disc">
          <div className="mg-disc-ring" />
          <div className="mg-disc-center">{mode === "dance" ? "♬" : "❄"}</div>
          {mode === "dance" &&
            Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="mg-disc-note"
                style={{ transform: `rotate(${i * 22.5}deg) translateY(-180px)` }}
              >
                ♪
              </div>
            ))}
        </div>
        <div className="mg-statue-mode">
          <div className="mg-mode-label">{mode === "dance" ? "BAILA" : "CONGÉLATE"}</div>
          <div className="mg-mode-sub">
            {mode === "dance" ? "La música está sonando" : "No te muevas"}
          </div>
        </div>
        <div className="mg-statue-meter">
          <div className="mg-meter-row">
            <span>Movimiento</span>
            <span style={{ color: mode === "freeze" && motion > 40 ? "#ff3aa1" : "var(--ink-2)" }}>
              {Math.round(motion)}%
            </span>
          </div>
          <div className="mg-meter-bar">
            <div
              style={{
                width: `${motion}%`,
                background: mode === "dance" ? "#71f5c5" : motion > 40 ? "#ff3aa1" : "#ffd86b",
              }}
            />
            <div className="mg-meter-tick" style={{ left: "40%" }} />
          </div>
          <div className="mg-statue-hud-row">
            <div>
              <div className="eyebrow">Score</div>
              <strong>{Math.round(score).toLocaleString()}</strong>
            </div>
            <div>
              <div className="eyebrow">Combo</div>
              <strong style={{ color: combo > 0 ? "#ff3aa1" : "var(--ink-3)" }}>×{combo}</strong>
            </div>
            <div>
              <div className="eyebrow">Ronda</div>
              <strong>
                {round + 1}/{ROUNDS}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </GameHud>
  );
};

// =================================================================
// 3. YOGA FLOW — mantén la asana
// =================================================================
const YOGA_POSES = [
  { id: "tree", name: "Árbol", icon: "🧘‍♀️", duration: 12 },
  { id: "warrior", name: "Guerrero II", icon: "🤸", duration: 10 },
  { id: "lotus", name: "Loto", icon: "🪷", duration: 14 },
  { id: "downdog", name: "Perro boca abajo", icon: "🐕", duration: 10 },
  { id: "crow", name: "Cuervo", icon: "🦅", duration: 8 },
];

const YogaFlow = ({ onExit }) => {
  const [phase, setPhase] = useStateMG2("intro");
  const [pIdx, setPIdx] = useStateMG2(0);
  const [stability, setStability] = useStateMG2(85);
  const [holdTime, setHoldTime] = useStateMG2(0);
  const [breath, setBreath] = useStateMG2(0);
  const [scores, setScores] = useStateMG2([]);
  const pose = YOGA_POSES[pIdx];

  useEffectMG2(() => {
    if (phase !== "hold") return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setHoldTime(elapsed);
      setBreath((b) => (b + 0.04) % 1);
      // Stability noise — slowly drifts down with occasional recovery
      setStability((s) => Math.max(30, Math.min(100, s + (Math.random() - 0.55) * 4)));
      if (elapsed >= pose.duration) {
        clearInterval(id);
        setScores((ss) => [...ss, Math.round(stability)]);
        if (pIdx + 1 >= YOGA_POSES.length) setPhase("done");
        else {
          setPIdx(pIdx + 1);
          setStability(85);
          setHoldTime(0);
          setPhase("ready");
          setTimeout(() => setPhase("hold"), 1400);
        }
      }
    }, 100);
    return () => clearInterval(id);
  }, [phase, pIdx]);

  if (phase === "intro")
    return (
      <GameHud
        title="Yoga Flow"
        eyebrow="Mini-juego · 5 asanas"
        onExit={onExit}
        bg="linear-gradient(135deg, #b9f3d8 0%, #fff6e3 50%, #ffd1e3 100%)"
        hud={<Pill>320K jugando</Pill>}
      >
        <div className="mg-intro">
          <div className="mg-intro-icon">🧘</div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: 56, margin: "12px 0 6px" }}>
            Mantén la asana
          </h2>
          <p
            style={{ maxWidth: 460, textAlign: "center", color: "var(--ink-2)", marginBottom: 28 }}
          >
            5 posturas, cada una 10–14s. Mantén tu cuerpo estable y respira con el círculo.
            Estabilidad alta = +mindfulness bonus.
          </p>
          <button
            className="btn btn-primary"
            style={{ height: 56, padding: "0 36px", fontSize: 16 }}
            onClick={() => {
              setPIdx(0);
              setScores([]);
              setPhase("hold");
            }}
          >
            Empezar flow
          </button>
        </div>
      </GameHud>
    );

  if (phase === "done") {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const total = scores.reduce((a, b) => a + b, 0) * 30;
    const rating = avg >= 90 ? "S+" : avg >= 80 ? "S" : avg >= 70 ? "A" : "B";
    return (
      <GameHud
        title="Yoga Flow"
        eyebrow="Flow completo · Namasté"
        onExit={onExit}
        bg="linear-gradient(180deg, #b9f3d8 0%, var(--bg) 100%)"
        hud={<Pill accent="#52b043">+{Math.round(total / 10)} XP</Pill>}
      >
        <div style={{ display: "grid", placeItems: "center", padding: 40 }}>
          <ResultsCard
            score={total}
            rating={rating}
            breakdown={scores.map((s, i) => ({
              label: `${YOGA_POSES[i].icon}  ${YOGA_POSES[i].name}`,
              value: `${s}% stab`,
            }))}
            onAgain={() => {
              setPIdx(0);
              setScores([]);
              setPhase("intro");
            }}
            onExit={onExit}
          />
        </div>
      </GameHud>
    );
  }

  const breathScale = 1 + Math.sin(breath * Math.PI * 2) * 0.25;
  const inhale = Math.sin(breath * Math.PI * 2) > 0;

  return (
    <GameHud
      title="Yoga Flow"
      eyebrow={`Asana ${pIdx + 1} / ${YOGA_POSES.length} · ${pose.name}`}
      onExit={onExit}
      bg="linear-gradient(180deg, #d8f0e3 0%, #fff6e3 100%)"
      hud={
        <>
          <Pill>
            {Math.round(holdTime)}s / {pose.duration}s
          </Pill>
          <Pill accent={stability > 80 ? "#52b043" : stability > 60 ? "#ffd86b" : "#ff3aa1"}>
            Estabilidad {Math.round(stability)}%
          </Pill>
        </>
      }
    >
      <div className="mg-yoga-stage">
        <div className="mg-yoga-breath" style={{ transform: `scale(${breathScale})` }}>
          <div className="mg-yoga-breath-inner">
            <div className="eyebrow" style={{ color: "#fff" }}>
              {inhale ? "INHALA" : "EXHALA"}
            </div>
            <div style={{ fontSize: 80, marginTop: 8 }}>{pose.icon}</div>
            <div className="serif" style={{ fontStyle: "italic", fontSize: 28, marginTop: 4 }}>
              {pose.name}
            </div>
          </div>
        </div>
        <div className="mg-yoga-meter">
          <div className="mg-meter-bar tall">
            <div
              style={{
                height: `${stability}%`,
                background: stability > 80 ? "#52b043" : stability > 60 ? "#ffd86b" : "#ff3aa1",
              }}
            />
          </div>
          <div className="eyebrow" style={{ marginTop: 8, textAlign: "center" }}>
            Estabilidad
          </div>
        </div>
        <div className="mg-yoga-progress">
          {YOGA_POSES.map((p, i) => (
            <div
              key={p.id}
              className={`mg-yoga-step ${i === pIdx ? "active" : ""} ${i < pIdx ? "done" : ""}`}
            >
              <span>{p.icon}</span>
              <span style={{ fontSize: 11 }}>{p.name}</span>
              {scores[i] != null && <em>{scores[i]}%</em>}
            </div>
          ))}
        </div>
      </div>
    </GameHud>
  );
};

// =================================================================
// 4. SHADOW BOXER — golpea los guantes
// =================================================================
const ShadowBoxer = ({ onExit }) => {
  const [phase, setPhase] = useStateMG2("intro");
  const [targets, setTargets] = useStateMG2([]);
  const [score, setScore] = useStateMG2(0);
  const [combo, setCombo] = useStateMG2(0);
  const [hits, setHits] = useStateMG2(0);
  const [misses, setMisses] = useStateMG2(0);
  const [timeLeft, setTimeLeft] = useStateMG2(45);
  const nextId = useRefMG2(0);

  useEffectMG2(() => {
    if (phase !== "play") return;
    // Spawn targets
    const spawn = setInterval(() => {
      setTargets((ts) =>
        [
          ...ts,
          {
            id: nextId.current++,
            side: Math.random() > 0.5 ? "L" : "R",
            y: 20 + Math.random() * 60,
            type: Math.random() > 0.8 ? "hook" : "jab",
            born: Date.now(),
          },
        ].slice(-12),
      );
    }, 700);
    // Tick
    const tick = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0) {
          setPhase("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    // Expire
    const expire = setInterval(() => {
      const now = Date.now();
      setTargets((ts) => {
        const expired = ts.filter((t) => now - t.born > 2200);
        if (expired.length) {
          setMisses((m) => m + expired.length);
          setCombo(0);
        }
        return ts.filter((t) => now - t.born <= 2200);
      });
    }, 200);
    return () => {
      clearInterval(spawn);
      clearInterval(tick);
      clearInterval(expire);
    };
  }, [phase]);

  const hit = (id) => {
    const target = targets.find((t) => t.id === id);
    if (!target) return;
    const age = Date.now() - target.born;
    const accuracy = age < 600 ? "perfect" : age < 1200 ? "good" : "ok";
    const points =
      (accuracy === "perfect" ? 250 : accuracy === "good" ? 150 : 80) *
      (target.type === "hook" ? 2 : 1);
    setScore((s) => s + points * (1 + combo * 0.1));
    setCombo((c) => c + 1);
    setHits((h) => h + 1);
    setTargets((ts) => ts.filter((t) => t.id !== id));
  };

  if (phase === "intro")
    return (
      <GameHud
        title="Shadow Boxer"
        eyebrow="Mini-juego · 45 segundos"
        onExit={onExit}
        bg="linear-gradient(135deg, #1a0d14 0%, #ff3aa1 60%, #ff7a1f 100%)"
        hud={<Pill>BPM 142</Pill>}
      >
        <div className="mg-intro" style={{ color: "#fff" }}>
          <div className="mg-intro-icon">🥊</div>
          <h2
            className="serif"
            style={{ fontStyle: "italic", fontSize: 56, margin: "12px 0 6px", color: "#fff" }}
          >
            Golpea los guantes
          </h2>
          <p
            style={{
              maxWidth: 460,
              textAlign: "center",
              color: "rgba(255,255,255,.85)",
              marginBottom: 28,
            }}
          >
            Aparecen guantes a izquierda y derecha. Conéctalos rápido para encadenar combos.{" "}
            <strong>Hooks</strong> (rosa) valen el doble. Tienes 45s.
          </p>
          <button
            className="btn btn-primary"
            style={{ height: 56, padding: "0 36px", fontSize: 16 }}
            onClick={() => {
              setTargets([]);
              setScore(0);
              setCombo(0);
              setHits(0);
              setMisses(0);
              setTimeLeft(45);
              setPhase("play");
            }}
          >
            Empezar round
          </button>
        </div>
      </GameHud>
    );

  if (phase === "done") {
    const finalScore = Math.round(score);
    const acc = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;
    const rating = acc >= 90 && finalScore > 6000 ? "S+" : acc >= 80 ? "S" : acc >= 65 ? "A" : "B";
    return (
      <GameHud
        title="Shadow Boxer"
        eyebrow="KO · Round completo"
        onExit={onExit}
        bg="linear-gradient(180deg, #1a0d14, var(--bg))"
        hud={<Pill accent="#ff3aa1">+{Math.round(finalScore / 10)} XP</Pill>}
      >
        <div style={{ display: "grid", placeItems: "center", padding: 40 }}>
          <ResultsCard
            score={finalScore}
            rating={rating}
            breakdown={[
              { label: "Hits", value: hits },
              { label: "Misses", value: misses },
              { label: "Combo máximo", value: `x${combo}` },
              { label: "Precisión", value: `${acc}%` },
            ]}
            onAgain={() => {
              setTargets([]);
              setScore(0);
              setCombo(0);
              setHits(0);
              setMisses(0);
              setTimeLeft(45);
              setPhase("play");
            }}
            onExit={onExit}
          />
        </div>
      </GameHud>
    );
  }

  return (
    <GameHud
      title="Shadow Boxer"
      eyebrow={`${timeLeft}s · Combo x${combo}`}
      onExit={onExit}
      bg="radial-gradient(ellipse at center, #2a1428 0%, #0a0008 70%)"
      hud={
        <>
          <Pill>⏱ {timeLeft}s</Pill>
          <Pill accent="#ff3aa1">{Math.round(score).toLocaleString()}</Pill>
        </>
      }
    >
      <div className="mg-box-ring">
        <div className="mg-box-floor" />
        <div className="mg-box-side left">
          {targets
            .filter((t) => t.side === "L")
            .map((t) => (
              <button
                key={t.id}
                className={`mg-glove ${t.type}`}
                style={{ top: `${t.y}%` }}
                onClick={() => hit(t.id)}
              >
                🥊
              </button>
            ))}
        </div>
        <div className="mg-box-center">
          <div className="mg-box-fighter">🕴️</div>
          <div className="mg-box-bpm">
            <div className="eyebrow" style={{ color: "#fff" }}>
              COMBO
            </div>
            <div
              className="serif"
              style={{ fontStyle: "italic", fontSize: 72, color: "#fff", lineHeight: 1 }}
            >
              ×{combo}
            </div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12 }}>
              {hits} hits · {misses} miss
            </div>
          </div>
        </div>
        <div className="mg-box-side right">
          {targets
            .filter((t) => t.side === "R")
            .map((t) => (
              <button
                key={t.id}
                className={`mg-glove ${t.type}`}
                style={{ top: `${t.y}%` }}
                onClick={() => hit(t.id)}
              >
                🥊
              </button>
            ))}
        </div>
      </div>
    </GameHud>
  );
};

// =================================================================
// 5. SQUAT SURVIVOR — auto-shooter, squats = ataque
// =================================================================
const SquatSurvivor = ({ onExit }) => {
  const [phase, setPhase] = useStateMG2("intro");
  const [hp, setHp] = useStateMG2(100);
  const [xp, setXp] = useStateMG2(0);
  const [level, setLevel] = useStateMG2(1);
  const [squats, setSquats] = useStateMG2(0);
  const [enemies, setEnemies] = useStateMG2([]);
  const [pickups, setPickups] = useStateMG2([]);
  const [stance, setStance] = useStateMG2("standing"); // standing | squatting
  const [time, setTime] = useStateMG2(0);
  const [score, setScore] = useStateMG2(0);
  const [perks, setPerks] = useStateMG2(["aura"]);
  const enemyId = useRefMG2(0);

  useEffectMG2(() => {
    if (phase !== "play") return;
    const tick = setInterval(() => {
      setTime((t) => t + 1);
      // Spawn enemies
      if (Math.random() > 0.3) {
        setEnemies((es) => [
          ...es,
          {
            id: enemyId.current++,
            x: 10 + Math.random() * 80,
            y: -5,
            type: Math.random() > 0.85 ? "boss" : "minion",
            hp: Math.random() > 0.85 ? 3 : 1,
          },
        ]);
      }
      // Move enemies
      setEnemies((es) => {
        const moved = es.map((e) => ({ ...e, y: e.y + (e.type === "boss" ? 1.2 : 2) }));
        const reached = moved.filter((e) => e.y > 75);
        if (reached.length) setHp((h) => Math.max(0, h - reached.length * 8));
        return moved.filter((e) => e.y <= 75);
      });
    }, 600);

    const sim = setInterval(() => {
      // Auto-squat simulation for demo
      setStance((s) => (s === "standing" ? "squatting" : "standing"));
    }, 1100);

    return () => {
      clearInterval(tick);
      clearInterval(sim);
    };
  }, [phase]);

  // On squat (transition to squatting), attack nearest enemies
  useEffectMG2(() => {
    if (phase !== "play" || stance !== "squatting") return;
    setSquats((s) => s + 1);
    setEnemies((es) => {
      const damaged = es.map((e) => ({ ...e, hp: e.hp - 1 }));
      const killed = damaged.filter((e) => e.hp <= 0);
      setXp((x) => x + killed.length * 12);
      setScore(
        (s) =>
          s +
          killed.filter((e) => e.type === "boss").length * 200 +
          killed.filter((e) => e.type === "minion").length * 50,
      );
      return damaged.filter((e) => e.hp > 0);
    });
  }, [stance, phase]);

  useEffectMG2(() => {
    if (xp >= level * 50) {
      setLevel((l) => l + 1);
      setXp(0);
    }
  }, [xp, level]);

  useEffectMG2(() => {
    if (hp <= 0 && phase === "play") setPhase("done");
  }, [hp, phase]);

  if (phase === "intro")
    return (
      <GameHud
        title="Squat Survivor"
        eyebrow="Mini-juego · Sobrevive 3 min"
        onExit={onExit}
        bg="linear-gradient(135deg, #1a0c2a 0%, #6bf0ff 60%, #ff3aa1 100%)"
        hud={<Pill>BETA</Pill>}
      >
        <div className="mg-intro" style={{ color: "#fff" }}>
          <div className="mg-intro-icon">💪</div>
          <h2
            className="serif"
            style={{ fontStyle: "italic", fontSize: 56, margin: "12px 0 6px", color: "#fff" }}
          >
            Squat o muere
          </h2>
          <p
            style={{
              maxWidth: 460,
              textAlign: "center",
              color: "rgba(255,255,255,.85)",
              marginBottom: 28,
            }}
          >
            Cada vez que haces un <strong>squat</strong>, tu aura daña enemigos cercanos. Sobrevive,
            sube de nivel, elige perks. Llegan más rápido cada minuto.
          </p>
          <button
            className="btn btn-primary"
            style={{ height: 56, padding: "0 36px", fontSize: 16 }}
            onClick={() => {
              setHp(100);
              setXp(0);
              setLevel(1);
              setSquats(0);
              setEnemies([]);
              setScore(0);
              setTime(0);
              setPhase("play");
            }}
          >
            Empezar run
          </button>
        </div>
      </GameHud>
    );

  if (phase === "done") {
    const rating = score > 3000 ? "S+" : score > 1800 ? "S" : score > 900 ? "A" : "B";
    return (
      <GameHud
        title="Squat Survivor"
        eyebrow={hp <= 0 ? "Has caído" : "Run completo"}
        onExit={onExit}
        bg="linear-gradient(180deg, #1a0c2a, var(--bg))"
        hud={<Pill accent="#6bf0ff">+{Math.round(score / 5)} XP</Pill>}
      >
        <div style={{ display: "grid", placeItems: "center", padding: 40 }}>
          <ResultsCard
            score={score}
            rating={rating}
            breakdown={[
              { label: "Squats totales", value: squats },
              { label: "Nivel alcanzado", value: `Lv. ${level}` },
              { label: "Tiempo", value: `${Math.floor(time * 0.6)}s` },
              { label: "Perks activos", value: perks.length },
            ]}
            onAgain={() => {
              setHp(100);
              setXp(0);
              setLevel(1);
              setSquats(0);
              setEnemies([]);
              setScore(0);
              setTime(0);
              setPhase("play");
            }}
            onExit={onExit}
          />
        </div>
      </GameHud>
    );
  }

  return (
    <GameHud
      title="Squat Survivor"
      eyebrow={`Lv. ${level} · ${squats} squats`}
      onExit={onExit}
      bg="radial-gradient(circle at 50% 80%, #2a1438 0%, #0a0008 80%)"
      hud={
        <>
          <Pill>HP {hp}</Pill>
          <Pill accent="#6bf0ff">{score}</Pill>
        </>
      }
    >
      <div className="mg-sq-arena">
        <div className="mg-sq-grid" />
        <div className="mg-sq-hud-left">
          <div className="eyebrow" style={{ color: "#fff" }}>
            HP
          </div>
          <div className="mg-sq-bar">
            <div
              style={{
                width: `${hp}%`,
                background: hp > 50 ? "#71f5c5" : hp > 25 ? "#ffd86b" : "#ff3aa1",
              }}
            />
          </div>
          <div className="eyebrow" style={{ color: "#fff", marginTop: 14 }}>
            XP Lv.{level}
          </div>
          <div className="mg-sq-bar">
            <div style={{ width: `${(xp / (level * 50)) * 100}%`, background: "#6bf0ff" }} />
          </div>
          <div className="mg-sq-perks">
            {perks.map((p) => (
              <div key={p} className="mg-sq-perk">
                ✦ {p}
              </div>
            ))}
          </div>
        </div>
        <div className="mg-sq-arena-inner">
          {enemies.map((e) => (
            <div
              key={e.id}
              className={`mg-sq-enemy ${e.type}`}
              style={{ left: `${e.x}%`, top: `${e.y}%` }}
            >
              {e.type === "boss" ? "👹" : "👾"}
            </div>
          ))}
          <div className={`mg-sq-player ${stance}`}>
            <div className="mg-sq-aura" />
            <div className="mg-sq-player-icon">{stance === "squatting" ? "🧘" : "🕴️"}</div>
          </div>
        </div>
        <div className="mg-sq-hud-right">
          <div className="eyebrow" style={{ color: "#fff" }}>
            Squats
          </div>
          <div
            className="serif"
            style={{ fontStyle: "italic", fontSize: 64, color: "#fff", lineHeight: 1 }}
          >
            {squats}
          </div>
          <div className="eyebrow" style={{ color: "#fff", marginTop: 18 }}>
            Stance
          </div>
          <div className={`mg-sq-stance ${stance}`}>
            {stance === "squatting" ? "⬇ SQUAT" : "⬆ UP"}
          </div>
        </div>
      </div>
    </GameHud>
  );
};

Object.assign(window.PA_MINIGAMES, { StatueGame, YogaFlow, ShadowBoxer, SquatSurvivor });
