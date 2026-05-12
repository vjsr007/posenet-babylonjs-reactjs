import { Icon } from "@/components/Icon";
import { RANKINGS } from "@/lib/data";

interface FeedEntry {
  n: string;
  i: string;
  on: boolean;
  t: string;
  score: string;
  time: string;
  emoji: string;
}

const FEED: FeedEntry[] = [
  {
    n: "Mia",
    i: "M",
    on: true,
    t: "Royal Affair",
    score: "S+ · 9,840",
    time: "hace 12m",
    emoji: "👑",
  },
  {
    n: "Luna",
    i: "L",
    on: true,
    t: "Cyberpunk Glitch",
    score: "S · 9,210",
    time: "hace 1h",
    emoji: "🤖",
  },
  {
    n: "Iris",
    i: "I",
    on: false,
    t: "Beach Daze",
    score: "A+ · 8,640",
    time: "hace 3h",
    emoji: "🌊",
  },
  { n: "Vega", i: "V", on: true, t: "Y2K Frost", score: "A · 8,120", time: "hace 5h", emoji: "💿" },
];

const LOBBY_COLORS = ["var(--pink)", "var(--lilac)", "var(--mint)", "var(--holo-2)"];

export function FriendsScreen() {
  return (
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
          <div className="eyebrow">Tu mundo</div>
          <h1 className="serif" style={{ fontSize: 56, fontStyle: "italic", margin: "6px 0" }}>
            Amigxs
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" type="button">
            + Invitar
          </button>
          <button className="btn btn-pink" type="button">
            Lobby privado
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {/* Feed */}
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <h2 className="serif" style={{ fontSize: 28, margin: 0, fontStyle: "italic" }}>
              Feed
            </h2>
            <div className="eyebrow">Últimas pasarelas</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {FEED.map((f) => (
              <div
                key={f.n}
                className="feed-row"
                style={{
                  padding: 12,
                  border: "1.5px solid var(--line)",
                  borderRadius: 12,
                  alignItems: "stretch",
                }}
              >
                <div className={`avatar-bubble${f.on ? " online" : ""}`}>{f.i}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong>{f.n}</strong>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
                    {f.emoji} {f.t} · {f.score}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--ink-3)",
                      marginTop: 2,
                    }}
                  >
                    {f.time}
                  </div>
                </div>
                <button className="btn btn-ghost" type="button" style={{ padding: "8px 14px" }}>
                  <Icon name="heart" size={14} />
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ padding: "8px 14px", fontSize: 12 }}
                >
                  Reto
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Lobby card */}
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <h2 className="serif" style={{ fontSize: 22, margin: 0, fontStyle: "italic" }}>
                Lobby privado
              </h2>
              <div className="eyebrow">4 invitadas</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {(["Y", "M", "L", "I"] as const).map((initial, idx) => (
                <div
                  key={initial}
                  className="avatar-bubble"
                  style={{
                    width: 56,
                    height: 56,
                    fontSize: 22,
                    background: LOBBY_COLORS[idx] ?? "var(--pink)",
                  }}
                >
                  {initial}
                </div>
              ))}
              <div
                className="avatar-bubble"
                style={{
                  width: 56,
                  height: 56,
                  fontSize: 22,
                  background: "var(--bg-2)",
                  color: "var(--ink-3)",
                  border: "2px dashed var(--line-2)",
                }}
              >
                +
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-pink" type="button" style={{ flex: 1 }}>
                Empezar pasarela
              </button>
              <button className="btn btn-ghost" type="button">
                Tema random
              </button>
            </div>
          </div>

          {/* Rankings */}
          <div className="card">
            <h2
              className="serif"
              style={{
                fontSize: 22,
                margin: "0 0 14px",
                fontStyle: "italic",
              }}
            >
              Ranking · amigxs
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {RANKINGS.slice(0, 6).map((r) => (
                <div
                  key={r.rank}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 4px",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 24,
                      fontWeight: 800,
                      width: 36,
                      color: r.you ? "var(--pink-deep)" : "var(--ink-3)",
                    }}
                  >
                    {r.rank}
                  </div>
                  <div
                    className="avatar-bubble"
                    style={{
                      background: r.c,
                      width: 36,
                      height: 36,
                      fontSize: 14,
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontWeight: r.you ? 800 : 600,
                      fontSize: 14,
                    }}
                  >
                    {r.name}
                    {r.you && (
                      <span
                        className="chip chip-pink"
                        style={{
                          marginLeft: 8,
                          fontSize: 9,
                          padding: "2px 6px",
                        }}
                      >
                        YOU
                      </span>
                    )}
                  </div>
                  <span className="chip chip-dark" style={{ fontSize: 11 }}>
                    {r.rating}
                  </span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700 }}>
                    {r.score.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
