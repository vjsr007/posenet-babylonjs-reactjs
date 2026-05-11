# ARCHITECTURE — PoseArena

## Diagrama de alto nivel

```
┌──────────────────────────────────────────────────────────┐
│                       Browser                            │
│                                                          │
│  ┌─────────────┐    postMessage   ┌──────────────────┐  │
│  │  <video>    │─────keypoints───▶│ MoveNet Worker   │  │
│  │  webcam     │◀────frames──────│ (TF.js 4.x WebGL)│  │
│  └─────────────┘                  └──────────────────┘  │
│         │                                  │            │
│         ▼                                  ▼            │
│  ┌──────────────────────────────────────────────────┐   │
│  │            usePoseStore (Zustand)                │   │
│  │  { keypoints, confidence, fps, calibration }     │   │
│  └──────────────────────────────────────────────────┘   │
│         │                  │                  │         │
│         ▼                  ▼                  ▼         │
│  ┌────────────┐   ┌────────────────┐   ┌───────────┐    │
│  │ Avatar     │   │ Game Loop      │   │ HUD       │    │
│  │ (Babylon7) │   │ (rAF, refs)    │   │ (DOM/refs)│    │
│  └────────────┘   └────────────────┘   └───────────┘    │
│         │                  │                            │
│         ▼                  ▼                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │             useGameStore (Zustand)               │   │
│  │  { phase, score, streak, currentTarget, ... }    │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

## Principios

1. **Hot path sin React renders.** El game loop corre en `requestAnimationFrame`, escribe scores en refs y actualiza el DOM directamente o vía CSS variables. Solo cambios de fase disparan re-render.
2. **Workers para CPU pesado.** MoveNet en worker; main thread solo orquesta.
3. **Stores pequeños y enfocados.** `usePoseStore` y `useGameStore` separados; selectors con `shallow`.
4. **Avatares vía registry.** Nunca hardcodear bones en lógica de juego.
5. **Funciones puras para scoring.** Testeable sin DOM.

## Capas

```
src/
  app/                  # bootstrap, router, providers
  features/
    pose-detection/     # worker, hook, store
    avatar/             # registry, scene, bone mapping
    calibration/        # T-pose flow
    games/
      pose-match/       # juego v1
      statue/           # próximo
      ...
    ui/                 # shadcn primitives, layout
  lib/                  # utilidades puras (math, geometry)
  styles/               # tailwind + globals
  types/                # tipos compartidos (Pose, Keypoint, BoneMap)
```

## Flujo de datos crítico

```
frame webcam → MoveNet worker → keypoints[] →
  usePoseStore.setKeypoints() →
    [side effect: avatar.applyPose() en useEffect/subscriber]
    [side effect: gameLoop.evaluate() en rAF]
```

## Decisiones arquitectónicas (ADRs cortos)

### ADR-001: MoveNet sobre PoseNet
- PoseNet deprecado. MoveNet Lightning: 50+ fps en mobile, mejor precisión.

### ADR-002: Zustand sobre Redux
- Boilerplate mínimo, sin context, selectors con shallow, middleware persist nativo.

### ADR-003: Babylon.js 7 ESM
- Tree-shaking real (~150 KB gzip vs 800 KB UMD). Soporte glTF estándar.

### ADR-004: Vite sobre CRA
- CRA en mantenimiento mínimo. HMR < 100 ms. Sin webpack config infierno.

### ADR-005: TS estricto, no `any` implícito
- `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`. Mejor refactor.

### ADR-006: Tailwind + shadcn
- Sin CSS-in-JS runtime. Componentes copiables, sin dependencia opaca.

### ADR-007: Worker para TF.js
- Evita stutters en main thread durante inferencia (≥30 ms en CPU).

### ADR-008: Game loop en rAF, no en estado React
- Render React solo en cambios de fase. Score/HUD vía refs + DOM imperativo.

## Boundaries de seguridad

- **Webcam:** solo `getUserMedia`, nunca enviada a servidor.
- **Telemetría:** opt-in, anónima, sin keypoints.
- **CSP:** estricto en producción, sin `eval` (TF usa `wasm`/`webgl` backend).
