import { Icon } from "@/components/Icon";
import { useLobbyStore } from "@/features/lobby/state";
import type { RouteId } from "@/features/lobby/state";

const NAV_ITEMS: { id: RouteId; label: string; icon: Parameters<typeof Icon>[0]["name"] }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "play", label: "Jugar", icon: "play" },
  { id: "closet", label: "Closet", icon: "closet" },
  { id: "shop", label: "Tienda", icon: "shop" },
  { id: "pass", label: "Pase Glam", icon: "pass" },
  { id: "friends", label: "Amigxs", icon: "friends" },
  { id: "profile", label: "Perfil", icon: "profile" },
];

export function Sidebar() {
  const route = useLobbyStore((s) => s.route);
  const setRoute = useLobbyStore((s) => s.setRoute);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Pose
        <br />
        Arena
        <small>Dress to Impress · v1</small>
      </div>

      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-item${route === item.id ? " active" : ""}`}
          onClick={() => setRoute(item.id)}
        >
          <span className="glyph">
            <Icon name={item.icon} size={18} />
          </span>
          {item.label}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      <div
        className="card-soft"
        style={{
          padding: 14,
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="avatar-bubble online">Y</div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                textTransform: "uppercase",
                letterSpacing: ".12em",
                fontWeight: 700,
              }}
            >
              Lv 22
            </div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>YOU</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
          <span className="coin">12,840</span>
          <span className="gem">94</span>
        </div>
      </div>

      <button
        type="button"
        className={`nav-item${route === "settings" ? " active" : ""}`}
        onClick={() => setRoute("settings")}
      >
        <span className="glyph">
          <Icon name="settings" size={18} />
        </span>
        Ajustes
      </button>
    </aside>
  );
}
