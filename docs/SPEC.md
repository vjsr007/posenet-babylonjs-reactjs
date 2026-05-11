# Spec Técnico — PoseArena v1

> Implementación del PRD ([PRD.md](PRD.md)). Sigue *spec-driven development*: este doc es la fuente de verdad antes de escribir código.

## 1. Objetivo

Reescribir `posenet-babylonjs-reactjs` como un juego "Pose Match" con stack moderno, UI/UX cuidada y arquitectura mantenible.

## 2. Tech Stack

| Capa | Actual | Propuesto v1 | Razón |
|---|---|---|---|
| Bundler | CRA 3.2 (webpack 4) | **Vite 5** | TTI build 10×, HMR instantáneo, mantenido |
| Framework | React 16.11 (clases) | **React 18.3** (hooks) | Concurrent, Suspense, ecosistema |
| Lenguaje | JS | **TypeScript 5.5** | Seguridad de tipos en geometría/joints |
| ML | TF.js 1.3 + PoseNet | **TF.js 4.x + MoveNet (Lightning)** | PoseNet deprecado; MoveNet 3-4× más rápido |
| 3D | Babylon 4.0 | **Babylon.js 7.x** (ESM) | WebGPU, mejor tree-shaking |
| Estado | mutable `Joints` class | **Zustand 4** | Reactivo, mínimo, sin Context boilerplate |
| Estilos | CSS plano | **Tailwind 3 + shadcn/ui** | UI consistente sin reinventar |
| Iconos | — | **lucide-react** | Sin SVGs custom |
| i18n (P2) | — | `react-i18next` | Estándar |
| Test | — | **Vitest + Testing Library + Playwright** | Vite-native |
| Lint/format | eslint base | **Biome** o ESLint 9 + Prettier | Velocidad |

## 3. Comandos

```bash
# Dev
pnpm install
pnpm dev              # Vite dev server (puerto 5173)
pnpm build            # build prod a dist/
pnpm preview          # sirve build local

# Calidad
pnpm lint
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest run
pnpm test:watch
pnpm e2e              # playwright test
```

## 4. Estructura del proyecto

```
src/
  app/                  # bootstrap React, routing
    App.tsx
    main.tsx
  features/
    pose-detection/     # MoveNet wrapper, hooks
      useMoveNet.ts
      poseStore.ts      # Zustand
      types.ts
    avatar/             # Babylon scene, character switching
      AvatarCanvas.tsx
      sceneSetup.ts
      boneRig.ts
    game/               # game loop, scoring
      poseMatch/
        targetPoses.ts
        scoring.ts      # cosine similarity
        useGameLoop.ts
      GameRoot.tsx
    calibration/
      CalibrationScreen.tsx
    ui/                 # shadcn/ui shared
      Button.tsx
      Hud.tsx
  lib/
    math.ts             # angles, vectors, normalization
    fps.ts
    storage.ts          # localStorage wrapper
  styles/
    globals.css
  types/
    index.ts
public/
  scenes/               # .babylon files (mover desde Scenes/)
docs/
  PRD.md
  SPEC.md
  TASKS.md
tests/
  unit/
  e2e/
```

## 5. Code Style

```ts
// features/game/poseMatch/scoring.ts
import type { JointAngles, ScoreTier } from '@/types';

const TIER_THRESHOLDS = [
  { min: 0.95, tier: 'perfect' as const, points: 1000 },
  { min: 0.85, tier: 'great'   as const, points: 700  },
  { min: 0.70, tier: 'good'    as const, points: 400  },
] satisfies ReadonlyArray<{ min: number; tier: ScoreTier; points: number }>;

/** Cosine similarity between two normalized joint-angle vectors. */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('vector length mismatch');
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export function scorePose(target: JointAngles, actual: JointAngles) {
  const sim = cosineSimilarity(Object.values(target), Object.values(actual));
  const match = TIER_THRESHOLDS.find(t => sim >= t.min);
  return { similarity: sim, tier: match?.tier ?? 'miss', points: match?.points ?? 0 };
}
```

