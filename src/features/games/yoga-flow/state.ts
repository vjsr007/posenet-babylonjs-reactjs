import { create } from "zustand";

export type YogaPhase = "menu" | "calibration" | "round" | "result";

interface YogaState {
  phase: YogaPhase;
  asanaIndex: number;
  totalAsanas: number;
  /** Tiempo (ms) acumulado por asana, en orden. */
  heldMsByAsana: number[];
  setPhase: (p: YogaPhase) => void;
  start: () => void;
  recordHold: (heldMs: number) => void;
  reset: () => void;
}

export const TOTAL_ASANAS = 4;

export const useYogaStore = create<YogaState>((set, get) => ({
  phase: "menu",
  asanaIndex: 0,
  totalAsanas: TOTAL_ASANAS,
  heldMsByAsana: [],
  setPhase: (phase) => set({ phase }),
  start: () => set({ phase: "calibration", asanaIndex: 0, heldMsByAsana: [] }),
  recordHold: (heldMs) => {
    const { asanaIndex, totalAsanas, heldMsByAsana } = get();
    const next = [...heldMsByAsana, heldMs];
    if (asanaIndex + 1 >= totalAsanas) {
      set({ heldMsByAsana: next, phase: "result" });
    } else {
      set({ heldMsByAsana: next, asanaIndex: asanaIndex + 1 });
    }
  },
  reset: () => set({ phase: "menu", asanaIndex: 0, heldMsByAsana: [] }),
}));
