---
description: Scaffold a new game module
---

Para el juego **$ARGUMENTS**:

1. Lee `docs/GAMES.md` y encuentra el diseño.
2. Crea `src/features/games/$ARGUMENTS/` con:
   - `index.ts` (export `GameModule`)
   - `state.ts` (Zustand slice)
   - `scoring.ts` (funciones puras)
   - `components/` con al menos `<GameScreen.tsx>` y `<GameHUD.tsx>`
   - `README.md` con reglas y controles
   - `__tests__/scoring.test.ts`
3. Registra el juego en `src/features/games/registry.ts`.
4. Añade tarea correspondiente a `docs/TASKS.md` § Fase 6.
