/* global React, PA_DATA, PA_UI */
const { useState, useEffect, useRef, useMemo } = React;
const { THEMES, CLOSET_CATEGORIES, CLOSET, RARITY, POSES, FRIENDS, GAMES, RANKINGS, ACHIEVEMENTS } =
  PA_DATA;
const { Icon, PoseFigure, WebcamTile, Stars } = PA_UI;

// ============================================
// ONBOARDING — Welcome → Camera → Calibration
// ============================================

const OnboardingFlow = ({ onDone }) => {
  const [step, setStep] = useState(0);

  if (step === 0)
    return (
      <div
        className="stage"
        style={{ background: "linear-gradient(135deg, var(--pink-soft), var(--holo-2))" }}
      >
        <div style={{ maxWidth: 720, padding: 40, textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
            PoseArena presenta
          </div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(56px, 9vw, 120px)",
              fontStyle: "italic",
              margin: "12px 0",
              lineHeight: 0.92,
            }}
          >
            Dress
            <br />
            to{" "}
            <em
              style={{
                background: "linear-gradient(135deg, var(--pink-deep), var(--lilac))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Impress
            </em>
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 460, margin: "0 auto 28px" }}>
            Pasarela con tu cuerpo como mando. Tema → 90s para vestirte → poses → puntuación.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => setStep(1)}>
              Empezar <Icon name="chevron" />
            </button>
            <button className="btn btn-ghost" onClick={onDone}>
              Ver demo
            </button>
          </div>
          <div
            style={{
              marginTop: 56,
              display: "flex",
              gap: 24,
              justifyContent: "center",
              color: "var(--ink-3)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span>
              <Icon name="eye" size={14} /> 100% en tu navegador
            </span>
            <span>
              <Icon name="camera" size={14} /> Webcam · sin instalar nada
            </span>
            <span>
              <Icon name="sparkle" size={14} /> Para 1–4 jugadorxs
            </span>
          </div>
        </div>
      </div>
    );

  if (step === 1)
    return (
      <div className="stage">
        <div className="panel" style={{ padding: 36, maxWidth: 520, textAlign: "center" }}>
          <div
            style={{
              width: 88,
              height: 88,
              margin: "0 auto 18px",
              borderRadius: 24,
              background: "var(--pink-soft)",
              display: "grid",
              placeItems: "center",
              color: "var(--pink-deep)",
            }}
          >
            <Icon name="camera" size={42} />
          </div>
          <div className="eyebrow">Paso 1 / 2 — Permiso</div>
          <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 12px" }}>
            Necesitamos tu cámara
          </h2>
          <p style={{ color: "var(--ink-3)", marginBottom: 22, lineHeight: 1.5 }}>
            Tu video se procesa en tu navegador, nunca sale de tu computadora. Sin telemetría, sin
            grabación.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn btn-pink" onClick={() => setStep(2)}>
              Permitir cámara
            </button>
            <button className="btn btn-ghost" onClick={onDone}>
              Saltar
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="stage">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          maxWidth: 900,
          alignItems: "center",
          padding: 40,
        }}
      >
        <div>
          <div className="eyebrow">Paso 2 / 2 — Calibración</div>
          <h2 className="serif" style={{ fontSize: 44, margin: "8px 0 14px", lineHeight: 0.95 }}>
            Da un paso atrás{" "}
            <em style={{ fontStyle: "italic", color: "var(--pink-deep)" }}>y posa</em>
          </h2>
          <p style={{ color: "var(--ink-3)", marginBottom: 20, lineHeight: 1.5 }}>
            Toca los puntos rosas con manos y pies para validar el tracking. Toma ~6 segundos.
          </p>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { t: "Cara visible", ok: true },
              { t: "Hombros y cadera detectados", ok: true },
              { t: "Manos arriba", ok: true },
              { t: "Pies separados", ok: false, prog: 0.7 },
            ].map((c) => (
              <div
                key={c.t}
                style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: c.ok ? "var(--mint)" : "var(--bg-2)",
                    color: "var(--ink)",
                  }}
                >
                  {c.ok ? <Icon name="check" size={14} /> : null}
                </span>
                {c.t}
                {!c.ok && (
                  <span
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: "var(--bg-2)",
                      marginLeft: 12,
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        height: "100%",
                        width: `${(c.prog || 0) * 100}%`,
                        background: "var(--pink)",
                        borderRadius: 2,
                      }}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={onDone}>
            Entrar al lobby <Icon name="chevron" />
          </button>
        </div>
        <div
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: 24,
            background: "linear-gradient(160deg, #2a1a22, #4a2a3a)",
            overflow: "hidden",
            border: "1.5px solid var(--line)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <PoseFigure pose="hips" color="rgba(255,255,255,0.55)" size={180} />
          </div>
          {[
            [20, 30],
            [80, 30],
            [50, 50],
            [30, 80],
            [70, 80],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="calib-target"
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
          <span
            className="rec-dot"
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
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 14,
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".18em",
            }}
          >
            CALIBRANDO… 87%
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HOME / LOBBY
// ============================================

