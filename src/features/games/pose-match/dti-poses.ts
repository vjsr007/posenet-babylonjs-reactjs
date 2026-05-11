import type { NormalizedPose } from "@/types/pose";
import type { TargetPose } from "./poses";

/**
 * Pack de poses inspirado en juegos de moda tipo "Dress to Impress" (Roblox).
 *
 * IMPORTANTE: estas poses son SOLO datos de keypoints normalizados (no contienen
 * arte, modelos 3D ni texturas). No infringen IP de Roblox/DTI; son interpretaciones
 * genéricas de poses de modelaje.
 *
 * Espacio: shoulderDist=1, origen=midpoint hombros. Y crece hacia abajo.
 */

const k = (
  name: NormalizedPose["keypoints"][number]["name"],
  x: number,
  y: number,
): NormalizedPose["keypoints"][number] => ({ name, x, y, score: 1 });

export const DTI_POSES: TargetPose[] = [
  {
    id: "dti-runway",
    name: "Pasarela",
    difficulty: 1,
    durationMs: 4500,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -0.55, 0.7),
        k("right_elbow", 0.55, 0.7),
        k("left_wrist", -0.6, 1.4),
        k("right_wrist", 0.6, 1.4),
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
    id: "dti-hands-hips",
    name: "Manos en cintura",
    difficulty: 1,
    durationMs: 4000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -0.9, 0.6),
        k("right_elbow", 0.9, 0.6),
        k("left_wrist", -0.4, 1.4),
        k("right_wrist", 0.4, 1.4),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
      ],
    },
  },
  {
    id: "dti-vogue",
    name: "Vogue (marco facial)",
    difficulty: 2,
    durationMs: 5000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -0.4, -0.9),
        k("right_elbow", 0.9, 0.2),
        k("left_wrist", 0.2, -1.4),
        k("right_wrist", 1.5, -0.2),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
      ],
    },
  },
  {
    id: "dti-sassy-lean",
    name: "Apoyo sassy",
    difficulty: 2,
    durationMs: 4500,
    pose: {
      keypoints: [
        k("nose", -0.2, -1.1),
        k("left_shoulder", -0.6, 0),
        k("right_shoulder", 0.4, 0.1),
        k("left_elbow", -0.95, 0.6),
        k("right_elbow", 0.85, 0.6),
        k("left_wrist", -0.45, 1.3),
        k("right_wrist", 0.6, 1.3),
        k("left_hip", -0.25, 1.5),
        k("right_hip", 0.35, 1.55),
        k("left_knee", -0.2, 2.5),
        k("right_knee", 0.55, 2.5),
        k("left_ankle", -0.2, 3.5),
        k("right_ankle", 0.6, 3.5),
      ],
    },
  },
  {
    id: "dti-photo-pose",
    name: "Pose foto",
    difficulty: 2,
    durationMs: 4500,
    pose: {
      keypoints: [
        k("nose", 0.1, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -1.0, -0.4),
        k("right_elbow", 0.6, 0.7),
        k("left_wrist", -1.4, -1.0),
        k("right_wrist", 0.2, 1.3),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
      ],
    },
  },
  {
    id: "dti-runway-turn",
    name: "Vuelta de pasarela",
    difficulty: 3,
    durationMs: 5000,
    pose: {
      keypoints: [
        k("nose", 0.3, -1.1),
        k("left_shoulder", -0.4, 0),
        k("right_shoulder", 0.5, 0.1),
        k("left_elbow", -0.7, 0.7),
        k("right_elbow", 0.4, 0.8),
        k("left_wrist", -0.5, 1.5),
        k("right_wrist", -0.1, 1.4),
        k("left_hip", -0.25, 1.5),
        k("right_hip", 0.35, 1.55),
        k("left_knee", -0.4, 2.5),
        k("right_knee", 0.4, 2.6),
        k("left_ankle", -0.5, 3.5),
        k("right_ankle", 0.5, 3.6),
      ],
    },
  },
  {
    id: "dti-blow-kiss",
    name: "Beso volado",
    difficulty: 2,
    durationMs: 4000,
    pose: {
      keypoints: [
        k("nose", 0, -1.2),
        k("left_shoulder", -0.5, 0),
        k("right_shoulder", 0.5, 0),
        k("left_elbow", -0.9, 0.6),
        k("right_elbow", 0.6, -0.6),
        k("left_wrist", -0.45, 1.3),
        k("right_wrist", 0.2, -1.1),
        k("left_hip", -0.3, 1.5),
        k("right_hip", 0.3, 1.5),
      ],
    },
  },
];
