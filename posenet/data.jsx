/* global React */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ============================================
// DATA
// ============================================

const THEMES = [
  {
    id: "y2k",
    name: "Y2K",
    emoji: "💿",
    colors: ["#ff85b8", "#cef4ff", "#fff4c4"],
    tag: "frosted, low-rise, butterflies",
  },
  {
    id: "royal",
    name: "Royal",
    emoji: "👑",
    colors: ["#d9a85a", "#fff6e3", "#8a1554"],
    tag: "tiaras, ballgowns, velvet",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    emoji: "🤖",
    colors: ["#ff3aa1", "#6bf0ff", "#1a0c2a"],
    tag: "neon, mesh, chrome",
  },
  {
    id: "wedding",
    name: "Boda",
    emoji: "💍",
    colors: ["#fff", "#ffd1e3", "#f5cadd"],
    tag: "white, lace, veil",
  },
  {
    id: "beach",
    name: "Beach",
    emoji: "🌊",
    colors: ["#ffd86b", "#71f5c5", "#cef4ff"],
    tag: "sun, salt, linen",
  },
  {
    id: "halloween",
    name: "Halloween",
    emoji: "🎃",
    colors: ["#ff7a1f", "#1a0c2a", "#b48bff"],
    tag: "spooky, glam, witchy",
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    emoji: "🌿",
    colors: ["#b9f3d8", "#fff6e3", "#d9a85a"],
    tag: "linen, floral, soft",
  },
  {
    id: "street",
    name: "Streetwear",
    emoji: "🛹",
    colors: ["#1a0d14", "#ff3aa1", "#fff"],
    tag: "oversized, baggy, graphic",
  },
];

const CLOSET_CATEGORIES = [
  { id: "hair", name: "Hair", emoji: "💇" },
  { id: "top", name: "Top", emoji: "👚" },
  { id: "bottom", name: "Bottom", emoji: "👖" },
  { id: "dress", name: "Dress", emoji: "👗" },
  { id: "shoes", name: "Shoes", emoji: "👠" },
  { id: "acc", name: "Accs", emoji: "💍" },
  { id: "makeup", name: "Makeup", emoji: "💄" },
  { id: "bag", name: "Bag", emoji: "👜" },
];

const RARITY = {
  common: { label: "C", color: "#9ca3af" },
  rare: { label: "R", color: "#3b82f6" },
  epic: { label: "E", color: "#a855f7" },
  legendary: { label: "L", color: "#f59e0b" },
  holo: { label: "★", color: "#ec4899" },
};

// Generate closet items per category
function genCloset() {
  const items = {};
  CLOSET_CATEGORIES.forEach((cat) => {
    items[cat.id] = Array.from({ length: 18 }).map((_, i) => {
      const rarities = ["common", "common", "common", "rare", "rare", "epic", "legendary", "holo"];
      const r = rarities[i % rarities.length];
      return {
        id: `${cat.id}-${i}`,
        cat: cat.id,
        name: `${cat.name} ${String.fromCharCode(65 + (i % 26))}${i}`,
        emoji: cat.emoji,
        rarity: r,
        locked: i > 11,
        bg: [
          "#ffd1e3",
          "#cef4ff",
          "#fff4c4",
          "#e7d0ff",
          "#b9f3d8",
          "#fff6e3",
          "#ffd86b",
          "#ff85b8",
          "#c8a8ff",
        ][i % 9],
      };
    });
  });
  return items;
}

const CLOSET = genCloset();

const POSES = [
  { id: "runway", name: "Pasarela", icon: "🚶‍♀️" },
  { id: "vogue", name: "Vogue", icon: "📸" },
  { id: "hips", name: "Manos en cintura", icon: "💁" },
  { id: "kiss", name: "Beso volado", icon: "💋" },
  { id: "twirl", name: "Twirl", icon: "💃" },
  { id: "lean", name: "Sassy lean", icon: "🙆" },
];

const FRIENDS = [
  { name: "Mia", initial: "M", online: true, last: "got a Holo crown ✦", rating: 4.9 },
  { name: "Luna", initial: "L", online: true, last: "S-tier Royal fit", rating: 4.7 },
  { name: "Iris", initial: "I", online: false, last: "won Cyberpunk daily", rating: 4.8 },
  { name: "Vega", initial: "V", online: true, last: "leveled up to 24", rating: 4.5 },
  { name: "Coco", initial: "C", online: false, last: "1st in Beach 🌊", rating: 4.6 },
];

