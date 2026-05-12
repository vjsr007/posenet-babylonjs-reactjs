import { Icon } from "@/components/Icon";
import { PoseFigure } from "@/components/PoseFigure";
import { GAME_CATALOG } from "@/features/lobby/state";

interface GameMeta {
  id: string;
  name: string;
  tag: string;
  variant: string;
  ready: boolean;
  players: string;
}

const ALL_GAMES: GameMeta[] = [
  {
    id: "dti",
    name: "Dress to Impress",
    tag: "Tema · Closet · Pasarela",
    variant: "holo",
    ready: true,
    players: "1.2M",
  },
  ...GAME_CATALOG,
];

interface GameTileProps {
  game: GameMeta;
  onClick: () => void;
}

function GameTile({ game, onClick }: GameTileProps) {
  const v = game.variant;
  const POSES = ["vogue", "runway", "twirl", "hips"] as const;
  const poseIdx = game.id.length % POSES.length;
  const pose = POSES[poseIdx] ?? "vogue";

  return (
    <button type="button" className={`game-tile tile-variant-${v}`} onClick={onClick}>
      <div className="tile-art">
        {v === "holo" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 800,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              DTI
            </div>
          </div>
        )}
        {v === "poster" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <PoseFigure pose={pose} color="rgba(255,255,255,0.85)" size={120} />
          </div>
        )}
        {v === "magazine" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              className="serif"
              style={{
                fontSize: 48,
                fontStyle: "italic",
                color: "var(--pink-deep)",
                lineHeight: 0.85,
              }}
            >
              {game.name.split(" ")[0]}
            </div>
            <div className="eyebrow">Issue · {game.players}</div>
          </div>
        )}
        {v === "minimal" && (
          <div
            style={{
              position: "absolute",
              inset: 18,
              border: "1.5px solid var(--line)",
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
            }}
          >
            <PoseFigure pose="lean" color="var(--ink-3)" size={100} />
          </div>
        )}
      </div>
      {v === "holo" && (
        <span className="chip chip-pink tile-badge">
          <Icon name="sparkle" size={12} /> FEATURED
        </span>
      )}
      {!game.ready && <span className="chip chip-dark tile-badge">SOON</span>}
      <div className="tile-overlay">
        <div className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
          {game.players} jugando
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 24,
            fontStyle: "italic",
            marginTop: 2,
          }}
        >
          {game.name}
        </div>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{game.tag}</div>
      </div>
    </button>
  );
}

export { ALL_GAMES, GameTile };
export type { GameMeta };