const Home = ({ setRoute, openDTI, openGame, tileVariant }) => {
  return (
    <div className="shell-pad" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div className="hero shine">
        <span className="sticker" style={{ top: 24, right: 36 }}>
          ✦ DAILY THEME ✦
        </span>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 28, alignItems: "end" }}
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
              Hoy en pasarela
            </div>
            <h1>
              Royal <em>Affair</em>
            </h1>
            <p style={{ marginTop: 8, fontSize: 16, color: "var(--ink-2)", maxWidth: 480 }}>
              Tiaras, capas de terciopelo, joyas que pesan. 90 segundos para vestirte. Tres poses.
              Una corona.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={openDTI}>
                <Icon name="play" /> Jugar Daily
              </button>
              <button className="btn btn-ghost" onClick={() => setRoute("play")}>
                Ver todos los modos
              </button>
              <span className="chip chip-pink">
                <Icon name="timer" size={12} /> Resetea en 7h 12m
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <div
              className="card"
              style={{
                background: "var(--card)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 140,
              }}
            >
              <span className="eyebrow">Mejor hoy</span>
              <div className="serif" style={{ fontSize: 32, fontStyle: "italic" }}>
                9,840
              </div>
              <span style={{ fontSize: 12, color: "var(--ink-3)" }}>@mia · S+</span>
            </div>
            <div
              className="card holo"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 140,
                color: "var(--ink)",
              }}
            >
              <span className="eyebrow" style={{ color: "var(--ink)" }}>
                Tu mejor
              </span>
              <div className="serif" style={{ fontSize: 32, fontStyle: "italic" }}>
                9,620
              </div>
              <span style={{ fontSize: 12 }}>S · #2 global</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-grid">
        <DailyCard openDTI={openDTI} />
        <BattlePassCard setRoute={setRoute} />
      </div>

      <section>
        <SectionHeader
          title="Modos"
          subtitle="9 juegos · pose-controlled"
          action="Ver todos"
          onAction={() => setRoute("play")}
        />
        <div className="game-grid">
          {GAMES.slice(0, 6).map((g) => (
            <GameTile
              key={g.id}
              game={g}
              variant={tileVariant}
              onClick={() => (g.id === "dti" ? openDTI() : openGame(g.id))}
            />
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22 }}>
        <FriendsFeed />
        <RecentItems />
      </section>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, action, onAction }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 14,
    }}
  >
    <div>
      <h2 className="serif" style={{ fontSize: 28, margin: 0, fontStyle: "italic" }}>
        {title}
      </h2>
      {subtitle && (
        <div className="eyebrow" style={{ marginTop: 4 }}>
          {subtitle}
        </div>
      )}
    </div>
    {action && (
      <button className="btn btn-ghost" onClick={onAction}>
        {action} <Icon name="chevron" size={14} />
      </button>
    )}
  </div>
);

