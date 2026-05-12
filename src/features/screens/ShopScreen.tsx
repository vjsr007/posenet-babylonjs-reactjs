import { RARITY } from "@/lib/data";

interface FeaturedItem {
  name: string;
  price: number;
  kind: "coin" | "gem";
  rarity: keyof typeof RARITY;
  emoji: string;
  bg: string;
}

interface ShopItem {
  name: string;
  price: number;
  rarity: keyof typeof RARITY;
  emoji: string;
  bg: string;
  kind: "coin";
}

const FEATURED: FeaturedItem[] = [
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

const MORE_NAMES = [
  "Glitter Boots",
  "Silk Gown",
  "Pearl Choker",
  "Heart Bag",
  "Lace Veil",
  "Sun Shades",
  "Plaid Skirt",
  "Velvet Cape",
];
const MORE_PRICES = [220, 640, 180, 310, 540, 150, 290, 420];
const MORE_RARITIES: (keyof typeof RARITY)[] = [
  "rare",
  "legendary",
  "rare",
  "epic",
  "epic",
  "common",
  "rare",
  "legendary",
];
const MORE_EMOJIS = ["👢", "👗", "📿", "👛", "🤍", "🕶️", "🩱", "🧥"];
const MORE_BG = [
  "#ffd1e3",
  "#cef4ff",
  "#fff4c4",
  "#e7d0ff",
  "#b9f3d8",
  "#fff6e3",
  "#ff85b8",
  "#c8a8ff",
];

const MORE_ITEMS: ShopItem[] = MORE_NAMES.map((name, i) => ({
  name,
  price: MORE_PRICES[i] ?? 100,
  rarity: MORE_RARITIES[i] ?? "common",
  emoji: MORE_EMOJIS[i] ?? "✦",
  bg: MORE_BG[i] ?? "#ffd1e3",
  kind: "coin",
}));

export function ShopScreen() {
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
          <button className="btn btn-pink" type="button">
            + Gemas
          </button>
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
        {FEATURED.map((it) => (
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
              <div className="eyebrow" style={{ color: RARITY[it.rarity]?.color }}>
                ★ {it.rarity}
              </div>
              <div
                className="serif"
                style={{ fontSize: 22, fontStyle: "italic", margin: "4px 0 10px" }}
              >
                {it.name}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className={it.kind}>{it.price.toLocaleString()}</span>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ padding: "8px 14px", fontSize: 13 }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <h2 className="serif" style={{ fontSize: 28, margin: 0, fontStyle: "italic" }}>
          Más drops
        </h2>
        <div className="eyebrow">Rotación · 24h</div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {MORE_ITEMS.map((it) => (
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
              <div className="eyebrow" style={{ color: RARITY[it.rarity]?.color, fontSize: 10 }}>
                {it.rarity}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, margin: "4px 0 8px" }}>{it.name}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="coin" style={{ fontSize: 12 }}>
                  {it.price}
                </span>
                <button
                  className="btn btn-ghost"
                  type="button"
                  style={{ padding: "6px 12px", fontSize: 11 }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