const GAMES = [
  {
    id: "dti",
    name: "Dress to Impress",
    tag: "Tema · Closet · Pasarela",
    variant: "holo",
    new: false,
    ready: true,
    players: "1.2M",
  },
  {
    id: "pose-match",
    name: "Pose Match",
    tag: "Imita la silueta en 3s",
    variant: "poster",
    ready: true,
    players: "840K",
  },
  {
    id: "statue",
    name: "Statue Game",
    tag: "Música on → muévete",
    variant: "magazine",
    ready: true,
    players: "612K",
  },
  {
    id: "yoga",
    name: "Yoga Flow",
    tag: "Mantén la asana",
    variant: "minimal",
    ready: false,
    players: "320K",
  },
  {
    id: "shadow",
    name: "Shadow Boxer",
    tag: "Golpea los guantes",
    variant: "poster",
    ready: false,
    players: "—",
  },
  {
    id: "squat",
    name: "Squat Survivor",
    tag: "Vampire Survivors + cardio",
    variant: "magazine",
    ready: false,
    players: "—",
  },
];

const RANKINGS = [
  { rank: 1, name: "Mia", score: 9840, rating: "S+", you: false, c: "#ff3aa1" },
  { rank: 2, name: "YOU", score: 9620, rating: "S", you: true, c: "#1a0d14" },
  { rank: 3, name: "Luna", score: 9410, rating: "S", you: false, c: "#c8a8ff" },
  { rank: 4, name: "Iris", score: 8820, rating: "A", you: false, c: "#71f5c5" },
  { rank: 5, name: "Vega", score: 8460, rating: "A", you: false, c: "#ffd86b" },
  { rank: 6, name: "Coco", score: 7990, rating: "B+", you: false, c: "#b48bff" },
];

const ACHIEVEMENTS = [
  { name: "First Strut", desc: "Completa tu primera pasarela", icon: "🚶", got: true },
  { name: "Holographic", desc: "Equipa un ítem Holo", icon: "✦", got: true },
  { name: "Streak 7", desc: "Juega 7 días seguidos", icon: "🔥", got: true },
  { name: "Top of the Catwalk", desc: "Top 3 en daily", icon: "👑", got: false, progress: 0.6 },
  {
    name: "Closet Royalty",
    desc: "200 ítems en el closet",
    icon: "👗",
    got: false,
    progress: 0.42,
  },
  { name: "Camera Ready", desc: "100 poses perfectas", icon: "📸", got: false, progress: 0.78 },
];

// ============================================
// ICON GLYPHS (simple SVG)
// ============================================

const Icon = ({ name, size = 18 }) => {
  const paths = {
    home: <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" />,
    closet: <path d="M3 4h18v6H3zm0 8h18v8H3zm5-8v6m8-6v6" />,
    play: <path d="M5 4l14 8-14 8z" />,
    shop: (
      <path d="M3 7l1.5-3h15L21 7M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7h18M9 11a3 3 0 0 0 6 0" />
    ),
    pass: <path d="M4 5h16v14H4zm4 0v14m8-14v14M4 12h16" />,
    friends: (
      <path d="M16 11a4 4 0 1 0-4-4m0 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4m4-4a4 4 0 0 1-4 4m-7 6c0-3 2-5 5-5m6 0c3 0 5 2 5 5" />
    ),
    profile: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9c0-4 3-7 7-7s7 3 7 7" />,
    settings: (
      <path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm9 3a9 9 0 0 0-.2-2l2-1.5-2-3.5-2.4 1a9 9 0 0 0-3.4-2L14.5 1h-5L9 3a9 9 0 0 0-3.4 2L3.2 4l-2 3.5L3.2 9a9 9 0 0 0 0 6l-2 1.5 2 3.5 2.4-1a9 9 0 0 0 3.4 2L9 23h5l.6-2a9 9 0 0 0 3.4-2l2.4 1 2-3.5L20.8 15a9 9 0 0 0 .2-3z" />
    ),
    bell: <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9zm3 13a3 3 0 0 0 6 0" />,
    chevron: <path d="M9 6l6 6-6 6" />,
    back: <path d="M15 6l-6 6 6 6" />,
    star: <path d="M12 3l3 6 6 1-4.5 4 1 6.5L12 17l-5.5 3.5L7.5 14 3 10l6-1z" />,
    heart: <path d="M12 21s-7-4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 5-9 9-9 9z" />,
    camera: <path d="M3 7h4l2-3h6l2 3h4v13H3zm9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
    pose: (
      <path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8 9l4 1 4-1m-4 1v6m-3-4l3 2 3-2m-6 9l3-5m6 5l-3-5" />
    ),
    sparkle: (
      <path d="M12 2l1.5 6 6 1.5-6 1.5L12 17l-1.5-6-6-1.5 6-1.5zM19 14l.7 2.3 2.3.7-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z" />
    ),
    crown: <path d="M3 18h18l-2-10-4 4-4-7-4 7-4-4z" />,
    coin: (
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v10m-3-7h5a1.5 1.5 0 1 1 0 3h-4a1.5 1.5 0 1 0 0 3h5" />
    ),
    gem: <path d="M6 9l6-6 6 6-6 12zm0 0h12M9 9l3 12 3-12" />,
    check: <path d="M5 12l5 5 9-11" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    fire: <path d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-3 2-4 2-7 2 1 3 0 3-3z" />,
    trophy: (
      <path d="M8 4h8v4a4 4 0 0 1-8 0zM5 5H2v3a3 3 0 0 0 3 3m14-6h3v3a3 3 0 0 1-3 3m-9 1v4m-3 4h6" />
    ),
    timer: <path d="M12 7v5l3 2m-3 7a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM9 2h6" />,
    music: (
      <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm12-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />
    ),
    eye: (
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7zm11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] || null}
    </svg>
  );
};

