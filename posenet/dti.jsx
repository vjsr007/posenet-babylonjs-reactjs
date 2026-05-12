/* global React, PA_DATA, PA_UI */
const { useState, useEffect, useRef, useCallback } = React;
const { THEMES, CLOSET_CATEGORIES, CLOSET, RARITY, POSES, RANKINGS } = PA_DATA;
const { Icon, PoseFigure, WebcamTile, Stars } = PA_UI;

// ============================================
// DTI FLOW
// states: reveal → dressing (90s) → runway (poses) → results
// ============================================

const DTIFlow = ({ onExit, showWebcam, visibleCats }) => {
  const [phase, setPhase] = useState("reveal");
  const [theme] = useState(THEMES[1]); // Royal
  const [equipped, setEquipped] = useState({});

  return (
    <div className="stage">
      {phase === "reveal" && (
        <ThemeReveal theme={theme} onContinue={() => setPhase("dressing")} onExit={onExit} />
      )}
      {phase === "dressing" && (
        <DressingRoom
          theme={theme}
          equipped={equipped}
          setEquipped={setEquipped}
          onContinue={() => setPhase("runway")}
          onExit={onExit}
          showWebcam={showWebcam}
          visibleCats={visibleCats}
        />
      )}
      {phase === "runway" && (
        <RunwayStage
          theme={theme}
          equipped={equipped}
          onContinue={() => setPhase("results")}
          onExit={onExit}
          showWebcam={showWebcam}
        />
      )}
      {phase === "results" && (
        <ResultsScreen
          theme={theme}
          equipped={equipped}
          onPlayAgain={() => setPhase("reveal")}
          onExit={onExit}
        />
      )}
    </div>
  );
};

