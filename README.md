# PoseArena

> Minijuegos web controlados por la pose de tu cuerpo. Vite + React 18 + Babylon.js 7 + TF.js MoveNet.

**Estado:** v1 en desarrollo · juego inicial *Pose Match* · 9 juegos planeados (ver [`docs/GAMES.md`](docs/GAMES.md)).

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

## Scripts

| Script | Descripción |
|---|---|
| `pnpm dev` | servidor Vite con HMR |
| `pnpm build` | typecheck + build producción |
| `pnpm preview` | preview del build |
| `pnpm test` | unit tests Vitest watch |
| `pnpm test:run` | unit tests CI |
| `pnpm test:e2e` | Playwright |
| `pnpm lint` | Biome lint |
| `pnpm typecheck` | tsc --noEmit |

## Stack

- **Build:** Vite 5 + TypeScript 5.6 estricto
- **UI:** React 18.3 (hooks) + Tailwind 3 + lucide-react
- **Estado:** Zustand 4
- **3D:** Babylon.js 7 (imports específicos, no barrel)
- **Pose:** TF.js 4 + MoveNet Lightning en Web Worker
- **Tests:** Vitest + Playwright + Testing Library
- **Lint/format:** Biome
- **Package manager:** pnpm únicamente

## Documentación

- [`docs/PRD.md`](docs/PRD.md) — requisitos producto
- [`docs/SPEC.md`](docs/SPEC.md) — especificación técnica
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — diagrama + ADRs
- [`docs/PLAN.md`](docs/PLAN.md) — plan de fases
- [`docs/TASKS.md`](docs/TASKS.md) — backlog atómico
- [`docs/GAMES.md`](docs/GAMES.md) — los 9 juegos
- [`docs/AVATARS.md`](docs/AVATARS.md) — catálogo + licencias
- [`docs/MIGRATION.md`](docs/MIGRATION.md) — Strangler Fig desde código legacy

## Para agentes

- [`AGENTS.md`](AGENTS.md) — entry point compartido
- [`.claude/CLAUDE.md`](.claude/CLAUDE.md) — Claude Code
- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — Copilot

## Código legado

El código original (CRA + React 16 + PoseNet) está preservado en [`legacy/`](legacy/) durante la migración. No editarlo. Bugs catalogados en [`docs/MIGRATION.md`](docs/MIGRATION.md).

## Licencia

Código del proyecto: MIT. Avatares: licencias variadas — ver [`docs/AVATARS.md`](docs/AVATARS.md). Algunos modelos del repo legacy (Mario, Sinon, Stormtrooper) NO se incluyen en builds públicos.
