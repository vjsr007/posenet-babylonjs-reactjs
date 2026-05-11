import type { NormalizedPose } from "@/types/pose";

export interface Asana {
  id: string;
  name: string;
  /** Tiempo (ms) que hay que mantener acumulado por encima del umbral. */
  holdMs: number;
  /** Pose objetivo normalizada. */
  pose: NormalizedPose;
}

const k = (
  name: NormalizedPose["keypoints"][number]["name"],
  x: number,
  y: number,
): NormalizedPose["keypoints"][number] => ({ name, x, y, score: 1 });

export const ASANAS: Asana[] = [
  {
    id: "mountain",
    name: "Montaña",
    holdMs: 5000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -0.5, 0.7),
        k("right_elbow", 0.5, 0.7),
        k("left_wrist", -0.5, 1.4),
        k("right_wrist", 0.5, 1.4),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
        k("left_knee", -0.3, 2.5),
        k("right_knee", 0.3, 2.5),
        k("left_ankle", -0.3, 3.5),
        k("right_ankle", 0.3, 3.5),
      ],
    },
  },
  {
    id: "warrior-2",
    name: "Guerrero II",
    holdMs: 6000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -1.2, 0),
        k("right_elbow", 1.2, 0),
        k("left_wrist", -1.9, 0),
        k("right_wrist", 1.9, 0),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
        k("left_knee", -1.0, 2.4),
        k("right_knee", 0.6, 2.5),
        k("left_ankle", -1.5, 3.4),
        k("right_ankle", 0.6, 3.5),
      ],
    },
  },
  {
    id: "tree",
    name: "Árbol",
    holdMs: 6000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -0.4, -1.0),
        k("right_elbow", 0.4, -1.0),
        k("left_wrist", -0.1, -1.8),
        k("right_wrist", 0.1, -1.8),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
        k("left_knee", -0.7, 2.3),
        k("right_knee", 0.3, 2.5),
        k("left_ankle", 0.0, 2.4),
        k("right_ankle", 0.3, 3.5),
      ],
    },
  },
  {
    id: "star",
    name: "Estrella",
    holdMs: 5000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -1.2, -0.4),
        k("right_elbow", 1.2, -0.4),
        k("left_wrist", -1.8, -0.8),
        k("right_wrist", 1.8, -0.8),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
        k("left_knee", -0.8, 2.5),
        k("right_knee", 0.8, 2.5),
        k("left_ankle", -1.2, 3.5),
        k("right_ankle", 1.2, 3.5),
      ],
    },
  },
];
