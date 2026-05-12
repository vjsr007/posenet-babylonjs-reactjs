import { Sidebar } from "@/components/Sidebar";
import { PoseMatchGame } from "@/features/games/pose-match/PoseMatchGame";
import { ShadowBoxerGame } from "@/features/games/shadow-boxer/ShadowBoxerGame";
import { SquatSurvivorGame } from "@/features/games/squat-survivor/SquatSurvivorGame";
import { StatueGame } from "@/features/games/statue-game/StatueGame";
import { YogaFlowGame } from "@/features/games/yoga-flow/YogaFlowGame";
import { useLobbyStore } from "@/features/lobby/state";
import { BattlePassScreen } from "@/features/screens/BattlePassScreen";
import { ClosetScreen } from "@/features/screens/ClosetScreen";
import { FriendsScreen } from "@/features/screens/FriendsScreen";
import { HomeScreen } from "@/features/screens/HomeScreen";
import { OnboardingScreen } from "@/features/screens/OnboardingScreen";
import { PlayScreen } from "@/features/screens/PlayScreen";
import { ProfileScreen } from "@/features/screens/ProfileScreen";
import { SettingsScreen } from "@/features/screens/SettingsScreen";
import { ShopScreen } from "@/features/screens/ShopScreen";
import { useState } from "react";

export function App() {
  const route = useLobbyStore((s) => s.route);
  const gameOpen = useLobbyStore((s) => s.gameOpen);
  const dtiOpen = useLobbyStore((s) => s.dtiOpen);
  const toast = useLobbyStore((s) => s.toast);
  const openGame = useLobbyStore((s) => s.openGame);
  const openDTI = useLobbyStore((s) => s.openDTI);
  const closeDTI = useLobbyStore((s) => s.closeDTI);
  const showToast = useLobbyStore((s) => s.showToast);

  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOpenGame = (id: string): void => {
    const ready = ["pose-match", "statue", "yoga", "shadow", "squat"].includes(id);
    if (ready) {
      openGame(id as Parameters<typeof openGame>[0]);
    } else {
      showToast(`${id} llega pronto ✦`);
    }
  };

  if (showOnboarding) {
    return (
      <div style={{ height: "100vh" }}>
        <OnboardingScreen onDone={() => setShowOnboarding(false)} />
      </div>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div key={route} className="route-enter" style={{ minHeight: "100%" }}>
            {route === "home" && <HomeScreen openDTI={openDTI} openGame={handleOpenGame} />}
            {route === "play" && <PlayScreen openDTI={openDTI} openGame={handleOpenGame} />}
            {route === "closet" && <ClosetScreen />}
            {route === "shop" && <ShopScreen />}
            {route === "pass" && <BattlePassScreen />}
            {route === "friends" && <FriendsScreen />}
            {route === "profile" && <ProfileScreen coins={12840} gems={94} level={22} />}
            {route === "settings" && <SettingsScreen onRedo={() => setShowOnboarding(true)} />}
          </div>
        </main>
      </div>

      {gameOpen === "pose-match" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <PoseMatchGame />
        </div>
      )}
      {gameOpen === "statue" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <StatueGame />
        </div>
      )}
      {gameOpen === "yoga" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <YogaFlowGame />
        </div>
      )}
      {gameOpen === "shadow" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <ShadowBoxerGame />
        </div>
      )}
      {gameOpen === "squat" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <SquatSurvivorGame />
        </div>
      )}
      {dtiOpen && (
        <div
          className="stage"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 16,
            background: "var(--bg)",
          }}
        >
          <div className="serif" style={{ fontSize: 48, fontStyle: "italic" }}>
            Dress to Impress
          </div>
          <div style={{ color: "var(--ink-3)" }}>Modo en construcción ✦</div>
          <button className="btn btn-pink" type="button" onClick={closeDTI}>
            Volver
          </button>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
