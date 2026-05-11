import type { NormalizedPose } from "@/types/pose";

interface Props {
  pose: NormalizedPose;
  size?: number;
}

const CONNECTIONS: Array<[string, string]> = [
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"],
  ["right_elbow", "right_wrist"],
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "right_hip"],
  ["left_hip", "left_knee"],
  ["left_knee", "left_ankle"],
  ["right_hip", "right_knee"],
  ["right_knee", "right_ankle"],
];

/**
 * Render SVG simple del esqueleto objetivo, en espacio normalizado.
 */
export function TargetPoseView({ pose, size = 320 }: Props): JSX.Element {
  // Caja: x ∈ [-2, 2], y ∈ [-2, 4]
  const xMin = -2;
  const xMax = 2;
  const yMin = -2;
  const yMax = 4;
  const w = xMax - xMin;
  const h = yMax - yMin;

  const project = (x: number, y: number): { cx: number; cy: number } => ({
    cx: ((x - xMin) / w) * size,
    cy: ((y - yMin) / h) * size * 1.5,
  });

  const map = new Map(pose.keypoints.map((k) => [k.name, k]));

  return (
    <div className="flex-1 grid place-items-center">
      <svg
        viewBox={`0 0 ${size} ${size * 1.5}`}
        className="w-full h-full max-h-[60vh]"
        aria-label="Pose objetivo"
        role="img"
      >
        <title>Pose objetivo</title>
        {CONNECTIONS.map(([a, b]) => {
          const ka = map.get(a as never);
          const kb = map.get(b as never);
          if (!ka || !kb) return null;
          const pa = project(ka.x, ka.y);
          const pb = project(kb.x, kb.y);
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.cx}
              y1={pa.cy}
              x2={pb.cx}
              y2={pb.cy}
              stroke="#22d3ee"
              strokeWidth={4}
              strokeLinecap="round"
            />
          );
        })}
        {pose.keypoints.map((k) => {
          const p = project(k.x, k.y);
          return <circle key={k.name} cx={p.cx} cy={p.cy} r={6} fill="#7c3aed" />;
        })}
      </svg>
    </div>
  );
}
