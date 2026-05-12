interface SettingsScreenProps {
  onRedo: () => void;
}

interface SettingsEntry {
  t: string;
  d: string;
  btn: string;
  onClick?: () => void;
}

export function SettingsScreen({ onRedo }: SettingsScreenProps) {
  const SETTINGS: SettingsEntry[] = [
    {
      t: "Repetir tutorial",
      d: "Vuelve a la pantalla de calibración",
      btn: "Ir",
      onClick: onRedo,
    },
    { t: "Cámara", d: "Cambiar dispositivo y resolución", btn: "Configurar" },
    { t: "Idioma", d: "Español · Latam", btn: "Cambiar" },
    { t: "Privacidad", d: "Video nunca sale de tu navegador", btn: "Leer" },
    { t: "Datos", d: "Exportar trofeos y replays", btn: "Exportar" },
    { t: "Soporte", d: "Discord · Reportar bug", btn: "Abrir" },
  ];

  return (
    <div className="shell-pad">
      <div className="eyebrow">Cuenta</div>
      <h1 className="serif" style={{ fontSize: 56, fontStyle: "italic", margin: "6px 0 24px" }}>
        Ajustes
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {SETTINGS.map((s) => (
          <div
            key={s.t}
            className="card"
            style={{ display: "flex", gap: 14, alignItems: "center" }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{s.d}</div>
            </div>
            <button className="btn btn-ghost" type="button" onClick={s.onClick}>
              {s.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
