/* global React, PA_DATA, PA_UI */
const { useState, useEffect, useRef } = React;
const { THEMES, CLOSET_CATEGORIES, CLOSET, RARITY, POSES, FRIENDS, GAMES, RANKINGS, ACHIEVEMENTS } =
  PA_DATA;
const { Icon, PoseFigure, WebcamTile, Stars } = PA_UI;

// ============================================
// SHOP
// ============================================
const ShopScreen = () => {
  const featured = [
    {
      name: "Crystal Tiara",
      price: 1200,
      kind: "coin",
      rarity: "legendary",
      emoji: "👑",
      bg: "linear-gradient(135deg, #ffd86b, #fff6e3)",
    },
    {
      name: "Holo Wings",
      price: 80,
      kind: "gem",
      rarity: "holo",
      emoji: "🦋",
      bg: "linear-gradient(135deg, var(--holo-1), var(--holo-2))",
    },
    {
      name: "Y2K Capsule",
      price: 800,
      kind: "coin",
      rarity: "epic",
      emoji: "💿",
      bg: "linear-gradient(135deg, var(--pink-2), var(--lilac))",
    },
  ];
  const items = Array.from({ length: 8 }).map((_, i) => ({
    name: [
      "Glitter Boots",
      "Silk Gown",
      "Pearl Choker",
      "Heart Bag",
      "Lace Veil",
      "Sun Shades",
      "Plaid Skirt",
      "Velvet Cape",
    ][i],
    price: [220, 640, 180, 310, 540, 150, 290, 420][i],
    rarity: ["rare", "legendary", "rare", "epic", "epic", "common", "rare", "legendary"][i],
    emoji: ["👢", "👗", "📿", "👛", "🤍", "🕶️", "🩱", "🧥"][i],
    bg: ["#ffd1e3", "#cef4ff", "#fff4c4", "#e7d0ff", "#b9f3d8", "#fff6e3", "#ff85b8", "#c8a8ff"][i],
    kind: "coin",
  }));
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
          <div className="eyebrow">Esta semana</div>
          <h1 className="serif" style={{ fontSize: 56, fontStyle: "italic", margin: "6px 0" }}>
            Tienda
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="chip">
            <span className="coin">12,840</span>
          </span>
          <span className="chip">
            <span className="gem">94</span>
          </span>
          <button className="btn btn-pink">+ Gemas</button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
          marginBottom: 22,
        }}
      >
        {featured.map((it) => (
          <div key={it.name} className="card shine" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                height: 180,
                background: it.bg,
                display: "grid",
                placeItems: "center",
                fontSize: 72,
              }}
            >
              {it.emoji}
            </div>
            <div style={{ padding: 14 }}>
              <div className="eyebrow" style={{ color: RARITY[it.rarity].color }}>
                ★ {it.rarity}
              </div>
              <div
                className="serif"
                style={{ fontSize: 22, fontStyle: "italic", margin: "4px 0 10px" }}
              >
                {it.name}
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span className={it.kind}>{it.price.toLocaleString()}</span>
                <button className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 13 }}>
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SectionHeader title="Más drops" subtitle="Rotación · 24h" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {items.map((it) => (
          <div key={it.name} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                height: 120,
                background: it.bg,
                display: "grid",
                placeItems: "center",
                fontSize: 48,
              }}
            >
              {it.emoji}
            </div>
            <div style={{ padding: 12 }}>
              <div className="eyebrow" style={{ color: RARITY[it.rarity].color, fontSize: 10 }}>
                {it.rarity}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, margin: "4px 0 8px" }}>{it.name}</div>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span className="coin" style={{ fontSize: 12 }}>
                  {it.price}
                </span>
                <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
        {action}
      </button>
    )}
  </div>
);