**Convenciones:**
- `camelCase` para variables/funciones, `PascalCase` para componentes/tipos.
- Componentes funcionales con hooks. Cero clases.
- Props con `interface`, uniones discriminadas para estados (`type GameState = 'idle' | 'playing' | 'finished'`).
- Path alias `@/*` → `src/*`.
- Imports ordenados: externos → `@/` → relativos.
- Sin `any` salvo en boundary con SDKs sin tipos (con `// eslint-disable-next-line` y comentario).

## 6. Arquitectura runtime

```
┌───────────────┐  poses   ┌──────────────┐  joint angles  ┌────────────┐
│  MoveNet hook │ ───────► │ poseStore    │ ─────────────► │ Avatar     │
│  (worker)     │          │ (Zustand)    │                │ (Babylon)  │
└───────────────┘          └──────┬───────┘                └────────────┘
                                  │
                                  ▼
                           ┌──────────────┐
                           │ Game loop    │ → HUD (score, timer, tier)
                           └──────────────┘
```

- **MoveNet en Web Worker** (TFJS Worker backend) → no bloquea el render del juego.
- **poseStore** mantiene la última pose normalizada + confianza.
- **Avatar** suscrito al store con selector estable (evita re-renders).
- **Game loop** corre en `requestAnimationFrame`, lee del store, no causa renders React (escribe a refs/HUD).

## 7. Estrategia de testing

| Capa | Framework | Cobertura objetivo |
|---|---|---|
| Utilidades puras (math, scoring) | **Vitest** | 100% líneas |
| Hooks (useMoveNet con mock) | Vitest + RTL | smoke tests |
| Componentes UI | RTL | render + interacciones críticas |
| Flujo end-to-end | **Playwright** + fake video stream | happy path: cargar → calibrar → 1 ronda → resultados |

Mocks: `getUserMedia` mockeado con canvas que dibuja siluetas, modelo MoveNet stub que retorna keypoints fijos.

## 8. Boundaries

**Always:**
- Correr `pnpm typecheck && pnpm test && pnpm lint` antes de merge.
- Lazy-load del modelo TF (no en bundle inicial).
- Mostrar progreso visible mientras cargan modelo y escena.
- Manejar denegación de webcam con UI clara.

**Ask first:**
- Añadir nuevas dependencias > 50 KB gzipped.
- Cambiar el modelo de ML.
- Tocar archivos `.babylon` o añadir personajes.
- Telemetría de cualquier tipo.

**Never:**
- Subir frames de video a un servidor.
- Usar `any` sin justificación documentada.
- Romper la build sin actualizar `TASKS.md`.
- Borrar `Scenes/` antiguos sin migrarlos a `public/scenes/`.

## 9. Plan de migración (alto nivel — detalle en TASKS.md)

| Fase | Entregable | Verificación |
|---|---|---|
| 0. Bootstrap | Vite + TS + React 18 + Tailwind, app vacía | `pnpm dev` muestra "Hello PoseArena" |
| 1. ML pipeline | MoveNet en worker, store de joints | demo overlay de keypoints sobre webcam |
| 2. Avatar | Babylon 7, escena con Dude reaccionando | avatar imita brazos como antes |
| 3. UI shell | Pantalla de bienvenida + calibración + HUD | flujo navegable sin juego |
| 4. Pose Match v1 | 10 rondas, scoring, resultados | jugable end-to-end |
| 5. Polish | Sonidos, animaciones, responsive, PWA | Lighthouse ≥ 90 en Performance/A11y |

## 10. Criterios de éxito (testables)

- [ ] Lighthouse Performance ≥ 85 (móvil simulado).
- [ ] FPS de detección ≥ 25 p50 en MacBook Air M1 / equivalente.
- [ ] Bundle inicial < 250 KB gzipped (modelo aparte).
- [ ] 0 warnings de React/TS en build.
- [ ] Playwright e2e "happy path" verde.
- [ ] Cobertura unitaria de `lib/` y `scoring.ts` ≥ 90%.
- [ ] Funciona en Chrome 120+, Firefox 120+, Safari 17+.

## 11. Preguntas abiertas

Mismas que [PRD.md §10](PRD.md). Bloquean el inicio de Phase 2 (Plan).
