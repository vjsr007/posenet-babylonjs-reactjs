import { Icon } from "@/components/Icon";
import { ACHIEVEMENTS } from "@/lib/data";

interface ProfileScreenProps {
  coins: number;
  gems: number;
  level: number;
}

const REPLAY_GRADIENTS = [
  "linear-gradient(135deg, var(--pink), var(--lilac))",
  "linear-gradient(135deg, var(--holo-1), var(--holo-2))",
  "linear-gradient(135deg, var(--mint), var(--cream))",
  "linear-gradient(135deg, var(--lilac), var(--pink-2))",
  "linear-gradient(135deg, var(--cream), var(--holo-3))",
  "linear-gradient(135deg, var(--pink-soft), var(--holo-4))",
];

const STATS = [
  { l: "Mejor score", v: "9,620" },
  { l: "Promedio", v: "S · 91%" },
  { l: "Pasarelas", v: "142" },
  { l: "Top 3 daily", v: "23×" },
  { l: "Tema favorito", v: "Royal" },
  { l: "Pose favorita", v: "Vogue" },
];

export function ProfileScreen({ coins, gems, level }: ProfileScreenProps) {
  return (
    <div className="shell-pad">
      <div
        className="hero"
        style={{
          background: "linear-gradient(135deg, var(--holo-2), var(--pink-soft), var(--holo-3))",
          padding: "30px 32px",
          marginBottom: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            className="avatar-bubble online"
            style={{
              width: 110,
              height: 110,
              fontSize: 48,
              border: "4px solid white",
            }}
          >
            Y
          </div>
          <div style={{ flex: 1 }}>
            <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
              Modelo · #2 global
            </div>
            <h1
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 56,
                margin: "4px 0",
                lineHeight: 0.9,
              }}
            >
              You
              <em style={{ color: "var(--pink-deep)" }}>.</em>
            </h1>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <span className="chip chip-dark">Lv {level}</span>
              <span className="chip chip-pink">
                <Icon name="fire" size={12} /> Racha 7
              </span>
              <span className="chip">142 pasarelas</span>
              <span className="chip">3 Holo ✦</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div className="card" style={{ padding: 14, minWidth: 100, textAlign: "center" }}>
              <div className="eyebrow">Coins</div>
              <div className="serif" style={{ fontSize: 26, fontStyle: "italic", marginTop: 4 }}>
                {coins.toLocaleString()}
              </div>
            </div>
            <div className="card holo" style={{ padding: 14, minWidth: 100, textAlign: "center" }}>
              <div className="eyebrow">Gemas</div>
              <div className="serif" style={{ fontSize: 26, fontStyle: "italic", marginTop: 4 }}>
                {gems}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22 }}>
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
              Trofeos
            </h2>
            <div className="eyebrow">
              {ACHIEVEMENTS.filter((a) => a.got).length} de {ACHIEVEMENTS.length}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
            }}
          >
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.name}
                className="card-soft"
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  opacity: a.got ? 1 : 0.7,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 24,
                    background: a.got ? "var(--pink-soft)" : "var(--bg-2)",
                  }}
                >
                  {a.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>
                    {a.name}
                    {a.got && <Icon name="check" size={12} />}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{a.desc}</div>
                  {!a.got && a.progress != null && (
                    <div
                      style={{
                        height: 4,
                        background: "var(--bg)",
                        borderRadius: 2,
                        marginTop: 6,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${a.progress * 100}%`,
                          background: "var(--pink)",
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <h2
              className="serif"
              style={{
                fontSize: 22,
                margin: "0 0 14px",
                fontStyle: "italic",
              }}
            >
              Stats
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {STATS.map((s) => (
                <div key={s.l} className="card-soft" style={{ padding: 14 }}>
                  <div className="eyebrow">{s.l}</div>
                  <div
                    className="serif"
                    style={{ fontSize: 22, fontStyle: "italic", marginTop: 4 }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                Replays
              </h2>
              <div className="eyebrow">Clips de 12s</div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "9/16",
                    borderRadius: 10,
                    background: REPLAY_GRADIENTS[i - 1] ?? REPLAY_GRADIENTS[0],
                    position: "relative",
                    display: "grid",
                    placeItems: "center",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <Icon name="play" size={28} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 6,
                      left: 6,
                      fontSize: 9,
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    0:12
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
