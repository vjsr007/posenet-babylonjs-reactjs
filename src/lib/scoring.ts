import type { Keypoint, NormalizedPose } from "@/types/pose";

/**
 * Calcula similitud coseno entre dos poses normalizadas.
 * Considera solo keypoints presentes en ambas con score > threshold.
 *
 * Retorna [0, 1] donde 1 = idénticas, 0 = ortogonales.
 */
export function cosineSimilarity(
  a: NormalizedPose,
  b: NormalizedPose,
  scoreThreshold = 0.3,
): number {
  const aMap = new Map(a.keypoints.map((k) => [k.name, k]));
  const bMap = new Map(b.keypoints.map((k) => [k.name, k]));

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const [name, ka] of aMap) {
    const kb = bMap.get(name);
    if (!kb) continue;
    if (ka.score < scoreThreshold || kb.score < scoreThreshold) continue;
    dot += ka.x * kb.x + ka.y * kb.y;
    normA += ka.x * ka.x + ka.y * ka.y;
    normB += kb.x * kb.x + kb.y * kb.y;
  }

  if (normA === 0 || normB === 0) return 0;
  const sim = dot / (Math.sqrt(normA) * Math.sqrt(normB));
  return Math.max(0, Math.min(1, sim));
}

export type ScoreTier = "PERFECT" | "GREAT" | "GOOD" | "MISS";

export const TIER_THRESHOLDS: Record<ScoreTier, number> = {
  PERFECT: 0.95,
  GREAT: 0.85,
  GOOD: 0.7,
  MISS: 0,
};

export function tierFor(similarity: number): ScoreTier {
  if (similarity >= TIER_THRESHOLDS.PERFECT) return "PERFECT";
  if (similarity >= TIER_THRESHOLDS.GREAT) return "GREAT";
  if (similarity >= TIER_THRESHOLDS.GOOD) return "GOOD";
  return "MISS";
}

const TIER_POINTS: Record<ScoreTier, number> = {
  PERFECT: 1000,
  GREAT: 700,
  GOOD: 400,
  MISS: 0,
};

export function pointsFor(tier: ScoreTier, timeBonus = 1): number {
  return Math.round(TIER_POINTS[tier] * timeBonus);
}

export function scorePose(
  current: NormalizedPose,
  target: NormalizedPose,
  timeBonus = 1,
): { similarity: number; tier: ScoreTier; points: number } {
  const similarity = cosineSimilarity(current, target);
  const tier = tierFor(similarity);
  return { similarity, tier, points: pointsFor(tier, timeBonus) };
}

/**
 * Distancia euclidiana entre dos keypoints.
 */
export function distance(a: Keypoint, b: Keypoint): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
