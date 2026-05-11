import type { Pose } from "@/types/pose";

/**
 * Magnitud de movimiento entre dos poses (suma de distancias por keypoint con score válido).
 * Útil para Statue Game (red light / green light).
 */
export function poseMovement(prev: Pose, curr: Pose, scoreThreshold = 0.3): number {
  const prevMap = new Map(prev.keypoints.map((k) => [k.name, k]));
  let total = 0;
  let count = 0;
  for (const c of curr.keypoints) {
    if (c.score < scoreThreshold) continue;
    const p = prevMap.get(c.name);
    if (!p || p.score < scoreThreshold) continue;
    total += Math.hypot(c.x - p.x, c.y - p.y);
    count += 1;
  }
  if (count === 0) return 0;
  return total / count;
}

/**
 * Suaviza una serie temporal con media móvil exponencial.
 */
export class EMASmoother {
  private value = 0;
  private initialized = false;

  constructor(private readonly alpha: number = 0.3) {}

  push(sample: number): number {
    if (!this.initialized) {
      this.value = sample;
      this.initialized = true;
    } else {
      this.value = this.alpha * sample + (1 - this.alpha) * this.value;
    }
    return this.value;
  }

  reset(): void {
    this.initialized = false;
    this.value = 0;
  }

  get current(): number {
    return this.value;
  }
}
