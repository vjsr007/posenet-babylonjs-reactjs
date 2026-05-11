/**
 * Tipos compartidos del dominio de pose.
 */

export const KEYPOINT_NAMES = [
  "nose",
  "left_eye",
  "right_eye",
  "left_ear",
  "right_ear",
  "left_shoulder",
  "right_shoulder",
  "left_elbow",
  "right_elbow",
  "left_wrist",
  "right_wrist",
  "left_hip",
  "right_hip",
  "left_knee",
  "right_knee",
  "left_ankle",
  "right_ankle",
] as const;

export type KeypointName = (typeof KEYPOINT_NAMES)[number];

export interface Keypoint {
  name: KeypointName;
  x: number;
  y: number;
  score: number;
}

export interface Pose {
  keypoints: Keypoint[];
  ts: number;
  fps: number;
}

export interface CalibrationData {
  shoulderDist: number;
  height: number;
  midpoint: { x: number; y: number };
}

export interface NormalizedPose {
  /** keypoints en espacio centrado (origen = midpoint hombros) y escalados a shoulderDist=1. */
  keypoints: Keypoint[];
}