// ============================================
// SHARED COMPONENTS
// ============================================

const Sidebar = ({ route, setRoute, coins, gems, level }) => {
  const items = [
    { id: "home", label: "Home", icon: "home" },
    { id: "play", label: "Jugar", icon: "play" },
    { id: "closet", label: "Closet", icon: "closet" },
    { id: "shop", label: "Tienda", icon: "shop" },
    { id: "pass", label: "Pase Glam", icon: "pass" },
    { id: "friends", label: "Amigxs", icon: "friends" },
    { id: "profile", label: "Perfil", icon: "profile" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Pose
        <br />
        Arena
        <small>Dress to Impress · v1</small>
      </div>
      {items.map((it) => (
        <button
          key={it.id}
          className={`nav-item ${route === it.id ? "active" : ""}`}
          onClick={() => setRoute(it.id)}
        >
          <span className="glyph">
            <Icon name={it.icon} size={18} />
          </span>
          {it.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <div
        className="card-soft"
        style={{ padding: 14, marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="avatar-bubble online">Y</div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                textTransform: "uppercase",
                letterSpacing: ".12em",
                fontWeight: 700,
              }}
            >
              Lv {level}
            </div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>YOU</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
          <span className="coin">{coins.toLocaleString()}</span>
          <span className="gem">{gems}</span>
        </div>
      </div>
      <button className="nav-item" onClick={() => setRoute("settings")}>
        <span className="glyph">
          <Icon name="settings" />
        </span>
        Ajustes
      </button>
    </aside>
  );
};

// Pose-stick figure (target silhouette)
const PoseFigure = ({ pose, color = "var(--pink-deep)", size = 220 }) => {
  // Predefined stick figures, simplified
  const figs = {
    runway:
      "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L36 86 M50 58 L64 86 M30 30 L24 50 M70 30 L76 50",
    vogue:
      "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L40 86 M50 58 L60 86 M30 30 L18 22 L24 12 M70 30 L88 36",
    hips: "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L40 86 M50 58 L60 86 M30 30 L16 38 L26 50 M70 30 L84 38 L74 50",
    kiss: "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L40 86 M50 58 L60 86 M30 30 L18 38 L26 50 M70 30 L80 16 L72 6",
    twirl:
      "M50 12 L50 22 M28 30 L50 22 L72 30 M50 22 L50 58 M50 58 L36 86 M50 58 L66 80 M28 30 L12 22 M72 30 L92 22",
    lean: "M52 12 L54 22 M34 30 L54 22 L74 32 M54 22 L48 58 M48 58 L36 86 M48 58 L60 84 M34 30 L26 50 L36 56 M74 32 L82 50 L72 58",
  };
  const d = figs[pose] || figs.runway;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size * 1.6} className="pose-silhouette">
      <circle cx="50" cy="12" r="8" fill={color} opacity="0.18" stroke={color} strokeWidth="2" />
      <path
        d={d}
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Webcam tile (mock)
const WebcamTile = ({ show = true, label = "TÚ · LIVE" }) => {
  if (!show) return null;
  return (
    <div className="webcam-tile">
      <span className="rec-dot" />
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: ".18em",
        }}
      >
        {label}
      </div>
      <PoseFigure pose="runway" color="rgba(255,255,255,0.65)" size={120} />
    </div>
  );
};

// Stars row
const Stars = ({ count = 5, of = 5 }) => (
  <span className="stars">
    {Array.from({ length: of }).map((_, i) => (
      <span key={i} className={i < count ? "" : "off"}>
        <Icon name="star" size={14} />
      </span>
    ))}
  </span>
);

window.PA_DATA = {
  THEMES,
  CLOSET_CATEGORIES,
  CLOSET,
  RARITY,
  POSES,
  FRIENDS,
  GAMES,
  RANKINGS,
  ACHIEVEMENTS,
};
window.PA_UI = { Icon, Sidebar, PoseFigure, WebcamTile, Stars };
