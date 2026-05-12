type PoseId = "runway" | "vogue" | "hips" | "kiss" | "twirl" | "lean";

const FIGS: Record<PoseId, string> = {
  runway:
    "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L36 86 M50 58 L64 86 M30 30 L24 50 M70 30 L76 50",
  vogue:
    "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L40 86 M50 58 L60 86 M30 30 L18 22 L24 12 M70 30 L88 36",
  hips: "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L40 86 M50 58 L60 86 M30 30 L16 38 L26 50 M70 30 L84 38 L74 50",
  kiss: "M50 12 L50 22 M30 30 L50 22 L70 30 M50 22 L50 58 M50 58 L40 86 M50 58 L60 86 M30 30 L18 38 L26 50 M70 30 L80 16 L72 6",
  twirl:
    "M50 12 L50 22 M28 30 L50 22 L72 30 M50 22 L50 58 M50 58 L36 86 M50 58 L66 80 M28 30 L12 22 M72 30 L92 22",
  lean: "M52 12 L54 22 M34 30 L54 22 L74 32 M54 22 L48 58 M48 58 L36 86 M48 58 L60 84 M34 30 L26 50 L36 56 M74 32 L82 50 L72 58",
};

interface PoseFigureProps {
  pose: PoseId;
  color?: string;
  size?: number;
}

export function PoseFigure({ pose, color = "var(--pink-deep)", size = 220 }: PoseFigureProps) {
  const d = FIGS[pose] ?? FIGS.runway;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size * 1.6} className="pose-silhouette">
      <circle cx="50" cy="12" r="8" fill={color} opacity="0.18" stroke={color} strokeWidth="2" />
      <path
        d={d}
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
