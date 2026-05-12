import type { CSSProperties, ReactNode } from "react";

interface GameHudProps {
  title: string;
  eyebrow?: string;
  onExit: () => void;
  bg?: string;
  hud?: ReactNode;
  children: ReactNode;
}

export function GameHud({ title, eyebrow, onExit, bg, hud, children }: GameHudProps) {
  const style: CSSProperties = bg ? { background: bg } : {};
  return (
    <div className="mg-shell" style={style}>
      <div className="mg-top">
        <button className="mg-back" type="button" onClick={onExit}>
          ← Salir
        </button>
        <div className="mg-title">
          {eyebrow && <div className="mg-eyebrow">{eyebrow}</div>}
          <div className="mg-name">{title}</div>
        </div>
        <div className="mg-hud">{hud}</div>
      </div>
      <div className="mg-body">{children}</div>
    </div>
  );
}
