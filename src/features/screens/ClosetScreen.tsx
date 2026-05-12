import { CLOSET_CATEGORIES, RARITY } from "@/lib/data";
import { useState } from "react";

interface ClosetItem {
  id: string;
  emoji: string;
  bg: string;
  rarity: keyof typeof RARITY;
  locked?: boolean;
}

const CLOSET_ITEMS: ClosetItem[] = [
  { id: "d1", emoji: "👗", bg: "#ffd1e3", rarity: "legendary" },
  { id: "d2", emoji: "👘", bg: "#cef4ff", rarity: "rare" },
  { id: "d3", emoji: "🥻", bg: "#fff4c4", rarity: "epic" },
  { id: "d4", emoji: "🩱", bg: "#e7d0ff", rarity: "holo" },
  { id: "d5", emoji: "🩴", bg: "#b9f3d8", rarity: "common" },
  { id: "d6", emoji: "👙", bg: "#ff85b8", rarity: "rare" },
  { id: "h1", emoji: "💇", bg: "#ffe4f0", rarity: "common" },
  { id: "h2", emoji: "🪮", bg: "#ddf0ff", rarity: "rare" },
  { id: "h3", emoji: "👱", bg: "#fdf0d5", rarity: "epic" },
  { id: "t1", emoji: "👕", bg: "#e0f4ff", rarity: "common" },
  { id: "t2", emoji: "🥼", bg: "#fce4ff", rarity: "rare" },
  { id: "s1", emoji: "👠", bg: "#ffe9c8", rarity: "legendary", locked: true },
  { id: "s2", emoji: "👡", bg: "#dfffff", rarity: "holo", locked: true },
  { id: "s3", emoji: "👢", bg: "#c8ffe8", rarity: "epic" },
  { id: "a1", emoji: "💍", bg: "#f5e0ff", rarity: "legendary" },
  { id: "a2", emoji: "📿", bg: "#ffd6e0", rarity: "rare" },
  { id: "a3", emoji: "💎", bg: "#d6f0ff", rarity: "holo", locked: true },
  { id: "m1", emoji: "💄", bg: "#ffe0e0", rarity: "common" },
  { id: "m2", emoji: "💋", bg: "#ffd9f5", rarity: "epic" },
  { id: "b1", emoji: "👛", bg: "#e8ffd6", rarity: "common" },
  { id: "b2", emoji: "👜", bg: "#ffd6d6", rarity: "rare" },
  { id: "b3", emoji: "🧳", bg: "#d6e8ff", rarity: "epic", locked: true },
];

export function ClosetScreen() {
  const [cat, setCat] = useState("dress");

  const catMap: Record<string, string[]> = {
    hair: ["h1", "h2", "h3"],
    top: ["t1", "t2"],
    bottom: ["d1", "d2", "d3"],
    dress: ["d4", "d5", "d6", "d1", "d2", "d3"],
    shoes: ["s1", "s2", "s3"],
    acc: ["a1", "a2", "a3"],
    makeup: ["m1", "m2"],
    bag: ["b1", "b2", "b3"],
  };

  const visibleIds = catMap[cat] ?? Object.keys(catMap).flatMap((k) => catMap[k] ?? []);
  const visibleItems = CLOSET_ITEMS.filter((it) => visibleIds.includes(it.id));

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
          <span className="chip">142 ítems</span>
          <span className="chip chip-pink">3 Holo ✦</span>
          <button className="btn btn-pink" type="button">
            + Outfit
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {CLOSET_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip${cat === c.id ? " chip-dark" : ""}`}
            onClick={() => setCat(c.id)}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 10,
        }}
      >
        {visibleItems.map((it) => {
          const rar = RARITY[it.rarity];
          return (
            <div
              key={it.id}
              style={{
                background: it.bg,
                aspectRatio: "1",
                borderRadius: 14,
                display: "grid",
                placeItems: "center",
                fontSize: 36,
                position: "relative",
                opacity: it.locked ? 0.5 : 1,
                cursor: it.locked ? "not-allowed" : "pointer",
                border: "1.5px solid transparent",
              }}
            >
              {it.emoji}
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  fontSize: 10,
                  fontWeight: 800,
                  color: rar?.color ?? "#9ca3af",
                }}
              >
                {rar?.label ?? "C"}
              </span>
              {it.locked && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 4,
                    fontSize: 14,
                  }}
                >
                  🔒
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
