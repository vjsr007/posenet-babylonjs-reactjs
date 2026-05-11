# TASKS — PoseArena

> Backlog ejecutable. Cada tarea es una unidad atómica de PR. Marca `[x]` cuando se mergee.

## Fase 1 — Bootstrap stack

- [ ] T1.1 — `package.json` reescrito (pnpm, scripts dev/build/test/lint/format/typecheck)
- [ ] T1.2 — `vite.config.ts` con alias, react plugin, build target ES2022
- [ ] T1.3 — `tsconfig.json` strict, `paths`, `noUncheckedIndexedAccess`
- [ ] T1.4 — `tailwind.config.ts` + `postcss.config.js` + `src/styles/globals.css`
- [ ] T1.5 — `index.html` raíz Vite + `src/main.tsx` + `src/app/App.tsx`
- [ ] T1.6 — `.gitignore` actualizado (dist, coverage, .turbo)
- [ ] T1.7 — Biome o ESLint 9 + Prettier
- [ ] T1.8 — Eliminar/archivar CRA: mover `src/*.js` a `legacy/` (NO borrar)
- [ ] T1.9 — README actualizado (cómo correr v1)

## Fase 2 — Pose detection

- [ ] T2.1 — `src/features/pose-detection/worker.ts` con MoveNet Lightning
- [ ] T2.2 — Hook `usePoseDetection(videoRef)` que arranca/para worker
- [ ] T2.3 — Store `usePoseStore` (Zustand) con `keypoints`, `confidence`, `fps`
- [ ] T2.4 — Componente `<PoseOverlay />` debug
- [ ] T2.5 — Calibración inicial (T-pose) y normalización por altura

## Fase 3 — Avatar

- [ ] T3.1 — `src/features/avatar/scene.ts` Babylon engine + scene + arc camera + light + IBL
- [ ] T3.2 — `loadAvatar(url)` async con `SceneLoader.ImportMeshAsync`
- [ ] T3.3 — `BoneMap` types + registry en `registry.ts` (14 avatares Tier 1+2)
- [ ] T3.4 — `applyPose(boneMap, keypoints)` rotaciones por joint
- [ ] T3.5 — `<AvatarPicker />` UI con thumbnails
- [ ] T3.6 — Validar 5 avatares en sandbox manualmente

## Fase 4 — Pose Match v1

- [ ] T4.1 — Asset target poses (10 siluetas iniciales, JSON con keypoints normalizados)
- [ ] T4.2 — Slice de juego en store: `phase`, `score`, `streak`, `currentTarget`
- [ ] T4.3 — `scorePose()` cosine similarity + tier (PERFECT/GREAT/GOOD/MISS)
- [ ] T4.4 — Pantallas: Menu, Calibration, Countdown, Round, Result
- [ ] T4.5 — HUD score/time/streak (sin re-render React, refs + DOM directo)
- [ ] T4.6 — Audio feedback (hit, miss, countdown)

## Fase 5 — Tests + CI

- [ ] T5.1 — `vitest.config.ts` + setup
- [ ] T5.2 — Tests unit: scoring, registry, normalización
- [ ] T5.3 — Playwright config + e2e smoke (carga app, click "Jugar")
- [ ] T5.4 — GitHub Actions `.github/workflows/ci.yml`
- [ ] T5.5 — Vercel deploy preview

## Fase 6 — Pulido + 9 juegos

- [ ] T6.1 — i18n (es/en) react-i18next
- [ ] T6.2 — Modo daltónico
- [ ] T6.3 — Persistencia local de high score (localStorage + zustand persist)
- [ ] T6.4 — Auditoría de licencias avatares pre-deploy público
- [ ] T6.5 — Implementar 2do juego (ver `GAMES.md`)

## Convenciones de PR

- Una tarea = un PR.
- Branch: `feat/T2.1-movenet-worker`, `fix/T4.5-hud-rerender`.
- Commit conventional: `feat(pose): add MoveNet worker (T2.1)`.
- Cada PR: lint + typecheck + test verde + screenshot si UI.
