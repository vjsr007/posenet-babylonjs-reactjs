import { create } from "zustand";

export type StaticPhase = "menu" | "calibration" | "playing" | "result";

interface StatueState {
  phase: StaticPhase;
  lives: number;
  survivedMs: number;
  setPhase: (p: StaticPhase) => void;
  start: () => void;
  loseLife: () => void;
  finish: (survivedMs: number) => void;
  reset: () => void;
}

export const INITIAL_LIVES = 3;

export const useStatueStore = create<StatueState>((set, get) => ({
  phase: "menu",
  lives: INITIAL_LIVES,
  survivedMs: 0,
  setPhase: (phase) => set({ phase }),
  start: () => set({ phase: "calibration", lives: INITIAL_LIVES, survivedMs: 0 }),
  loseLife: () => {
    const lives = get().lives - 1;
    set({ lives });
  },
  finish: (survivedMs) => set({ phase: "result", survivedMs }),
  reset: () => set({ phase: "menu", lives: INITIAL_LIVES, survivedMs: 0 }),
}));
