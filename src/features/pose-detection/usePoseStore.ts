import type { CalibrationData, Pose } from "@/types/pose";
import { create } from "zustand";

interface PoseState {
  pose: Pose | null;
  calibration: CalibrationData | null;
  fps: number;
  ready: boolean;
  error: string | null;
  setPose: (pose: Pose) => void;
  setCalibration: (c: CalibrationData) => void;
  setReady: (ready: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const usePoseStore = create<PoseState>((set) => ({
  pose: null,
  calibration: null,
  fps: 0,
  ready: false,
  error: null,
  setPose: (pose) => set({ pose, fps: pose.fps }),
  setCalibration: (calibration) => set({ calibration }),
  setReady: (ready) => set({ ready }),
  setError: (error) => set({ error }),
  reset: () => set({ pose: null, calibration: null, fps: 0, error: null }),
}));
