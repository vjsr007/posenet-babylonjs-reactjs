export interface ClosetCategory {
  id: string;
  name: string;
  emoji: string;
}

export const CLOSET_CATEGORIES: ClosetCategory[] = [
  { id: "hair", name: "Cabello", emoji: "💇" },
  { id: "top", name: "Top", emoji: "👕" },
  { id: "bottom", name: "Pantalón", emoji: "👖" },
  { id: "dress", name: "Vestido", emoji: "👗" },
  { id: "shoes", name: "Zapatos", emoji: "👠" },
  { id: "acc", name: "Accesorios", emoji: "💍" },
  { id: "makeup", name: "Maquillaje", emoji: "💄" },
  { id: "bag", name: "Bolsa", emoji: "👜" },
];

export const RARITY: Record<string, { label: string; color: string }> = {
  common: { label: "C", color: "#9ca3af" },
  rare: { label: "R", color: "#3b82f6" },
  epic: { label: "E", color: "#a855f7" },
  legendary: { label: "L", color: "#f59e0b" },
  holo: { label: "★", color: "#ec4899" },
};

export interface FriendEntry {
  name: string;
  initial: string;
  online: boolean;
  theme: string;
  score: string;
  time: string;
  emoji: string;
}

export const FRIENDS: FriendEntry[] = [
  {
    name: "Mia",
    initial: "M",
    online: true,
    theme: "Royal Affair",
    score: "S+ · 9,840",
    time: "hace 12m",
    emoji: "👑",
  },
  {
    name: "Luna",
    initial: "L",
    online: true,
    theme: "Cyberpunk Glitch",
    score: "S · 9,210",
    time: "hace 1h",
    emoji: "🤖",
  },
  {
    name: "Iris",
    initial: "I",
    online: false,
    theme: "Beach Daze",
    score: "A+ · 8,640",
    time: "hace 3h",
    emoji: "🌊",
  },
  {
    name: "Vega",
    initial: "V",
    online: true,
    theme: "Y2K Frost",
    score: "A · 8,120",
    time: "hace 5h",
    emoji: "💿",
  },
];

export interface RankEntry {
  rank: number;
  name: string;
  score: number;
  rating: string;
  you: boolean;
  c: string;
}

export const RANKINGS: RankEntry[] = [
  { rank: 1, name: "Mia", score: 9840, rating: "S+", you: false, c: "#ff3aa1" },
  { rank: 2, name: "YOU", score: 9620, rating: "S", you: true, c: "#ec4899" },
  { rank: 3, name: "Luna", score: 9210, rating: "S", you: false, c: "#a855f7" },
  { rank: 4, name: "Iris", score: 8640, rating: "A+", you: false, c: "#3b82f6" },
  { rank: 5, name: "Vega", score: 8120, rating: "A", you: false, c: "#06b6d4" },
  { rank: 6, name: "Coco", score: 7980, rating: "A", you: false, c: "#10b981" },
];

export interface Achievement {
  name: string;
  desc: string;
  icon: string;
  got: boolean;
  progress?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    name: "First Strut",
    desc: "Completa tu primera pasarela",
    icon: "👠",
    got: true,
  },
  {
    name: "Holographic",
    desc: "Consigue un ítem Holo",
    icon: "✦",
    got: true,
  },
  {
    name: "Streak 7",
    desc: "7 días seguidos jugando",
    icon: "🔥",
    got: true,
  },
  {
    name: "Top of the Catwalk",
    desc: "Llega al #1 global",
    icon: "👑",
    got: false,
    progress: 0.6,
  },
  {
    name: "Closet Royalty",
    desc: "Desbloquea 50 ítems",
    icon: "💎",
    got: false,
    progress: 0.42,
  },
  {
    name: "Camera Ready",
    desc: "Obtén puntuación perfecta",
    icon: "📸",
    got: false,
    progress: 0.78,
  },
];
