# PRD — PoseArena (working title)

> Web app que convierte a la persona frente a la webcam en el controlador de un juego basado en poses corporales, usando ML en el navegador.

## 1. Visión

Pasar de un *demo técnico* (avatar 3D que copia tus movimientos) a un **juego jugable, divertido y compartible** que demuestre el potencial de TF.js + Babylon.js sin requerir hardware especial (solo webcam).

## 2. Usuarios objetivo

| Persona | Necesidad | Métrica de éxito |
|---|---|---|
| **Jugador casual** | Diversión rápida sin instalar nada | ≥ 3 partidas / sesión |
| **Educador / streamer** | Demo llamativa y compartible | Comparte URL / clip |
| **Desarrollador curioso** | Código de referencia moderno | Stars / forks, claridad del repo |

## 3. Problema

El proyecto actual (3d-posenet) demuestra la tecnología pero:
- No tiene loop de juego — solo refleja movimientos.
- UI técnica de depuración (inputs `readOnly` con valores crudos).
- Stack desactualizado (React 16, PoseNet deprecado, CRA).
- Sin onboarding, calibración guiada ni feedback de error.

## 4. Propuesta — v1: "Pose Match"

Un modo de juego **single-player** estilo *Hole in the Wall*:

1. Calibración inicial guiada (10 s, valida visibilidad de joints clave).
2. Aparece una **pose objetivo** (silueta o avatar pequeño) durante un countdown.
3. El jugador tiene **3 segundos** para imitarla.
4. Se calcula **similitud coseno** entre vectores normalizados de ángulos articulares.
5. Score: `Perfect (≥95%) / Great (≥85%) / Good (≥70%) / Miss`.
6. **10 rondas** por partida. Ranking local (localStorage). Botón "Compartir".

### Modos futuros (v2+)
- Endless mode con dificultad incremental.
- Daily challenge (seed compartido).
- Editor de poses (crear y compartir desafíos).
- Multijugador WebRTC.

## 5. Requisitos funcionales (v1)

| ID | Requisito | Prioridad |
|---|---|---|
| FR-01 | Detectar pose en tiempo real ≥ 20 FPS en laptop media | P0 |
| FR-02 | Pantalla de bienvenida + permiso de webcam con fallback claro | P0 |
| FR-03 | Calibración guiada antes de jugar | P0 |
| FR-04 | Modo "Pose Match" con 10 rondas, scoring y resultados | P0 |
| FR-05 | Avatar 3D opcional (toggle on/off para performance) | P1 |
| FR-06 | Selector de personaje (Dude / Mario / Vincent / Sinon) | P1 |
| FR-07 | Persistencia de high-scores en localStorage | P1 |
| FR-08 | Soporte teclado como fallback de accesibilidad | P2 |
| FR-09 | i18n ES/EN | P2 |
| FR-10 | PWA instalable | P2 |

## 6. Requisitos no funcionales

- **Performance**: TTI < 3 s en 4G; loop de juego ≥ 30 FPS estable.
- **Privacidad**: 100% en cliente, sin telemetría de video. Banner explícito.
- **Accesibilidad**: WCAG AA en pantallas no-juego; alternativa de teclado para el juego.
- **Compatibilidad**: Chrome/Edge/Firefox últimas 2 versiones. Safari 16+ best-effort.
- **Bundle**: < 800 KB gzipped (excluye modelo TF, que se carga lazy).

## 7. Métricas de éxito (post-launch)

- ≥ 60% de visitantes completan al menos 1 partida.
- p50 FPS de detección ≥ 25 en hardware promedio.
- 0 errores no controlados en consola en sesión típica.

## 8. Fuera de alcance (v1)

- Backend / cuentas / login.
- Multijugador online.
- Mobile portrait (solo desktop / tablet landscape).
- Detección multi-persona simultánea.

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| MoveNet imprecisa con baja luz | Pantalla de calibración valida confianza mínima de joints |
| Mareo / fatiga del jugador | Rondas cortas, break automático tras 10 |
| Webcam denegada | Pantalla explicativa con instrucciones por navegador |
| Performance baja → jugador frustrado | Detectar FPS y ofrecer "modo low" (sin avatar 3D) |

## 10. Preguntas abiertas

1. ¿Confirmas el modo "Pose Match" como v1, o prefieres otra idea de las propuestas?
2. ¿Idioma: solo ES, solo EN, o bilingüe desde el inicio?
3. ¿Publicar en GitHub Pages / Vercel / Netlify?
4. ¿Conservar el repo actual y migrar in-place, o crear `v2/` paralelo?
5. ¿Aceptas migración completa de stack (React 18 + Vite + TS + Tailwind + Zustand) o prefieres incremental sobre CRA?
