/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect, PA_UI, PA_SCREENS_1, PA_SCREENS_2, PA_DTI, PA_DATA */
const { useState, useEffect } = React;
const { Sidebar, Icon } = PA_UI;
const { OnboardingFlow, Home, PlayScreen, ClosetScreen } = PA_SCREENS_1;
const { ShopScreen, BattlePassScreen, FriendsScreen, ProfileScreen } = PA_SCREENS_2;
const { DTIFlow } = PA_DTI;
const { PoseMatch, StatueGame, YogaFlow, ShadowBoxer, SquatSurvivor } = PA_MINIGAMES;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  palette: "sugar",
  density: "desktop",
  font: "playfair",
  showWebcam: true,
  tileVariant: "auto",
  closetCats: "all",
} /*EDITMODE-END*/;

const PALETTES = {
  sugar: "",
  neon: "theme-neon",
  editorial: "theme-editorial",
};
const FONTS = {
  playfair: '"Playfair Display", "Didot", serif',
  dmserif: '"DM Serif Display", serif',
  cormorant: '"Cormorant Garamond", serif',
  italiana: '"Italiana", serif',
};
const CAT_PRESETS = {
  all: ["hair", "top", "bottom", "dress", "shoes", "acc", "makeup", "bag"],
  classic: ["hair", "top", "bottom", "dress", "shoes", "acc"],
  glam: ["hair", "dress", "shoes", "acc", "makeup", "bag"],
  minimal: ["top", "bottom", "shoes", "acc"],
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState("onboarding");
  const [dtiOpen, setDtiOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--serif", FONTS[t.font] || FONTS.playfair);
  }, [t.font]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const openDTI = () => setDtiOpen(true);
  const openGame = (id) => {
    if (["pose-match", "statue", "yoga", "shadow", "squat"].includes(id)) {
      setGameOpen(id);
      return;
    }
    showToast(`${PA_DATA.GAMES.find((g) => g.id === id)?.name || id} llega pronto ✦`);
  };

  const visibleCats = CAT_PRESETS[t.closetCats] || CAT_PRESETS.all;
  const themeClass =
    `${PALETTES[t.palette] || ""} ${t.density === "tv" ? "density-tv" : ""}`.trim();

  // Onboarding takes over the screen
  if (route === "onboarding") {
    return (
      <div className={themeClass} style={{ height: "100vh" }}>
        <OnboardingFlow onDone={() => setRoute("home")} />
        <TweaksPanelEl t={t} setTweak={setTweak} />
      </div>
    );
  }

  return (
    <div className={themeClass} style={{ height: "100vh" }}>
      <div className="app-shell">
        <Sidebar route={route} setRoute={setRoute} coins={12840} gems={94} level={22} />
        <main className="main">
          <div key={route} className="route-enter" style={{ minHeight: "100%" }}>
            {route === "home" && (
              <Home
                setRoute={setRoute}
                openDTI={openDTI}
                openGame={openGame}
                tileVariant={t.tileVariant}
              />
            )}
            {route === "play" && (
              <PlayScreen openDTI={openDTI} openGame={openGame} tileVariant={t.tileVariant} />
            )}
            {route === "closet" && <ClosetScreen visibleCats={visibleCats} />}
            {route === "shop" && <ShopScreen />}
            {route === "pass" && <BattlePassScreen />}
            {route === "friends" && <FriendsScreen />}
            {route === "profile" && <ProfileScreen coins={12840} gems={94} level={22} />}
            {route === "settings" && <SettingsScreen onRedo={() => setRoute("onboarding")} />}
          </div>
        </main>
      </div>
      {gameOpen === "pose-match" && <PoseMatch onExit={() => setGameOpen(null)} />}
      {gameOpen === "statue" && <StatueGame onExit={() => setGameOpen(null)} />}
      {gameOpen === "yoga" && <YogaFlow onExit={() => setGameOpen(null)} />}
      {gameOpen === "shadow" && <ShadowBoxer onExit={() => setGameOpen(null)} />}
      {gameOpen === "squat" && <SquatSurvivor onExit={() => setGameOpen(null)} />}
      {dtiOpen && (
        <DTIFlow
          onExit={() => setDtiOpen(false)}
          showWebcam={t.showWebcam}
          visibleCats={visibleCats}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
      <TweaksPanelEl t={t} setTweak={setTweak} />
    </div>
  );
}

const SettingsScreen = ({ onRedo }) => (
  <div className="shell-pad">
    <div className="eyebrow">Cuenta</div>
    <h1 className="serif" style={{ fontSize: 56, fontStyle: "italic", margin: "6px 0 24px" }}>
      Ajustes
    </h1>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[
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
      ].map((s) => (
        <div key={s.t} className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{s.t}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{s.d}</div>
          </div>
          <button className="btn btn-ghost" onClick={s.onClick}>
            {s.btn}
          </button>
        </div>
      ))}
    </div>
  </div>
);

const TweaksPanelEl = ({ t, setTweak }) => (
  <TweaksPanel title="Tweaks">
    <TweakSection label="Apariencia">
      <TweakRadio
        label="Paleta"
        value={t.palette}
        onChange={(v) => setTweak("palette", v)}
        options={[
          { value: "sugar", label: "Sugar" },
          { value: "neon", label: "Neon" },
          { value: "editorial", label: "Editorial" },
        ]}
      />
      <TweakRadio
        label="Densidad"
        value={t.density}
        onChange={(v) => setTweak("density", v)}
        options={[
          { value: "desktop", label: "Desktop" },
          { value: "tv", label: "TV / Gamepad" },
        ]}
      />
      <TweakSelect
        label="Fuente serif"
        value={t.font}
        onChange={(v) => setTweak("font", v)}
        options={[
          { value: "playfair", label: "Playfair Display" },
          { value: "dmserif", label: "DM Serif Display" },
          { value: "cormorant", label: "Cormorant Garamond" },
          { value: "italiana", label: "Italiana" },
        ]}
      />
    </TweakSection>
    <TweakSection label="Lobby">
      <TweakSelect
        label="Variante de card"
        value={t.tileVariant}
        onChange={(v) => setTweak("tileVariant", v)}
        options={[
          { value: "auto", label: "Mix (auto)" },
          { value: "poster", label: "Poster" },
          { value: "magazine", label: "Revista" },
          { value: "holo", label: "Holográfico" },
          { value: "minimal", label: "Minimal" },
        ]}
      />
    </TweakSection>
    <TweakSection label="Juego">
      <TweakToggle
        label="Mostrar webcam"
        value={t.showWebcam}
        onChange={(v) => setTweak("showWebcam", v)}
      />
      <TweakSelect
        label="Categorías closet"
        value={t.closetCats}
        onChange={(v) => setTweak("closetCats", v)}
        options={[
          { value: "all", label: "Todas (8)" },
          { value: "classic", label: "Clásicas (6)" },
          { value: "glam", label: "Glam (6)" },
          { value: "minimal", label: "Mínimas (4)" },
        ]}
      />
    </TweakSection>
  </TweaksPanel>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
