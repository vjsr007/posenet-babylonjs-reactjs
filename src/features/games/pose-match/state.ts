import { create } from "zustand";

export type GamePhase = "menu" | "calibration" | "countdown" | "round" | "result";

interface GameState {
  phase: GamePhase;
  round: number;
  totalRounds: number;
  score: number;
  setPhase: (phase: GamePhase) => void;
  start: () => void;
  nextRound: () => void;
  addScore: (points: number) => void;
  reset: () => void;
}

const TOTAL_ROUNDS = 5;

export const useGameStore = create<GameState>((set, get) => ({
  phase: "menu",
  round: 0,
  totalRounds: TOTAL_ROUNDS,
  score: 0,
  setPhase: (phase) => set({ phase }),
  start: () => set({ phase: "calibration", round: 0, score: 0 }),
  nextRound: () => {
    const { round, totalRounds } = get();
    if (round + 1 >= totalRounds) set({ phase: "result", round: round + 1 });
    else set({ round: round + 1, phase: "countdown" });
  },
  addScore: (points) => set({ score: get().score + points }),
  reset: () => set({ phase: "menu", round: 0, score: 0 }),
}));