// ============================================
// BATTLE PASS — Pase Glam
// ============================================
const BattlePassScreen = () => {
  const tiers = Array.from({ length: 50 }).map((_, i) => {
    const got = i < 22;
    const isHolo = (i + 1) % 10 === 0;
    return {
      lvl: i + 1,
      got,
      isHolo,
      emoji: isHolo ? "✦" : ["👑", "💄", "👠", "💍", "👗", "👜", "🕶️", "🌹", "🎀", "💖"][i % 10],
      premium: ["👑", "🦋", "💿", "🪞", "🩰", "💎"][i % 6],
    };
  });
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
            <button className="btn btn-pink" style={{ padding: "14px 22px" }}>
              Upgrade · 480 gemas
            </button>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>
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
          {tiers.map((t) => (
            <React.Fragment key={t.lvl}>
              <div style={{ display: "grid", placeItems: "center" }}>
                <div
                  className="card"
                  style={{
                    width: 90,
                    aspectRatio: 1,
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
                  className={`card ${t.isHolo ? "holo" : ""}`}
                  style={{
                    width: 90,
                    aspectRatio: 1,
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
            </React.Fragment>
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
};

// ============================================
// FRIENDS
// ============================================
const FriendsScreen = () => (
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
        <button className="btn btn-ghost">+ Invitar</button>
        <button className="btn btn-pink">Lobby privado</button>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
      <div className="card">
        <SectionHeader title="Feed" subtitle="Últimas pasarelas" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
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
            {
              n: "Vega",
              i: "V",
              on: true,
              t: "Y2K Frost",
              score: "A · 8,120",
              time: "hace 5h",
              emoji: "💿",
            },
          ].map((f) => (
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
              <div className={`avatar-bubble ${f.on ? "online" : ""}`}>{f.i}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong>{f.n}</strong>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
                  {f.emoji} {f.t} · {f.score}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{f.time}</div>
              </div>
              <button className="btn btn-ghost" style={{ padding: "8px 14px" }}>
                <Icon name="heart" size={14} />
              </button>
              <button className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 12 }}>
                Reto
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card">
          <SectionHeader title="Lobby privado" subtitle="4 invitadas · pasarela rotativa" />
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            {["Y", "M", "L", "I"].map((i, idx) => (
              <div
                key={i}
                className="avatar-bubble"
                style={{
                  width: 56,
                  height: 56,
                  fontSize: 22,
                  background: ["var(--pink)", "var(--lilac)", "var(--mint)", "var(--holo-2)"][idx],
                }}
              >
                {i}
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
            <button className="btn btn-pink" style={{ flex: 1 }}>
              Empezar pasarela
            </button>
            <button className="btn btn-ghost">Tema random</button>
          </div>
        </div>
        <div className="card">
          <SectionHeader title="Ranking · amigxs" />
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
                  style={{ background: r.c, width: 36, height: 36, fontSize: 14 }}
                >
                  {r.name[0]}
                </div>
                <div style={{ flex: 1, fontWeight: r.you ? 800 : 600, fontSize: 14 }}>
                  {r.name}
                  {r.you && (
                    <span
                      className="chip chip-pink"
                      style={{ marginLeft: 8, fontSize: 9, padding: "2px 6px" }}
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

// ============================================
// PROFILE
// ============================================
const ProfileScreen = ({ coins, gems, level }) => (
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
          style={{ width: 110, height: 110, fontSize: 48, border: "4px solid white" }}
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
            You<em style={{ color: "var(--pink-deep)" }}>.</em>
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
        <SectionHeader
          title="Trofeos"
          subtitle={`${ACHIEVEMENTS.filter((a) => a.got).length} de ${ACHIEVEMENTS.length}`}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.name}
              className="card-soft"
              style={{ display: "flex", gap: 12, alignItems: "center", opacity: a.got ? 1 : 0.7 }}
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
                    style={{ height: 4, background: "var(--bg)", borderRadius: 2, marginTop: 6 }}
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
          <SectionHeader title="Stats" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { l: "Mejor score", v: "9,620" },
              { l: "Promedio", v: "S · 91%" },
              { l: "Pasarelas", v: "142" },
              { l: "Top 3 daily", v: "23×" },
              { l: "Tema favorito", v: "Royal" },
              { l: "Pose favorita", v: "Vogue" },
            ].map((s) => (
              <div key={s.l} className="card-soft" style={{ padding: 14 }}>
                <div className="eyebrow">{s.l}</div>
                <div className="serif" style={{ fontSize: 22, fontStyle: "italic", marginTop: 4 }}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <SectionHeader title="Replays" subtitle="Exportables · clips de 12s" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "9/16",
                  borderRadius: 10,
                  background: [
                    "linear-gradient(135deg, var(--pink), var(--lilac))",
                    "linear-gradient(135deg, var(--holo-1), var(--holo-2))",
                    "linear-gradient(135deg, var(--mint), var(--cream))",
                    "linear-gradient(135deg, var(--lilac), var(--pink-2))",
                    "linear-gradient(135deg, var(--cream), var(--holo-3))",
                    "linear-gradient(135deg, var(--pink-soft), var(--holo-4))",
                  ][i - 1],
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

window.PA_SCREENS_2 = { ShopScreen, BattlePassScreen, FriendsScreen, ProfileScreen };