const DailyCard = ({ openDTI }) => (
  <div className="daily-card">
    <div
      style={{
        position: "absolute",
        right: -40,
        top: -40,
        width: 200,
        height: 200,
        borderRadius: 999,
        background: "linear-gradient(135deg, var(--pink), var(--lilac))",
        opacity: 0.4,
        filter: "blur(20px)",
      }}
    />
    <div className="label">Daily Challenge</div>
    <div className="theme-name">
      Cyberpunk <em style={{ color: "var(--pink-2)" }}>Glitch</em>
    </div>
    <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
      {["neon", "mesh", "chrome", "hologram"].map((t) => (
        <span
          key={t}
          className="chip"
          style={{
            background: "rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.2)",
            color: "var(--pink-2)",
          }}
        >
          #{t}
        </span>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
        <span>
          <div className="eyebrow" style={{ color: "var(--pink-2)" }}>
            Recompensa
          </div>
          <span className="coin" style={{ color: "white", marginTop: 4 }}>
            +500
          </span>
        </span>
        <span>
          <div className="eyebrow" style={{ color: "var(--pink-2)" }}>
            Gemas
          </div>
          <span className="gem" style={{ color: "white", marginTop: 4 }}>
            +12
          </span>
        </span>
        <span>
          <div className="eyebrow" style={{ color: "var(--pink-2)" }}>
            Acaba en
          </div>
          <span style={{ color: "white", fontWeight: 700, marginTop: 4, display: "block" }}>
            7h 12m
          </span>
        </span>
      </div>
      <button className="btn btn-pink" onClick={openDTI}>
        Empezar
      </button>
    </div>
  </div>
);

const BattlePassCard = ({ setRoute }) => (
  <div className="bp-card">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div className="eyebrow">Pase Glam · S3</div>
        <div className="serif" style={{ fontSize: 22, fontStyle: "italic" }}>
          Cherry Holo
        </div>
      </div>
      <span className="chip chip-pink">
        <Icon name="sparkle" size={12} /> Lvl 22 / 50
      </span>
    </div>
    <div className="bp-progress">
      <span style={{ width: "44%" }} />
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            aspectRatio: 1,
            borderRadius: 10,
            background:
              i <= 3 ? "linear-gradient(135deg, var(--holo-1), var(--holo-2))" : "var(--bg-2)",
            border: "1.5px solid " + (i === 4 ? "var(--pink)" : "var(--line)"),
            display: "grid",
            placeItems: "center",
            fontSize: 18,
            opacity: i <= 3 ? 1 : 0.5,
          }}
        >
          {["👑", "💄", "✦", "👠", "💍", "👗"][i - 1]}
        </div>
      ))}
    </div>
    <button className="btn btn-ghost" style={{ marginTop: 4 }} onClick={() => setRoute("pass")}>
      Ver recompensas
    </button>
  </div>
);

const GameTile = ({ game, variant = "auto", onClick }) => {
  const v = variant === "auto" ? game.variant : variant;
  const isHolo = v === "holo";
  return (
    <button className={`game-tile tile-variant-${v}`} onClick={onClick}>
      <div className="tile-art">
        {isHolo && (
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <div
              style={{
                fontSize: 64,
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 800,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "-0.04em",
              }}
            >
              DTI
            </div>
          </div>
        )}
        {v === "poster" && (
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <PoseFigure
              pose={["vogue", "runway", "twirl", "hips"][game.id.length % 4]}
              color="rgba(255,255,255,0.85)"
              size={120}
            />
          </div>
        )}
        {v === "magazine" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              className="serif"
              style={{
                fontSize: 48,
                fontStyle: "italic",
                color: "var(--pink-deep)",
                lineHeight: 0.85,
              }}
            >
              {game.name.split(" ")[0]}
            </div>
            <div className="eyebrow">Issue · {game.players}</div>
          </div>
        )}
        {v === "minimal" && (
          <div
            style={{
              position: "absolute",
              inset: 18,
              border: "1.5px solid var(--line)",
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
            }}
          >
            <PoseFigure pose="lean" color="var(--ink-3)" size={100} />
          </div>
        )}
      </div>
      {isHolo && (
        <span className="chip chip-pink tile-badge">
          <Icon name="sparkle" size={12} /> FEATURED
        </span>
      )}
      {!game.ready && <span className="chip chip-dark tile-badge">SOON</span>}
      <button
        className="btn btn-icon tile-fav"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Icon name="heart" size={14} />
      </button>
      {v !== "minimal" && (
        <div className="tile-overlay">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
            {game.players} jugando
          </div>
          <div
            style={{ fontFamily: "var(--serif)", fontSize: 24, fontStyle: "italic", marginTop: 2 }}
          >
            {game.name}
          </div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{game.tag}</div>
        </div>
      )}
      {v === "minimal" && (
        <div className="tile-overlay">
          <div className="eyebrow">{game.players} jugando</div>
          <div className="serif" style={{ fontSize: 22, fontStyle: "italic", marginTop: 2 }}>
            {game.name}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{game.tag}</div>
        </div>
      )}
    </button>
  );
};