// ----- Theme reveal -----
const ThemeReveal = ({ theme, onContinue, onExit }) => {
  useEffect(() => {
    const t = setTimeout(onContinue, 3200);
    return () => clearTimeout(t);
  }, [onContinue]);
  return (
    <div
      className="theme-reveal stage-full"
      style={{
        display: "grid",
        placeItems: "center",
        background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]}, ${theme.colors[2]})`,
        backgroundSize: "200% 200%",
        animation: "holoShift 6s ease infinite",
        position: "relative",
      }}
    >
      <button
        className="btn btn-ghost"
        style={{ position: "absolute", top: 24, left: 24 }}
        onClick={onExit}
      >
        <Icon name="back" size={14} /> Salir
      </button>
      <div style={{ textAlign: "center", padding: 40 }}>
        <div className="eyebrow" style={{ color: "rgba(0,0,0,0.6)", fontSize: 13 }}>
          Tema de hoy
        </div>
        <div
          style={{ fontSize: 96, margin: "8px 0", animation: "sparkle 2s ease-in-out infinite" }}
        >
          {theme.emoji}
        </div>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(80px, 14vw, 200px)",
            margin: "0 0 12px",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #1a0d14, var(--pink-deep))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {theme.name}
        </h1>
        <div
          style={{
            fontSize: 18,
            color: "var(--ink-2)",
            maxWidth: 540,
            margin: "0 auto",
            fontStyle: "italic",
          }}
        >
          {theme.tag}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 12,
            color: "var(--ink-3)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Tienes 90 segundos · vístete · luego camina
        </div>
      </div>
    </div>
  );
};

// ----- Dressing room (closet) -----
const DressingRoom = ({
  theme,
  equipped,
  setEquipped,
  onContinue,
  onExit,
  showWebcam,
  visibleCats,
}) => {
  const [cat, setCat] = useState("dress");
  const [timeLeft, setTimeLeft] = useState(90);
  useEffect(() => {
    if (timeLeft <= 0) {
      onContinue();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, onContinue]);

  const cats = CLOSET_CATEGORIES.filter((c) => visibleCats.includes(c.id));
  const items = CLOSET[cat] || [];

  const equip = (it) => {
    if (it.locked) return;
    setEquipped((e) => ({ ...e, [it.cat]: it }));
  };

  return (
    <div className="dti-shell stage-full" style={{ background: "var(--bg)" }}>
      {/* Closet panel */}
      <div className="closet-panel">
        <div
          style={{
            padding: "16px 18px",
            borderBottom: "1.5px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="eyebrow">Tema</div>
            <div className="serif" style={{ fontSize: 22, fontStyle: "italic" }}>
              {theme.emoji} {theme.name}
            </div>
          </div>
          <button
            className="btn btn-ghost"
            style={{ padding: "8px 12px", fontSize: 12 }}
            onClick={onExit}
          >
            <Icon name="x" size={14} />
          </button>
        </div>
        <div className="closet-tabs">
          {cats.map((c) => (
            <button
              key={c.id}
              className={`closet-tab ${cat === c.id ? "active" : ""}`}
              onClick={() => setCat(c.id)}
            >
              <div style={{ fontSize: 18, marginBottom: 2 }}>{c.emoji}</div>
              {c.name}
            </button>
          ))}
        </div>
        <div className="closet-grid">
          {items.map((it) => (
            <button
              key={it.id}
              className={`closet-item ${it.locked ? "locked" : ""} ${equipped[it.cat]?.id === it.id ? "selected" : ""}`}
              style={{ background: it.bg }}
              onClick={() => equip(it)}
            >
              <div className="outfit-thumb" style={{ fontSize: 32 }}>
                {it.emoji}
              </div>
              <span className="rarity" style={{ color: RARITY[it.rarity].color }}>
                {RARITY[it.rarity].label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Center — avatar + timer */}
      <div
        className="runway-stage"
        style={{ background: `linear-gradient(180deg, ${theme.colors[1]}, var(--bg))` }}
      >
        <div
          style={{
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="hud-pill">
            <Icon name="timer" size={14} /> {timeLeft}s
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
              Vístete
            </div>
            <div className="serif" style={{ fontSize: 26, fontStyle: "italic" }}>
              {theme.tag}
            </div>
          </div>
          <button className="btn btn-pink" onClick={onContinue}>
            Listx · Pasarela <Icon name="chevron" size={14} />
          </button>
        </div>
        <div style={{ height: 6, background: "var(--bg-2)", margin: "0 28px", borderRadius: 999 }}>
          <div
            style={{
              height: "100%",
              width: `${(timeLeft / 90) * 100}%`,
              background:
                timeLeft < 20
                  ? "linear-gradient(90deg, #ff4444, var(--pink))"
                  : "linear-gradient(90deg, var(--pink-deep), var(--pink))",
              borderRadius: 999,
              transition: "width 0.4s linear",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "grid",
            placeItems: "center",
            padding: 32,
            position: "relative",
          }}
        >
          <AvatarPreview equipped={equipped} theme={theme} />
          <div style={{ position: "absolute", bottom: 24, left: 24 }}>
            <WebcamTile show={showWebcam} label="LIVE · CALIBRADO" />
          </div>
        </div>
      </div>

      {/* Outfit summary */}
      <div className="judge-panel">
        <div>
          <div className="eyebrow">Tu outfit</div>
          <h3 className="serif" style={{ fontStyle: "italic", fontSize: 22, marginTop: 4 }}>
            Live preview
          </h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {CLOSET_CATEGORIES.slice(0, 8).map((c) => {
            const eq = equipped[c.id];
            return (
              <div
                key={c.id}
                className="card-soft"
                style={{ padding: 10, display: "flex", gap: 10, alignItems: "center" }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: eq ? eq.bg : "var(--bg-2)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 16,
                  }}
                >
                  {eq ? eq.emoji : c.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="eyebrow" style={{ fontSize: 9 }}>
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {eq ? eq.name : "—"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="card-soft" style={{ padding: 14 }}>
          <div className="eyebrow">Match con tema</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <div style={{ flex: 1, height: 8, background: "var(--bg-2)", borderRadius: 999 }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, Object.keys(equipped).length * 18)}%`,
                  background: "linear-gradient(90deg, var(--pink), var(--lilac))",
                  borderRadius: 999,
                }}
              />
            </div>
            <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>
              {Math.min(100, Object.keys(equipped).length * 18)}%
            </span>
          </div>
        </div>
        <div className="card-soft" style={{ padding: 14 }}>
          <div className="eyebrow">Tips de jueces</div>
          <ul
            style={{
              margin: "8px 0 0",
              paddingLeft: 16,
              fontSize: 12,
              color: "var(--ink-2)",
              lineHeight: 1.7,
            }}
          >
            <li>Una pieza Holo ✦ duplica tu score base</li>
            <li>Capas: top + bottom + dress puntúa más que solo dress</li>
            <li>Accesorios que combinen con el tema dan bonus</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ----- Avatar preview -----
