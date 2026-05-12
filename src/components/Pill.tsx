import type { CSSProperties, ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  accent?: string;
}

export function Pill({ children, accent }: PillProps) {
  const style: CSSProperties = accent ? { background: accent, color: "#fff" } : {};
  return (
    <div className="mg-pill" style={style}>
      {children}
    </div>
  );
}
