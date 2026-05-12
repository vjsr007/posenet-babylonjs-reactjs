import { Icon } from "@/components/Icon";
import { useLobbyStore } from "@/features/lobby/state";
import { ALL_GAMES, GameTile } from "./shared/GameTile";

interface HomeScreenProps {
  openDTI: () => void;
  openGame: (id: string) => void;
}

export function HomeScreen({ openDTI, openGame }: HomeScreenProps) {
  const setRoute = useLobbyStore((s) => s.setRoute);

  return (
    <div className="shell-pad" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Hero */}
      <div className="hero shine">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 28,
            alignItems: "end",
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
              Hoy en pasarela
            </div>
            <h1>
              Royal <em>Affair</em>
            </h1>
            <p
              style={{
                marginTop: 8,
                fontSize: 16,
                color: "var(--ink-2)",
                maxWidth: 480,
              }}
            >
              Tiaras, capas de terciopelo, joyas que pesan. 90 segundos para vestirte. Tres poses.
              Una corona.
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              <button className="btn btn-primary" type="button" onClick={openDTI}>
                <Icon name="play" /> Jugar Daily
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setRoute("play")}>
                Ver todos los modos
              </button>
              <span className="chip chip-pink">
                <Icon name="timer" size={12} /> 7h 12m
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <div
              className="card"
              style={{
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

      {/* Daily + BattlePass cards */}
      <div className="hero-grid">
        <DailyCard openDTI={openDTI} />
        <BattlePassCard setRoute={() => setRoute("pass")} />
      </div>

      {/* Game grid */}
      <section>
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
              Modos
            </h2>
            <div className="eyebrow" style={{ marginTop: 4 }}>
              {ALL_GAMES.length} juegos · pose-controlled
            </div>
          </div>
          <button className="btn btn-ghost" type="button" onClick={() => setRoute("play")}>
            Ver todos <Icon name="chevron" size={14} />
          </button>
        </div>
        <div className="game-grid">
          {ALL_GAMES.slice(0, 6).map((g) => (
            <GameTile
              key={g.id}
              game={g}
              onClick={() => (g.id === "dti" ? openDTI() : openGame(g.id))}
            />
          ))}
        </div>
      </section>

      {/* Friends + Recents */}
      <section style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22 }}>
        <FriendsFeed />
        <RecentItems />
      </section>
    </div>
  );
}

function DailyCard({ openDTI }: { openDTI: () => void }) {
  return (
    <div className="daily-card">
      <div className="label">Daily Challenge</div>
      <div className="theme-name">
        Cyberpunk <em style={{ color: "var(--pink-2)" }}>Glitch</em>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            <span
              style={{
                color: "white",
                fontWeight: 700,
                marginTop: 4,
                display: "block",
              }}
            >
              7h 12m
            </span>
          </span>
        </div>
        <button className="btn btn-pink" type="button" onClick={openDTI}>
          Empezar
        </button>
      </div>
    </div>
  );
}

function BattlePassCard({ setRoute }: { setRoute: () => void }) {
  const PASS_ITEMS = ["👑", "💄", "✦", "👠", "💍", "👗"] as const;
  return (
    <div className="bp-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        {PASS_ITEMS.map((emoji, i) => (
          <div
            key={emoji}
            style={{
              flex: 1,
              aspectRatio: "1",
              borderRadius: 10,
              background:
                i <= 2 ? "linear-gradient(135deg, var(--holo-1), var(--holo-2))" : "var(--bg-2)",
              border: "1.5px solid " + (i === 3 ? "var(--pink)" : "var(--line)"),
              display: "grid",
              placeItems: "center",
              fontSize: 18,
              opacity: i <= 2 ? 1 : 0.5,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
      <button className="btn btn-ghost" type="button" style={{ marginTop: 4 }} onClick={setRoute}>
        Ver recompensas
      </button>
    </div>
  );
}

function FriendsFeed() {
  const FEED = [
    { name: "Mia", initial: "M", online: true, score: "S+ · 9,840", time: "12m" },
    { name: "Luna", initial: "L", online: true, score: "S · 9,210", time: "1h" },
    { name: "Iris", initial: "I", online: false, score: "A+ · 8,640", time: "3h" },
  ];
  return (
    <div className="card">
      <h2 className="serif" style={{ fontSize: 22, fontStyle: "italic", marginBottom: 12 }}>
        Amigxs · feed
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {FEED.map((f) => (
          <div key={f.name} className="feed-row">
            <div className={`avatar-bubble${f.online ? " online" : ""}`}>{f.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ fontSize: 14 }}>{f.name}</strong>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{f.score}</div>
            </div>
            <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{f.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentItems() {
  const ITEMS = [
    { bg: "#ffd1e3", emoji: "👗" },
    { bg: "#cef4ff", emoji: "👠" },
    { bg: "#fff4c4", emoji: "💍" },
    { bg: "#e7d0ff", emoji: "👑" },
    { bg: "#b9f3d8", emoji: "💄" },
    { bg: "#ff85b8", emoji: "👜" },
  ];
  return (
    <div className="card">
      <h2 className="serif" style={{ fontSize: 22, fontStyle: "italic", marginBottom: 12 }}>
        Closet
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {ITEMS.map((it) => (
          <div
            key={it.emoji}
            style={{
              background: it.bg,
              aspectRatio: "1",
              borderRadius: 10,
              display: "grid",
              placeItems: "center",
              fontSize: 28,
            }}
          >
            {it.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