const AvatarPreview = ({ equipped, theme }) => {
  return (
    <div style={{ position: "relative", width: 280, aspectRatio: "0.55" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${theme.colors[0]}33, transparent)`,
          borderRadius: "140px 140px 18px 18px",
          border: "2px solid var(--line)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <PoseFigure pose="runway" color="var(--ink)" size={200} />
      </div>
      {/* Floating equipped item stickers */}
      {Object.values(equipped)
        .slice(0, 5)
        .map((it, i) => (
          <div
            key={it.id}
            style={{
              position: "absolute",
              top: `${[8, 28, 50, 70, 86][i]}%`,
              left: i % 2 === 0 ? -22 : "auto",
              right: i % 2 === 1 ? -22 : "auto",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: it.bg,
              display: "grid",
              placeItems: "center",
              fontSize: 24,
              border: "2px solid var(--card)",
              boxShadow: "0 8px 22px -8px rgba(0,0,0,0.3)",
              transform: `rotate(${i % 2 ? 6 : -6}deg)`,
            }}
          >
            {it.emoji}
          </div>
        ))}
      <div className="sticker" style={{ top: -10, right: 30 }}>
        {theme.emoji} {theme.name}
      </div>
    </div>
  );
};

// ----- Runway -----
const RunwayStage = ({ theme, equipped, onContinue, onExit, showWebcam }) => {
  const [poseIdx, setPoseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [scores, setScores] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const sequence = POSES.slice(0, 3);

  useEffect(() => {
    if (timeLeft <= 0) {
      const newScore = 70 + Math.floor(Math.random() * 28);
      const rating =
        newScore >= 95 ? "PERFECT" : newScore >= 85 ? "GREAT" : newScore >= 70 ? "GOOD" : "MISS";
      setFeedback({ score: newScore, rating });
      setScores((s) => [...s, newScore]);
      setTimeout(() => {
        setFeedback(null);
        if (poseIdx + 1 >= sequence.length) {
          onContinue();
        } else {
          setPoseIdx((i) => i + 1);
          setTimeLeft(4);
        }
      }, 1400);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 0.1), 100);
    return () => clearTimeout(t);
  }, [timeLeft, poseIdx]);

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const currentPose = sequence[poseIdx];

  return (
    <div
      className="stage-full"
      style={{
        position: "relative",
        background: `linear-gradient(180deg, ${theme.colors[1]}, ${theme.colors[0]}, ${theme.colors[2]})`,
        overflow: "hidden",
      }}
    >
      {/* Spotlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: "100%",
          background: "radial-gradient(ellipse at top, rgba(255,255,255,0.5), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* HUD top */}
      <div className="hud-top">
        <button className="btn btn-ghost" style={{ padding: "8px 14px" }} onClick={onExit}>
          <Icon name="x" size={14} />
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="hud-pill">
            <Icon name="sparkle" size={14} /> {theme.name}
          </div>
          <div className="hud-pill">
            Pose {poseIdx + 1}/{sequence.length}
          </div>
          <div className="hud-pill mono">{totalScore.toLocaleString()} pts</div>
        </div>
        <div className="hud-pill">
          <Icon name="music" size={14} /> Cherry FM
        </div>
      </div>

      {/* Timer */}
      <div style={{ padding: "0 28px", marginTop: 4 }}>
        <div className="timer-bar" style={{ height: 10 }}>
          <span style={{ width: `${(timeLeft / 4) * 100}%` }} />
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          position: "absolute",
          inset: "120px 0 140px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          placeItems: "center",
          padding: "0 60px",
        }}
      >
        {/* Target pose */}
        <div style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
            Pose objetivo
          </div>
          <h2 className="serif" style={{ fontStyle: "italic", fontSize: 36, margin: "6px 0 14px" }}>
            {currentPose.icon} {currentPose.name}
          </h2>
          <div
            style={{
              display: "inline-grid",
              placeItems: "center",
              padding: 24,
              background: "rgba(255,255,255,0.6)",
              borderRadius: 24,
              border: "1.5px solid var(--line)",
              backdropFilter: "blur(10px)",
            }}
          >
            <PoseFigure pose={currentPose.id} color="var(--pink-deep)" size={220} />
          </div>
        </div>
        {/* You */}
        <div style={{ textAlign: "center" }}>
          <div className="eyebrow">Tú</div>
          <h2
            className="serif"
            style={{ fontStyle: "italic", fontSize: 36, margin: "6px 0 14px", color: "var(--ink)" }}
          >
            Match: 87%
          </h2>
          <div
            style={{
              position: "relative",
              display: "inline-grid",
              placeItems: "center",
              padding: 24,
              background: "linear-gradient(160deg, #2a1a22, #4a2a3a)",
              borderRadius: 24,
              color: "white",
              overflow: "hidden",
              border: "1.5px solid var(--line)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#ff3344",
                boxShadow: "0 0 8px #ff3344",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".2em",
              }}
            >
              LIVE
            </span>
            <PoseFigure pose={currentPose.id} color="rgba(255,255,255,0.85)" size={220} />
            {/* Joint dots */}
            {[
              [50, 12],
              [30, 30],
              [70, 30],
              [50, 40],
              [36, 86],
              [64, 86],
            ].map(([x, y], i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: `${24 + x * 1.7}%`,
                  top: `${24 + y * 0.65}%`,
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "var(--pink-2)",
                  boxShadow: "0 0 8px var(--pink)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feedback burst */}
      {feedback && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ textAlign: "center", animation: "toastIn 0.3s" }}>
            <div className="score-burst" style={{ fontSize: 140 }}>
              {feedback.rating}
            </div>
            <div
              className="serif"
              style={{ fontStyle: "italic", fontSize: 64, color: "var(--ink)" }}
            >
              +{feedback.score}
            </div>
          </div>
        </div>
      )}

      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 28px",
          alignItems: "flex-end",
        }}
      >
        <WebcamTile show={showWebcam} label="JURADO LIVE" />
        <div style={{ display: "flex", gap: 6 }}>
          {sequence.map((p, i) => (
            <div
              key={p.id}
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                background:
                  scores[i] != null ? "var(--ink)" : i === poseIdx ? "var(--pink)" : "var(--card)",
                color: scores[i] != null ? "var(--bg)" : i === poseIdx ? "white" : "var(--ink-3)",
                fontWeight: 700,
                fontSize: 13,
                border: "1.5px solid var(--line)",
                minWidth: 80,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 18 }}>{p.icon}</div>
              {scores[i] != null ? scores[i] : i === poseIdx ? "AHORA" : "—"}
            </div>
          ))}
        </div>
        <div
          className="hud-pill"
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            borderRadius: 14,
            padding: "10px 16px",
          }}
        >
          <span className="eyebrow">Bonus outfit</span>
          <span
            className="mono"
            style={{ fontWeight: 700, fontSize: 16, color: "var(--pink-deep)" }}
          >
            ×{Object.keys(equipped).length > 5 ? "1.5" : "1.2"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ----- Results -----
const ResultsScreen = ({ theme, equipped, onPlayAgain, onExit }) => {
  const finalScore = 9420;
  const rating = "S";
  const breakdown = [
    { l: "Pasarela", v: 2840 },
    { l: "Vogue", v: 3120 },
    { l: "Manos en cintura", v: 2660 },
    { l: "Bonus outfit ×1.5", v: 800 },
  ];
  const judges = [
    { name: "Cleo", score: 9.8, c: "var(--pink)" },
    { name: "Atlas", score: 9.2, c: "var(--lilac)" },
    { name: "Zora", score: 9.6, c: "var(--mint)" },
  ];

  return (
    <div
      className="stage-full"
      style={{
        overflow: "auto",
        background: `linear-gradient(160deg, ${theme.colors[0]}, ${theme.colors[1]})`,
        position: "relative",
      }}
    >
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <button className="btn btn-ghost" onClick={onExit}>
            <Icon name="back" size={14} /> Lobby
          </button>
          <div className="hud-pill">
            {theme.emoji} {theme.name} · daily
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "30px 0 24px" }}>
          <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
            Tu pasarela
          </div>
          <div
            className="serif"
            style={{
              fontStyle: "italic",
              fontSize: 220,
              lineHeight: 0.9,
              margin: "8px 0",
              background: "linear-gradient(135deg, var(--pink-deep), var(--lilac), var(--pink))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {rating}
          </div>
          <div className="serif" style={{ fontStyle: "italic", fontSize: 72, margin: 0 }}>
            {finalScore.toLocaleString()}
          </div>
          <div style={{ marginTop: 16, fontSize: 14, color: "var(--ink-2)" }}>
            #2 global hoy · subiste 4 puestos
          </div>
        </div>

        {/* Judges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginBottom: 22,
          }}
        >
          {judges.map((j) => (
            <div
              key={j.name}
              className="card shine"
              style={{ display: "flex", gap: 14, alignItems: "center", background: "var(--card)" }}
            >
              <div
                className="avatar-bubble"
                style={{ background: j.c, width: 52, height: 52, fontSize: 20 }}
              >
                {j.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div className="eyebrow">Juez · IA</div>
                <div className="serif" style={{ fontSize: 22, fontStyle: "italic" }}>
                  {j.name}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontWeight: 800,
                  fontSize: 36,
                }}
              >
                {j.score}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 22 }}>
          <div className="card">
            <h3 className="serif" style={{ fontStyle: "italic", fontSize: 24, margin: "0 0 12px" }}>
              Breakdown
            </h3>
            {breakdown.map((b) => (
              <div
                key={b.l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span>{b.l}</span>
                <span className="mono" style={{ fontWeight: 700 }}>
                  +{b.v}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 14,
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 20,
              }}
            >
              <span>Total</span>
              <span>{finalScore.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card holo" style={{ padding: 18, color: "var(--ink)" }}>
              <div className="eyebrow">Recompensas</div>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  marginTop: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span className="coin" style={{ fontSize: 22 }}>
                  +520
                </span>
                <span className="gem" style={{ fontSize: 22 }}>
                  +12
                </span>
                <span className="chip chip-dark">Pase Glam +250 XP</span>
                <span className="chip">✦ Sticker "Royal Slay"</span>
              </div>
            </div>
            <div className="card">
              <h3
                className="serif"
                style={{ fontStyle: "italic", fontSize: 20, margin: "0 0 10px" }}
              >
                Tu outfit
              </h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {Object.values(equipped).map((it) => (
                  <div
                    key={it.id}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background: it.bg,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 26,
                    }}
                  >
                    {it.emoji}
                  </div>
                ))}
                {Object.values(equipped).length === 0 && (
                  <div style={{ color: "var(--ink-3)", fontSize: 13 }}>(naked runway 😅)</div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-pink" style={{ flex: 1 }} onClick={onPlayAgain}>
                Otra vuelta
              </button>
              <button className="btn btn-ghost">
                <Icon name="heart" size={14} /> Guardar fit
              </button>
              <button className="btn btn-ghost">
                <Icon name="play" size={14} /> Replay
              </button>
            </div>
          </div>
        </div>

        {/* Daily ranking */}
        <div className="card" style={{ marginTop: 22 }}>
          <h3 className="serif" style={{ fontStyle: "italic", fontSize: 24, margin: "0 0 12px" }}>
            Ranking · daily
          </h3>
          {RANKINGS.map((r) => (
            <div
              key={r.rank}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 4px",
                borderBottom: "1px solid var(--line)",
                background: r.you ? "var(--pink-soft)" : "transparent",
                borderRadius: r.you ? 10 : 0,
                paddingLeft: r.you ? 12 : 4,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 28,
                  fontWeight: 800,
                  width: 40,
                  color: r.rank <= 3 ? "var(--pink-deep)" : "var(--ink-3)",
                }}
              >
                {r.rank}
              </div>
              <div
                className="avatar-bubble"
                style={{ background: r.c, width: 40, height: 40, fontSize: 16 }}
              >
                {r.name[0]}
              </div>
              <div style={{ flex: 1, fontWeight: r.you ? 800 : 600 }}>{r.name}</div>
              <span className="chip chip-dark" style={{ fontSize: 11 }}>
                {r.rating}
              </span>
              <span className="mono" style={{ fontSize: 14, fontWeight: 700 }}>
                {r.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.PA_DTI = { DTIFlow };
