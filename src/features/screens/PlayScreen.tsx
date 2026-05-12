import { useState } from "react";
import { ALL_GAMES, GameTile } from "./shared/GameTile";

interface PlayScreenProps {
  openDTI: () => void;
  openGame: (id: string) => void;
}

export function PlayScreen({ openDTI, openGame }: PlayScreenProps) {
  const [filter, setFilter] = useState("Todos");
  const FILTERS = ["Todos", "Pasarela", "Cardio", "Solo", "Multi"];

  return (
    <div className="shell-pad">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <div className="eyebrow">Catálogo</div>
          <h1 className="serif" style={{ fontSize: 56, fontStyle: "italic", margin: "6px 0" }}>
            Modos
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`chip${filter === f ? " chip-dark" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="game-grid">
        {ALL_GAMES.map((g) => (
          <GameTile
            key={g.id}
            game={g}
            onClick={() => (g.id === "dti" ? openDTI() : openGame(g.id))}
          />
        ))}
      </div>
    </div>
  );
}
