# PLAN — PoseArena

> Plan ejecutivo de migración y desarrollo. Complementa `PRD.md` (qué) y `SPEC.md` (cómo técnico).

## Fases

### Fase 0 — Documentación y agentes (este commit)
- ✅ PRD, SPEC, AVATARS, GAMES, ARCHITECTURE, MIGRATION, PLAN, TASKS
- ✅ `.claude/` + `AGENTS.md` + `.github/copilot-instructions.md`
- ✅ Agentes de refactor con reglas Vercel
- ⛔ Sin tocar `src/*.js` legacy

### Fase 1 — Stack nuevo en paralelo
- `package.json` con pnpm + Vite + React 18 + TS 5.5
- Tailwind 3 + shadcn/ui + lucide
- Estructura `src/` nueva (TS) coexiste con `src/` legacy
- `vite.config.ts` con alias `@/*`
- Smoke test: `pnpm dev` levanta página vacía con Tailwind

### Fase 2 — Pose detection
- Worker MoveNet (TF.js 4.x) Lightning
- Store Zustand `usePoseStore`
- Componente debug que renderiza keypoints sobre `<video>`

### Fase 3 — Avatar
- Babylon 7 ESM, scene loader
- Registry de avatares (ver `AVATARS.md`)
- `<AvatarPicker />` con grilla
- Mapeo bones genérico Mixamo

### Fase 4 — Pose Match v1
- Máquina de estados XState o Zustand slice
- Scoring por similitud coseno (ya en SPEC)
- Screens: menu → calibración → countdown → ronda → resultado
- HUD con score, tiempo, racha

### Fase 5 — Tests + CI
- Vitest unit (scoring, registry, store)
- Playwright e2e con webcam mock
- GitHub Actions: lint + typecheck + test + build

### Fase 6 — Deploy + extras
- Vercel deploy preview por PR
- Lighthouse budget en CI
- Retirar avatares con licencia incierta antes de prod
- 9 juegos: roadmap en `GAMES.md`

## Criterios de "listo"

| Fase | Criterio | Métrica |
|---|---|---|
| 1 | `pnpm dev` y `pnpm build` ok | exit 0 |
| 2 | 30 fps de detección | FPS HUD |
| 3 | 5 avatares cargan sin errores | manual |
| 4 | Una ronda completa jugable | manual |
| 5 | CI verde, cobertura ≥ 60% scoring | vitest |
| 6 | Lighthouse ≥ 90 perf | CI |

## Riesgos clave y mitigación

- **WebGL en mobile bajo:** fallback a 2D canvas con stick figure.
- **Modelo TF lento en CPU:** WebGL backend + Lightning + 192px.
- **Bones inconsistentes:** validar cada avatar al añadirlo al registry.
- **Licencias:** ver checklist en `AVATARS.md` antes de cada release.
