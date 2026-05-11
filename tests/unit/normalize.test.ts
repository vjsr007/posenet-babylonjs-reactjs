import { calibrate, normalizePose } from "@/lib/normalize";
import type { Pose } from "@/types/pose";
import { describe, expect, it } from "vitest";

const tPoseRaw: Pose = {
  ts: 0,
  fps: 30,
  keypoints: [
    { name: "nose", x: 320, y: 100, score: 0.9 },
    { name: "left_shoulder", x: 280, y: 200, score: 0.9 },
    { name: "right_shoulder", x: 360, y: 200, score: 0.9 },
    { name: "left_ankle", x: 290, y: 600, score: 0.9 },
    { name: "right_ankle", x: 350, y: 600, score: 0.9 },
  ],
};

describe("calibrate", () => {
  it("returns null when shoulder confidence is too low", () => {
    const bad: Pose = {
      ...tPoseRaw,
      keypoints: tPoseRaw.keypoints.map((k) => ({ ...k, score: 0.1 })),
    };
    expect(calibrate(bad)).toBeNull();
  });

  it("computes shoulderDist and midpoint", () => {
    const cal = calibrate(tPoseRaw);
    expect(cal).not.toBeNull();
    expect(cal?.shoulderDist).toBeCloseTo(80, 5);
    expect(cal?.midpoint).toEqual({ x: 320, y: 200 });
  });
});

describe("normalizePose", () => {
  it("centers and scales so shoulder distance ≈ 1", () => {
    const cal = calibrate(tPoseRaw);
    expect(cal).not.toBeNull();
    if (!cal) return;
    const norm = normalizePose(tPoseRaw, cal);
    const ls = norm.keypoints.find((k) => k.name === "left_shoulder");
    const rs = norm.keypoints.find((k) => k.name === "right_shoulder");
    expect(ls).toBeDefined();
    expect(rs).toBeDefined();
    if (!ls || !rs) return;
    expect(Math.hypot(ls.x - rs.x, ls.y - rs.y)).toBeCloseTo(1, 5);
    // midpoint en origen
    expect((ls.x + rs.x) / 2).toBeCloseTo(0, 5);
  });
});
