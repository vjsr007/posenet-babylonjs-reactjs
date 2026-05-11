import { create } from "zustand";

export type GameId = "pose-match" | "statue-game" | "yoga-flow";

interface LobbyState {
  current: GameId | null;
  open: (id: GameId) => void;
  exit: () => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
  current: null,
  open: (id) => set({ current: id }),
  exit: () => set({ current: null }),
}));

export interface GameMeta {
  id: GameId;
  name: string;
  tagline: string;
  status: "ready" | "beta";
}

export const GAMES: GameMeta[] = [
  {
    id: "pose-match",
    name: "Pose Match",
    tagline: "Imita la silueta antes de que se acabe el tiempo.",
    status: "ready",
  },
  {
    id: "statue-game",
    name: "Estatua",
    tagline: "Muévete cuando suena la música. Quédate quieto cuando para.",
    status: "beta",
  },
  {
    id: "yoga-flow",
    name: "Yoga Flow",
    tagline: "Sostén la asana el mayor tiempo posible.",
    status: "beta",
  },
];
