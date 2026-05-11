import { cosineSimilarity, pointsFor, scorePose, tierFor } from "@/lib/scoring";
import type { NormalizedPose } from "@/types/pose";
import { describe, expect, it } from "vitest";

const tPose: NormalizedPose = {
  keypoints: [
    { name: "left_shoulder", x: -0.5, y: 0, score: 1 },
    { name: "right_shoulder", x: 0.5, y: 0, score: 1 },
    { name: "left_wrist", x: -1.5, y: 0, score: 1 },
    { name: "right_wrist", x: 1.5, y: 0, score: 1 },
  ],
};

describe("cosineSimilarity", () => {
  it("returns 1 for identical poses", () => {
    expect(cosineSimilarity(tPose, tPose)).toBeCloseTo(1, 5);
  });

  it("returns 0 when no overlapping keypoints", () => {
    const other: NormalizedPose = {
      keypoints: [{ name: "nose", x: 0, y: -1, score: 1 }],
    };
    expect(cosineSimilarity(tPose, other)).toBe(0);
  });

  it("ignores keypoints below threshold", () => {
    const noisy: NormalizedPose = {
      keypoints: tPose.keypoints.map((k) => ({ ...k, score: 0.1 })),
    };
    expect(cosineSimilarity(tPose, noisy, 0.3)).toBe(0);
  });

  it("returns ≤ 1 for perturbed pose", () => {
    const perturbed: NormalizedPose = {
      keypoints: tPose.keypoints.map((k) => ({ ...k, x: k.x + 0.05 })),
    };
    const sim = cosineSimilarity(tPose, perturbed);
    expect(sim).toBeGreaterThan(0.95);
    expect(sim).toBeLessThanOrEqual(1);
  });
});

describe("tierFor", () => {
  it("maps similarity to tier", () => {
    expect(tierFor(0.99)).toBe("PERFECT");
    expect(tierFor(0.9)).toBe("GREAT");
    expect(tierFor(0.75)).toBe("GOOD");
    expect(tierFor(0.5)).toBe("MISS");
  });
});

describe("pointsFor", () => {
  it("respects time bonus", () => {
    expect(pointsFor("PERFECT", 1)).toBe(1000);
    expect(pointsFor("PERFECT", 0.5)).toBe(500);
    expect(pointsFor("MISS", 2)).toBe(0);
  });
});

describe("scorePose", () => {
  it("aggregates similarity, tier, and points", () => {
    const r = scorePose(tPose, tPose);
    expect(r.similarity).toBeCloseTo(1, 5);
    expect(r.tier).toBe("PERFECT");
    expect(r.points).toBe(1000);
  });
});
