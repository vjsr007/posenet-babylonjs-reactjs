import { create } from "zustand";

export type RouteId =
  | "home"
  | "play"
  | "closet"
  | "shop"
  | "pass"
  | "friends"
  | "profile"
  | "settings";

export type GameId = "pose-match" | "statue" | "yoga" | "shadow" | "squat";

interface LobbyState {
  route: RouteId;
  gameOpen: GameId | null;
  dtiOpen: boolean;
  toast: string | null;
  setRoute: (r: RouteId) => void;
  openGame: (id: GameId) => void;
  closeGame: () => void;
  openDTI: () => void;
  closeDTI: () => void;
  showToast: (msg: string) => void;
  /** @deprecated — alias for closeGame, kept for existing game components */
  exit: () => void;
}

export const useLobbyStore = create<LobbyState>((set, get) => ({
  route: "home",
  gameOpen: null,
  dtiOpen: false,
  toast: null,

  setRoute: (r) => set({ route: r }),
  openGame: (id) => set({ gameOpen: id }),
  closeGame: () => set({ gameOpen: null }),
  openDTI: () => set({ dtiOpen: true }),
  closeDTI: () => set({ dtiOpen: false }),

  showToast: (msg) => {
    set({ toast: msg });
    setTimeout(() => {
      if (get().toast === msg) set({ toast: null });
    }, 1800);
  },

  // Backward-compat alias used by StatueGame, YogaFlowGame, PoseMatchGame
  exit: () => set({ gameOpen: null }),
}));

export interface GameMeta {
  id: GameId;
  name: string;
  tag: string;
  variant: "holo" | "poster" | "magazine" | "minimal";
  ready: boolean;
  players: string;
}

export const GAME_CATALOG: GameMeta[] = [
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
    ready: true,
    players: "320K",
  },
  {
    id: "shadow",
    name: "Shadow Boxer",
    tag: "Golpea los guantes",
    variant: "poster",
    ready: true,
    players: "—",
  },
  {
    id: "squat",
    name: "Squat Survivor",
    tag: "Vampire Survivors + cardio",
    variant: "magazine",
    ready: true,
    players: "—",
  },
];
