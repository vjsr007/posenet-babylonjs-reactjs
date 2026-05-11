# MIGRATION — Legacy → PoseArena v1

## Estado inicial (snapshot)

- React 16.11 class components, CRA 3.2 (webpack 4)
- TF.js 1.3 + PoseNet (deprecated)
- Babylon.js 4 UMD
- `src/*.js` plano, sin tests, sin TS
- Bugs conocidos: `lefttHip` typo, `option = "dude"` hardcoded, loader display bug

## Estrategia: **Strangler Fig en paralelo**

1. **NO borrar** `src/*.js` ni `public/Scenes/` legacy.
2. Mover `src/*.js` → `legacy/` con `git mv` (preserva historia).
3. Crear `src/` nuevo TypeScript junto al legacy.
4. Vite carga el nuevo; CRA queda inservible (eliminamos `react-scripts` en T1.8).
5. Migrar assets `public/Scenes/` → `public/avatars/` con nombres normalizados.

## Pasos detallados

### Paso 1 — Snapshot
```bash
git checkout -b feat/v1-modernization
git tag legacy-snapshot
```

### Paso 2 — Mover legacy
```bash
mkdir legacy
git mv src legacy/src
git mv public legacy/public
```
> Dejamos `legacy/` accesible para portar lógica (cosine, joints) cuando se necesite.

### Paso 3 — Inicializar nuevo stack
- `package.json` nuevo (T1.1)
- `pnpm install`
- `pnpm dev` debe levantar Vite en blanco

### Paso 4 — Portar assets seleccionados
- Copiar `legacy/public/Scenes/Dude/` → `public/avatars/dude/`
- Copiar `legacy/public/Scenes/Vincent/` → `public/avatars/vincent/`
- **NO portar:** Mario, Sinon (IP); OldMan (licencia incierta) — pendiente verificación.

### Paso 5 — Reescribir feature por feature
- Pose detection (Fase 2)
- Avatar (Fase 3)
- Pose Match (Fase 4)

### Paso 6 — Cleanup final
- Cuando v1 esté en prod estable: `git rm -r legacy/` (en PR separado).
- Mantener tag `legacy-snapshot` para auditoría.

## Mapeo de archivos

| Legacy | Nuevo | Notas |
|---|---|---|
| `src/posenet.js` | `src/features/pose-detection/worker.ts` | MoveNet, no PoseNet |
| `src/graphics.js` | `src/features/avatar/scene.ts` + `apply-pose.ts` | Babylon 7 |
| `src/joints.js` | `src/features/avatar/bone-map.ts` | Inmutable, tipado |
| `src/tranform.js` | `src/lib/geometry.ts` | Funciones puras + tests; **fix typo `lefttHip`** |
| `src/userControl.js` | `src/features/calibration/` | Flujo T-pose |
| `src/App.js` | `src/app/App.tsx` | Hooks, routing |
| `src/demo_util.js` | `src/features/pose-detection/draw.ts` | Solo si overlay debug |
| `src/index.js` | `src/main.tsx` | Vite entry |
| `src/styles.css` + `src/index.css` | `src/styles/globals.css` | Tailwind |

## Bugs legacy a corregir al portar

1. `src/tranform.js:82-88` — `lefttHip` (sobra `t`). Corregir a `leftHip`.
2. `src/graphics.js:65` — `const option = "dude"` hardcoded. Aceptar parámetro.
3. `src/App.js:~70` — `display: !this.state.loading ? 'none' : 'none'` (siempre oculto). Cambiar a `loading ? 'block' : 'none'`.

## Riesgos de la migración

| Riesgo | Mitigación |
|---|---|
| Romper la demo legacy | Tag `legacy-snapshot`, no se borra hasta v1 estable |
| Pérdida de assets `.exr` IBL Sinon | Copiar selectivos a `public/textures/ibl/` si se reusan |
| Dependencias huérfanas | `pnpm dlx depcheck` antes de cleanup final |
| Confusión de paths | Solo Vite servirá; eliminar `react-scripts` y CRA scripts |

## Definition of Done — migración

- [ ] `pnpm dev` y `pnpm build` ok
- [ ] App nueva funcional con al menos 1 avatar y Pose Match jugable
- [ ] Cero referencias a `react-scripts`, `posenet`, `babylonjs@4` en `package.json`
- [ ] Tests pasan en CI
- [ ] `legacy/` aún presente, ignorado por build