const FriendsFeed = () => (
  <div className="card">
    <SectionHeader title="Amigxs · feed" subtitle="En vivo" />
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {FRIENDS.map((f) => (
        <div key={f.name} className="feed-row">
          <div className={`avatar-bubble ${f.online ? "online" : ""}`}>{f.initial}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
              <strong style={{ fontSize: 14 }}>{f.name}</strong>
              <Stars count={Math.round(f.rating)} />
              <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{f.rating}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{f.last}</div>
          </div>
          <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
            Reto
          </button>
        </div>
      ))}
    </div>
  </div>
);

const RecentItems = () => (
  <div className="card">
    <SectionHeader title="Closet" subtitle="Nuevos esta semana" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {CLOSET.dress.slice(0, 6).map((it) => (
        <div key={it.id} className="closet-item" style={{ background: it.bg, aspectRatio: 1 }}>
          <div className="outfit-thumb">{it.emoji}</div>
          <span className="rarity" style={{ color: RARITY[it.rarity].color }}>
            {RARITY[it.rarity].label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// PLAY — game list
// ============================================
const PlayScreen = ({ openDTI, openGame, tileVariant }) => (
  <div className="shell-pad">
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <div>
        <div className="eyebrow">Catálogo</div>
        <h1 className="serif" style={{ fontSize: 56, fontStyle: "italic", margin: "6px 0" }}>
          Modos
        </h1>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <span className="chip chip-dark">Todos</span>
        <span className="chip">Pasarela</span>
        <span className="chip">Cardio</span>
        <span className="chip">Solo</span>
        <span className="chip">Multi</span>
      </div>
    </div>
    <div className="game-grid">
      {GAMES.map((g) => (
        <GameTile
          key={g.id}
          game={g}
          variant={tileVariant}
          onClick={() => (g.id === "dti" ? openDTI() : openGame(g.id))}
        />
      ))}
    </div>
  </div>
);

// ============================================
// CLOSET / WARDROBE SCREEN (browse-only)
// ============================================
const ClosetScreen = ({ visibleCats }) => {
  const [cat, setCat] = useState("dress");
  const cats = CLOSET_CATEGORIES.filter((c) => visibleCats.includes(c.id));
  return (
    <div className="shell-pad">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <div>
          <div className="eyebrow">Mi guardarropa</div>
          <h1 className="serif" style={{ fontSize: 56, fontStyle: "italic", margin: "6px 0" }}>
            Closet
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="chip">
            <Icon name="sparkle" size={12} /> 142 ítems
          </span>
          <span className="chip chip-pink">3 Holo</span>
          <button className="btn btn-pink">+ Outfit</button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {cats.map((c) => (
          <button
            key={c.id}
            className={`chip ${cat === c.id ? "chip-dark" : ""}`}
            onClick={() => setCat(c.id)}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
        {(CLOSET[cat] || []).map((it) => (
          <div
            key={it.id}
            className={`closet-item ${it.locked ? "locked" : ""}`}
            style={{ background: it.bg }}
          >
            <div className="outfit-thumb" style={{ fontSize: 36 }}>
              {it.emoji}
            </div>
            <span className="rarity" style={{ color: RARITY[it.rarity].color }}>
              {RARITY[it.rarity].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.PA_SCREENS_1 = { OnboardingFlow, Home, PlayScreen, ClosetScreen, GameTile, SectionHeader };
