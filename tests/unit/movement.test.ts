import { EMASmoother, poseMovement } from "@/lib/movement";
import type { Pose } from "@/types/pose";
import { describe, expect, it } from "vitest";

function makePose(offsetX: number, offsetY: number): Pose {
  return {
    ts: 0,
    fps: 30,
    keypoints: [
      { name: "nose", x: 100 + offsetX, y: 100 + offsetY, score: 0.9 },
      { name: "left_shoulder", x: 80 + offsetX, y: 150 + offsetY, score: 0.9 },
      { name: "right_shoulder", x: 120 + offsetX, y: 150 + offsetY, score: 0.9 },
      { name: "left_hip", x: 90 + offsetX, y: 220 + offsetY, score: 0.9 },
      { name: "right_hip", x: 110 + offsetX, y: 220 + offsetY, score: 0.9 },
    ],
  };
}

describe("poseMovement", () => {
  it("retorna 0 para poses idénticas", () => {
    const a = makePose(0, 0);
    const b = makePose(0, 0);
    expect(poseMovement(a, b)).toBe(0);
  });

  it("retorna positivo cuando hay desplazamiento", () => {
    const a = makePose(0, 0);
    const b = makePose(10, 0);
    expect(poseMovement(a, b)).toBeGreaterThan(0);
  });

  it("ignora keypoints con score bajo el umbral", () => {
    const a: Pose = {
      ts: 0,
      fps: 30,
      keypoints: [
        { name: "nose", x: 0, y: 0, score: 0.1 },
        { name: "left_shoulder", x: 0, y: 0, score: 0.9 },
      ],
    };
    const b: Pose = {
      ts: 0,
      fps: 30,
      keypoints: [
        { name: "nose", x: 1000, y: 1000, score: 0.1 },
        { name: "left_shoulder", x: 0, y: 0, score: 0.9 },
      ],
    };
    expect(poseMovement(a, b)).toBe(0);
  });
});

describe("EMASmoother", () => {
  it("toma el primer valor como inicial", () => {
    const ema = new EMASmoother(0.5);
    expect(ema.push(10)).toBe(10);
  });

  it("suaviza valores siguientes", () => {
    const ema = new EMASmoother(0.5);
    ema.push(10);
    expect(ema.push(20)).toBe(15);
  });

  it("reset reinicia el estado", () => {
    const ema = new EMASmoother(0.5);
    ema.push(10);
    ema.reset();
    expect(ema.push(50)).toBe(50);
  });
});
