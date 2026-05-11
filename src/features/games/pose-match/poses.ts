import type { NormalizedPose } from "@/types/pose";

/**
 * Poses objetivo precomputadas (espacio normalizado: shoulderDist=1, origen=midpoint hombros).
 *
 * En v1 son hardcoded; en v2 vendrán de un tooling de captura.
 */
export interface TargetPose {
  id: string;
  name: string;
  difficulty: 1 | 2 | 3;
  pose: NormalizedPose;
  durationMs: number;
}

const k = (
  name: NormalizedPose["keypoints"][number]["name"],
  x: number,
  y: number,
): NormalizedPose["keypoints"][number] => ({ name, x, y, score: 1 });

export const TARGET_POSES: TargetPose[] = [
  {
    id: "t-pose",
    name: "T",
    difficulty: 1,
    durationMs: 4000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -1.0, 0),
        k("right_elbow", 1.0, 0),
        k("left_wrist", -1.5, 0),
        k("right_wrist", 1.5, 0),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
      ],
    },
  },
  {
    id: "y-pose",
    name: "Y arriba",
    difficulty: 1,
    durationMs: 4000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -0.9, -0.7),
        k("right_elbow", 0.9, -0.7),
        k("left_wrist", -1.3, -1.4),
        k("right_wrist", 1.3, -1.4),
      ],
    },
  },
  {
    id: "warrior",
    name: "Guerrero",
    difficulty: 2,
    durationMs: 5000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_wrist", -1.5, 0),
        k("right_wrist", 1.5, 0),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
        k("left_knee", -1.0, 2.4),
        k("right_knee", 0.5, 2.6),
        k("left_ankle", -1.2, 3.5),
        k("right_ankle", 0.5, 3.6),
      ],
    },
  },
  {
    id: "star",
    name: "Estrella",
    difficulty: 2,
    durationMs: 4500,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_wrist", -1.6, -0.8),
        k("right_wrist", 1.6, -0.8),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
        k("left_ankle", -1.4, 3.5),
        k("right_ankle", 1.4, 3.5),
      ],
    },
  },
  {
    id: "thinker",
    name: "Pensador",
    difficulty: 3,
    durationMs: 5000,
    pose: {
      keypoints: [
        k("nose", 0.2, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("right_elbow", 0.7, 0.6),
        k("right_wrist", 0.3, -0.8),
        k("left_wrist", -0.3, 1.4),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
      ],
    },
  },
];

import { DTI_POSES } from "./dti-poses";

/** Pool completo: pack base + pack DTI. */
export const POSE_POOL: TargetPose[] = [...TARGET_POSES, ...DTI_POSES];

export function pickRandomPoses(n: number): TargetPose[] {
  const pool = [...POSE_POOL];
  const out: TargetPose[] = [];
  while (out.length < n && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    const item = pool.splice(idx, 1)[0];
    if (item) out.push(item);
  }
  return out;
}
