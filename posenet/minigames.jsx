/* global React, PA_UI */
/* Mini-games — each game is a self-contained React component.
   App.jsx renders one when gameOpen === game.id. */
const { useState: useStateMG, useEffect: useEffectMG, useRef: useRefMG } = React;
const { Icon: IconMG } = PA_UI;

// -- shared shell ---------------------------------------------------
const GameHud = ({ title, eyebrow, onExit, hud, children, bg }) => (
  <div className="mg-shell" style={{ background: bg }}>
    <div className="mg-top">
      <button className="mg-back" onClick={onExit}>
        ← Salir
      </button>
      <div className="mg-title">
        <div className="mg-eyebrow">{eyebrow}</div>
        <div className="mg-name">{title}</div>
      </div>
      <div className="mg-hud">{hud}</div>
    </div>
    <div className="mg-body">{children}</div>
  </div>
);

const Pill = ({ children, accent }) => (
  <div className="mg-pill" style={accent ? { background: accent, color: "#fff" } : null}>
    {children}
  </div>
);

const ResultsCard = ({ score, rating, breakdown, onAgain, onExit, theme = "rose" }) => (
  <div className="mg-result-card" data-theme={theme}>
    <div className="eyebrow">Resultados</div>
    <div className="mg-result-score">{score.toLocaleString()}</div>
    <div className="mg-result-rating">{rating}</div>
    <div className="mg-result-rows">
      {breakdown.map((b) => (
        <div key={b.label} className="mg-result-row">
          <span>{b.label}</span>
          <strong>{b.value}</strong>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
      <button className="btn btn-ghost" onClick={onExit} style={{ flex: 1 }}>
        Salir
      </button>
      <button className="btn btn-primary" onClick={onAgain} style={{ flex: 1 }}>
        Otra ronda
      </button>
    </div>
  </div>
);

// =================================================================
// 1. POSE MATCH — silueta objetivo aparece 3s, encájala con tu cuerpo
// =================================================================

const POSE_SHAPES = [
  {
    id: "tpose",
    name: "T-Pose",
    svg: "M50 30 a8 8 0 1 1 0 .1 z M50 38 v36 M22 50 h56 M50 74 l-10 22 M50 74 l10 22",
  },
  {
    id: "warrior",
    name: "Guerrero",
    svg: "M50 24 a7 7 0 1 1 0 .1 z M50 32 v22 L34 96 M50 54 L70 92 M30 44 L72 44",
  },
  {
    id: "star",
    name: "Estrella",
    svg: "M50 22 a7 7 0 1 1 0 .1 z M50 30 v30 M22 32 L50 50 L78 32 M50 60 L34 96 M50 60 L66 96",
  },
  {
    id: "vogue",
    name: "Vogue",
    svg: "M50 26 a7 7 0 1 1 0 .1 z M50 34 v28 M30 38 L50 50 M50 50 L66 28 M50 62 L36 96 M50 62 L62 96",
  },
  {
    id: "tree",
    name: "Árbol",
    svg: "M50 24 a7 7 0 1 1 0 .1 z M50 32 v32 M50 32 q-12 -6 -16 -16 M50 32 q12 -6 16 -16 M50 64 L48 96 M50 64 L62 78",
  },
  {
    id: "lunge",
    name: "Lunge",
    svg: "M44 24 a7 7 0 1 1 0 .1 z M44 32 v26 M28 40 L44 48 M44 48 L66 30 M44 58 L34 96 M44 58 L78 88",
  },
];

const PoseMatch = ({ onExit }) => {
  const [phase, setPhase] = useStateMG("intro"); // intro → countdown → match → reveal → done
  const [round, setRound] = useStateMG(0);
  const [countdown, setCountdown] = useStateMG(3);
  const [accuracy, setAccuracy] = useStateMG(0);
  const [scores, setScores] = useStateMG([]);
  const ROUNDS = 5;
  const pose = POSE_SHAPES[round % POSE_SHAPES.length];

  useEffectMG(() => {
    if (phase === "countdown") {
      if (countdown === 0) {
        setPhase("match");
        return;
      }
      const t = setTimeout(() => setCountdown(countdown - 1), 700);
      return () => clearTimeout(t);
    }
    if (phase === "match") {
      // Simulate live accuracy climbing
      const start = Date.now();
      const duration = 3000;
      const id = setInterval(() => {
        const t = Math.min(1, (Date.now() - start) / duration);
        // Noisy climb that settles around 70-95%
        const target = 0.7 + Math.random() * 0.25;
        setAccuracy(Math.round((target * t + Math.random() * 0.05) * 100));
        if (t >= 1) {
          clearInterval(id);
          const final = Math.round((0.65 + Math.random() * 0.3) * 100);
          setAccuracy(final);
          setScores((s) => [...s, final]);
          setTimeout(() => setPhase("reveal"), 200);
        }
      }, 80);
      return () => clearInterval(id);
    }
    if (phase === "reveal") {
      const t = setTimeout(() => {
        if (round + 1 >= ROUNDS) setPhase("done");
        else {
          setRound(round + 1);
          setCountdown(3);
          setAccuracy(0);
          setPhase("countdown");
        }
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [phase, countdown, round]);

  if (phase === "intro") {
    return (
      <GameHud
        title="Pose Match"
        eyebrow="Mini-juego · 5 rondas"
        onExit={onExit}
        bg="linear-gradient(135deg, #ff85b8 0%, #c8a8ff 60%, #71f5c5 100%)"
        hud={<Pill>1.2M jugando</Pill>}
      >
        <div className="mg-intro">
          <div className="mg-intro-icon">🪞</div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: 56, margin: "12px 0 6px" }}>
            Imita la silueta
          </h2>
          <p
            style={{ maxWidth: 460, textAlign: "center", color: "var(--ink-2)", marginBottom: 28 }}
          >
            Aparecerá una pose objetivo. Tienes <strong>3 segundos</strong> para encajar tu cuerpo.
            Tu webcam mide el match en tiempo real.
          </p>
          <button
            className="btn btn-primary"
            style={{ height: 56, padding: "0 36px", fontSize: 16 }}
            onClick={() => setPhase("countdown")}
          >
            Empezar ronda
          </button>
        </div>
      </GameHud>
    );
  }

  if (phase === "done") {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const rating = avg >= 90 ? "S+" : avg >= 80 ? "S" : avg >= 70 ? "A" : "B";
    return (
      <GameHud
        title="Pose Match"
        eyebrow="Run completo"
        onExit={onExit}
        bg="var(--bg)"
        hud={<Pill accent="var(--pink-deep)">+{avg * 4} XP</Pill>}
      >
        <div style={{ display: "grid", placeItems: "center", padding: 40 }}>
          <ResultsCard
            score={avg * 100}
            rating={rating}
            breakdown={scores.map((s, i) => ({
              label: `Ronda ${i + 1} · ${POSE_SHAPES[i].name}`,
              value: `${s}%`,
            }))}
            onAgain={() => {
              setRound(0);
              setScores([]);
              setCountdown(3);
              setPhase("intro");
            }}
            onExit={onExit}
          />
        </div>
      </GameHud>
    );
  }

  return (
    <GameHud
      title="Pose Match"
      eyebrow={`Ronda ${round + 1} / ${ROUNDS} · ${pose.name}`}
      onExit={onExit}
      bg={`linear-gradient(180deg, ${["#ffd1e3", "#c8a8ff", "#71f5c5", "#ffd86b", "#ff85b8", "#1a0d14"][round % 6]} 0%, var(--bg) 100%)`}
      hud={
        <>
          <Pill>
            R {round + 1}/{ROUNDS}
          </Pill>
          <Pill accent={phase === "match" ? "var(--pink-deep)" : null}>
            {phase === "countdown"
              ? `Listo en ${countdown}`
              : phase === "match"
                ? `${accuracy}%`
                : `${accuracy}%`}
          </Pill>
        </>
      }
    >
      <div className="mg-pose-stage">
        <div className="mg-pose-camera">
          <div className="mg-cam-frame">
            <div className="cam-placeholder">CÁMARA</div>
            <div className="mg-cam-overlay">
              <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <path
                  d={pose.svg}
                  stroke={phase === "reveal" ? (accuracy >= 75 ? "#71f5c5" : "#ff85b8") : "#fff"}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,.5))" }}
                />
              </svg>
            </div>
            {phase === "countdown" && <div className="mg-countdown">{countdown || "¡YA!"}</div>}
            {phase === "reveal" && (
              <div
                className={`mg-reveal ${accuracy >= 90 ? "perfect" : accuracy >= 75 ? "great" : "ok"}`}
              >
                {accuracy >= 90
                  ? "PERFECT"
                  : accuracy >= 75
                    ? "GREAT"
                    : accuracy >= 60
                      ? "GOOD"
                      : "OFF"}
              </div>
            )}
          </div>
        </div>
        <div className="mg-pose-meter">
          <div className="eyebrow">Match en vivo</div>
          <div className="mg-circ-meter">
            <svg viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke="rgba(0,0,0,.08)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke="var(--pink-deep)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(accuracy / 100) * 326.7} 326.7`}
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"
                strokeLinecap="round"
              />
            </svg>
            <div className="mg-circ-val">
              {accuracy}
              <span>%</span>
            </div>
          </div>
          <div className="mg-pose-list">
            {POSE_SHAPES.slice(0, ROUNDS).map((p, i) => (
              <div
                key={p.id}
                className={`mg-pose-chip ${i === round ? "active" : ""} ${i < round ? "done" : ""}`}
              >
                <svg viewBox="0 0 100 100">
                  <path
                    d={p.svg}
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{scores[i] != null ? `${scores[i]}%` : p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GameHud>
  );
};

window.PA_MINIGAMES = { PoseMatch, GameHud, Pill, ResultsCard };
