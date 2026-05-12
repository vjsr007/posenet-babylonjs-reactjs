import { Icon } from "@/components/Icon";

interface Tier {
  lvl: number;
  got: boolean;
  isHolo: boolean;
  emoji: string;
  premium: string;
}

const FREE_EMOJIS = ["👑", "💄", "👠", "💍", "👗", "👜", "🕶️", "🌹", "🎀", "💖"];
const PREMIUM_EMOJIS = ["👑", "🦋", "💿", "🪞", "🩰", "💎"];

const TIERS: Tier[] = Array.from({ length: 50 }).map((_, i) => ({
  lvl: i + 1,
  got: i < 22,
  isHolo: (i + 1) % 10 === 0,
  emoji: (i + 1) % 10 === 0 ? "✦" : (FREE_EMOJIS[i % 10] ?? "⭐"),
  premium: PREMIUM_EMOJIS[i % 6] ?? "💖",
}));

export function BattlePassScreen() {
  return (
    <div className="shell-pad">
      <div
        className="hero"
        style={{
          background: "linear-gradient(135deg, var(--pink-soft), var(--holo-4))",
          padding: "30px 32px",
          marginBottom: 22,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
              Pase Glam · Season 3
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
              Cherry <em>Holo</em>
            </h1>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <span className="chip chip-pink">
                <Icon name="timer" size={12} /> 18 días
              </span>
              <span className="chip">Lv 22 / 50</span>
              <span className="chip chip-holo">Premium</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <button className="btn btn-pink" type="button" style={{ padding: "14px 22px" }}>
              Upgrade · 480 gemas
            </button>
            <div
              style={{
                fontSize: 12,
                color: "var(--ink-3)",
                marginTop: 6,
              }}
            >
              + 28 ítems exclusivos
            </div>
          </div>
        </div>
        <div className="bp-progress" style={{ marginTop: 18 }}>
          <span style={{ width: "44%" }} />
        </div>
      </div>
      <div style={{ overflowX: "auto" }} className="no-scrollbar">
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto auto",
            gridAutoFlow: "column",
            gridAutoColumns: "100px",
            gap: 10,
            padding: "10px 2px",
          }}
        >
          {TIERS.map((t) => (
            <TierColumn key={t.lvl} tier={t} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 14,
          fontSize: 11,
          color: "var(--ink-3)",
        }}
      >
        <span className="eyebrow">↑ Gratis</span>
        <span className="eyebrow">↓ Premium</span>
      </div>
    </div>
  );
}

function TierColumn({ tier: t }: { tier: Tier }) {
  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        <div
          className="card"
          style={{
            width: 90,
            aspectRatio: "1",
            padding: 0,
            display: "grid",
            placeItems: "center",
            background: t.got ? "var(--card)" : "var(--bg-2)",
            borderColor: t.got ? "var(--pink)" : "var(--line)",
            fontSize: 36,
            position: "relative",
            opacity: t.got ? 1 : 0.55,
          }}
        >
          {t.emoji}
          {t.got && <Icon name="check" size={12} />}
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 22,
          color: t.lvl === 22 ? "var(--pink-deep)" : "var(--ink-2)",
          fontWeight: 700,
        }}
      >
        {t.lvl}
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <div
          className={`card${t.isHolo ? " holo" : ""}`}
          style={{
            width: 90,
            aspectRatio: "1",
            padding: 0,
            display: "grid",
            placeItems: "center",
            background: t.isHolo
              ? ""
              : t.got
                ? "linear-gradient(135deg, var(--holo-1), var(--holo-2))"
                : "var(--bg-2)",
            borderColor: t.got ? "var(--pink)" : "var(--line)",
            fontSize: 36,
            opacity: t.got ? 1 : 0.4,
          }}
        >
          {t.premium}
        </div>
      </div>
    </>
  );
}
