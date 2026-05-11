# AGENTS.md — PoseArena

> Contexto compartido para todos los agentes de IA (Claude Code, GitHub Copilot, Cursor, etc.).

## Proyecto

**PoseArena** — colección de minijuegos web controlados por la pose corporal del jugador vía webcam. Sucesor modernizado de un experimento React+PoseNet+Babylon.js.

- Stack: **Vite 5 + React 18 + TypeScript 5 + Tailwind 3 + Zustand + TF.js MoveNet + Babylon.js 7**.
- Package manager: **pnpm** (no npm/yarn).
- Target: navegadores evergreen, mobile incluido.
- Idioma de UI por defecto: **español** (i18n con react-i18next, en P2).
- Idioma de comunicación con el usuario: **español**.

## Documentación de referencia (leer en este orden)

1. `docs/PRD.md` — qué construimos y por qué.
2. `docs/SPEC.md` — cómo (técnico, código de referencia).
3. `docs/ARCHITECTURE.md` — diagrama, capas, ADRs.
4. `docs/PLAN.md` — fases.
5. `docs/TASKS.md` — backlog atómico.
6. `docs/GAMES.md` — los 9 juegos planeados.
7. `docs/AVATARS.md` — catálogo de 34 avatares + licencias.
8. `docs/MIGRATION.md` — estrategia legacy → v1.

## Reglas duras (NUNCA romper)

- **NUNCA** borres `legacy/` ni `public/Scenes/` sin confirmación explícita.
- **NUNCA** uses `npm`/`yarn` — solo `pnpm`.
- **NUNCA** subas avatares con licencia incierta a producción (Mario, Sinon, Stormtrooper, OldMan).
- **NUNCA** envíes frames de webcam a un servidor.
- **NUNCA** uses `any` implícito en TS. Usa `unknown` y narrow.
- **NUNCA** hardcodees índices de bones; usa `BoneMap` del registry.
- **NUNCA** introduzcas re-renders de React en el hot path del game loop. Usa refs.

## Reglas blandas (preferir)

- Funciones puras para scoring/geometry → en `src/lib/`.
- Componentes React enfocados; composición sobre configuración.
- Workers para CPU pesado (TF inference, parsing grande).
- Tailwind utility classes sobre CSS custom.
- shadcn/ui para primitivas (button, dialog, slider).
- `lucide-react` para iconos.
- Tests con Vitest; e2e con Playwright.
- Commits convencionales: `feat(scope): ...`, `fix(scope): ...`, `chore: ...`.

## Comandos clave

```bash
pnpm install           # instalar
pnpm dev               # Vite dev server
pnpm build             # producción
pnpm preview           # servir build
pnpm test              # vitest
pnpm test:e2e          # playwright
pnpm lint              # biome o eslint
pnpm format            # prettier/biome write
pnpm typecheck         # tsc --noEmit
```

## Estructura

Ver `docs/ARCHITECTURE.md` § Capas.

## Cómo añadir un avatar

1. Validar licencia (CC0 / Apache 2.0 / CC-BY preferidos).
2. Descargar a `public/avatars/<id>/`.
3. Cargar en https://sandbox.babylonjs.com → inspector → anotar índices de bones.
4. Añadir entrada en `src/features/avatar/registry.ts` con `BoneMap`.
5. Añadir thumbnail PNG 256×256 en la misma carpeta.

## Cómo añadir un juego

Ver `docs/GAMES.md` § Estructura de cada juego.

## Cuándo preguntar al usuario

- Decisiones de licencia/legal sobre nuevos assets.
- Cambios al stack base (cambiar Vite por X, etc.).
- Borrar `legacy/`.
- Deploy a producción.

## Cuándo NO preguntar (proceder)

- Bugfixes evidentes (typos, lógica obvia rota).
- Refactor interno de un feature sin cambiar API.
- Añadir tests.
- Mejoras de tipos.
- Optimizaciones de bundle/perf.
