# CLAUDE.md — PoseArena (Claude Code)

> Punto de entrada para sesiones de Claude Code. Ver también `AGENTS.md` (compartido con todos los agentes).

## TL;DR

- Lee `AGENTS.md` y `docs/SPEC.md` antes de tocar código.
- Stack: Vite + React 18 + TS + Tailwind + Zustand + Babylon 7 + TF.js MoveNet.
- pnpm únicamente.
- Idioma: español.

## Subagentes disponibles

Definidos en `.claude/agents/`:

- **`react-perf-refactor`** — auditar y reescribir componentes React aplicando reglas Vercel (memoización, server/client split, evitar re-renders).
- **`bundle-optimizer`** — analizar bundle, lazy load, tree-shake, code-split rutas.
- **`rerender-auditor`** — detectar y arreglar re-renders innecesarios; usar refs en hot paths.
- **`babylon-scene-architect`** — escenas Babylon 7 idiomáticas, IBL, performance, ESM imports correctos.
- **`pose-pipeline`** — TF.js MoveNet en worker, normalización de keypoints, calibración.
- **`game-designer`** — diseñar mecánicas para los 9 juegos en `GAMES.md`.

Invoca con: *"Use the `react-perf-refactor` subagent on `src/features/avatar/AvatarPicker.tsx`"*.

## Slash commands

Definidos en `.claude/commands/`:

- `/plan-task <id>` — abre `docs/TASKS.md`, busca la tarea, propone plan.
- `/audit-perf <file>` — invoca `rerender-auditor` y `bundle-optimizer`.
- `/new-game <name>` — scaffold completo de un juego nuevo.
- `/new-avatar <url>` — añade avatar al registry (con verificación de licencia).

## Settings de permisos

Ver `.claude/settings.json`. Auto-aprueba:
- read/write en `src/`, `docs/`, `tests/`, `public/avatars/`
- bash: `pnpm *`, `git status`, `git diff`, `git log`

Pide confirmación para:
- borrar archivos
- `git push`, `git reset --hard`
- modificar `package.json` deps
- tocar `legacy/`

## Estilo de respuesta

- **Conciso.** Bullets, no prosa larga.
- Tras editar archivos, resume en 1-2 líneas qué cambió.
- Reporta si rompiste tests o tipos; no los ocultes.
- Si una tarea sale del scope, lista lo que NO hiciste y por qué.

## Memory bank

- Memoria de sesión: notas en `.claude/memory/session-notes.md` (gitignored).
- Hallazgos persistentes que debe saber el siguiente agente: añadir a `docs/ARCHITECTURE.md` § ADRs.
