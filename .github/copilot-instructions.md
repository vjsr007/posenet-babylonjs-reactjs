# Copilot Instructions — PoseArena

> Lee `AGENTS.md` (raíz) primero. Este archivo solo añade convenciones específicas de Copilot/VS Code.

## Stack

Vite 5 · React 18 · TypeScript 5 · Tailwind 3 · Zustand 4 · Babylon.js 7 · TF.js 4 (MoveNet) · Vitest · Playwright · pnpm.

## Reglas críticas

- **pnpm únicamente.** Si propones `npm install` o `yarn add`, estás mal.
- **TypeScript estricto.** Ningún `any` implícito. Usa `unknown` y narrow.
- **No re-renders en game loop.** Hot path = `requestAnimationFrame` + refs + DOM imperativo. React solo en cambios de fase.
- **Workers para CPU pesado.** TF.js inference va en worker, no main thread.
- **Funciones puras separadas.** Scoring, geometría → `src/lib/`, sin DOM, testeables.
- **No hardcodees bones.** Usa `BoneMap` del registry de avatares.
- **Composición sobre configuración.** Componentes pequeños y enfocados.
- **Idioma UI:** español (claves i18n en `src/i18n/es.json`).

## Convenciones de archivos

- React components: `PascalCase.tsx`.
- Hooks: `useThing.ts`.
- Stores Zustand: `useThingStore.ts`.
- Funciones puras: `kebab-case.ts`.
- Tests: `*.test.ts(x)` colocados junto al fuente o en `__tests__/`.
- Tipos compartidos: `src/types/`.

## Imports

- Path alias `@/*` → `src/*`. Usar siempre alias para imports cross-feature.
- Babylon: import específico (`@babylonjs/core/Cameras/arcRotateCamera`), nunca el barrel `@babylonjs/core` completo.
- TF.js: `@tensorflow/tfjs` + `@tensorflow-models/pose-detection`, backend webgl.

## Commits

Convencionales: `feat(pose): ...`, `fix(avatar): ...`, `chore: ...`, `docs: ...`, `test: ...`.
Referencia tarea: `feat(game): pose-match scoring (T4.3)`.

## Pre-PR checklist

```
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

## Anti-patrones que rechazo automáticamente

- `useEffect` con setState que dispara loop.
- `useState` para datos que solo se leen en rAF (usar `useRef`).
- Componente que importa `@babylonjs/core` completo (3MB).
- Llamar a `tf.loadModel()` fuera de un worker.
- CSS en archivos `.css` cuando Tailwind alcanza.
- `console.log` en código mergeado.

## Cómo trabajar conmigo

1. Antes de escribir código nuevo, valida si existe en `src/lib/` o `src/features/`.
2. Si la tarea es ambigua, pregunta UNA vez con opciones; luego procede.
3. Tras editar, corre typecheck mentalmente y reporta errores antes de que los vea.
4. Para refactors grandes, propón el diff en bullets antes de aplicar.
