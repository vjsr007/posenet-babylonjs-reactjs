import type { CalibrationData, Keypoint, NormalizedPose, Pose } from "@/types/pose";

/**
 * Captura calibración a partir de una pose T-pose.
 */
export function calibrate(pose: Pose): CalibrationData | null {
  const ls = pose.keypoints.find((k) => k.name === "left_shoulder");
  const rs = pose.keypoints.find((k) => k.name === "right_shoulder");
  const la = pose.keypoints.find((k) => k.name === "left_ankle");
  const ra = pose.keypoints.find((k) => k.name === "right_ankle");
  const nose = pose.keypoints.find((k) => k.name === "nose");

  if (!ls || !rs || !nose) return null;
  if (ls.score < 0.5 || rs.score < 0.5 || nose.score < 0.5) return null;

  const shoulderDist = Math.hypot(ls.x - rs.x, ls.y - rs.y);
  const midpoint = { x: (ls.x + rs.x) / 2, y: (ls.y + rs.y) / 2 };
  const ankleY = la && ra ? (la.y + ra.y) / 2 : nose.y + shoulderDist * 4; // fallback estimado
  const height = Math.abs(ankleY - nose.y);

  return { shoulderDist, height, midpoint };
}

/**
 * Normaliza una pose a espacio centrado (origen=midpoint hombros) y escala
 * tal que la distancia entre hombros = 1.
 */
export function normalizePose(pose: Pose, calibration: CalibrationData): NormalizedPose {
  const { midpoint, shoulderDist } = calibration;
  const scale = shoulderDist || 1;
  const keypoints: Keypoint[] = pose.keypoints.map((k) => ({
    name: k.name,
    x: (k.x - midpoint.x) / scale,
    y: (k.y - midpoint.y) / scale,
    score: k.score,
  }));
  return { keypoints };
}
