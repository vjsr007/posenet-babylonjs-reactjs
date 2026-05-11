# GAMES — Catálogo de modos

> 9 juegos diseñados sobre el mismo motor (MoveNet → poseStore → Avatar/HUD). Todos single-player, webcam, 1 minuto por ronda.

## Filosofía común

- **Input:** pose 2D normalizada (17 keypoints MoveNet).
- **Salida:** score, racha, tiempo, vida, monedas según juego.
- **Ningún juego requiere ML extra** — solo lógica sobre keypoints.

---

## #1 — Pose Match (v1) ⭐

**Inspiración:** Hole in the Wall (TV show).
- Aparece silueta target → jugador imita en X segundos.
- Score = similitud coseno × bonus tiempo.
- Niveles: 30 poses, dificultad creciente.
- **MVP:** sí. Detallado en `PRD.md` y `SPEC.md`.

## #2 — Just Move (rítmico)

**Inspiración:** Just Dance.
- Pista musical → secuencia de poses sincronizadas con BPM.
- "Move" cada compás; combo si encadenas.
- Requiere: librería de coreografías JSON, `Web Audio API`.

## #3 — Squat Survivor

**Inspiración:** Vampire Survivors + ejercicio.
- Cámara cenital del avatar; enemigos se acercan.
- Cada **squat** dispara un proyectil; **jumping jacks** = bomba.
- Métrica: enemigos derrotados, calorías estimadas.

## #4 — Yoga Flow

- Sucesión de asanas; jugador mantiene la pose **N segundos**.
- Score = % de tiempo dentro del threshold.
- Modo zen: sin tiempo, feedback de respiración.

## #5 — Shadow Boxer

- Aparecen guantes flotantes (rojo/azul) en posiciones 3D.
- Golpear con la mano correcta → puntos.
- Detecta: velocidad de muñecas + posición.
- Requiere: tracking de velocidad (delta frames).

## #6 — Avoid the Lasers

- Líneas de láser cruzan la pantalla a alturas variables.
- Jugador agacha/salta/se ladea para evitarlas.
- Detecta: altura de cabeza, hombros, posición lateral.

## #7 — Conduct an Orchestra

- Brazos = batuta; movimientos amplios suben volumen, rápidos suben tempo.
- Sin "ganar/perder" — modo creativo.
- Output: música procedural (Tone.js).

## #8 — Statue Game (Red Light Green Light)

**Inspiración:** Squid Game / juego infantil.
- Música suena → mueve. Música para → quédate quieto.
- Detecta: magnitud de movimiento entre frames.
- 3 fallos = pierdes.

## #9 — Pose Painter

- Cada keypoint deja un trazo en un canvas.
- Objetivo: replicar dibujos famosos con tu cuerpo.
- Modo libre: arte generativo + export PNG.

---

## Roadmap de implementación

| Orden | Juego | Razón |
|---|---|---|
| 1 | Pose Match | Prueba todo el pipeline |
| 2 | Statue Game | Reutiliza solo "delta movement" — simple |
| 3 | Yoga Flow | Reutiliza scoring de Pose Match |
| 4 | Squat Survivor | Primera mecánica con física + spawning |
| 5 | Shadow Boxer | Tracking de velocidad |
| 6 | Just Move | Audio sync, más complejo |
| 7 | Avoid the Lasers | Colisiones 2D |
| 8 | Conduct | Audio procedural |
| 9 | Pose Painter | Canvas trails + export |

## Estructura de cada juego

```
src/features/games/<game-id>/
  index.ts          // export default GameModule
  state.ts          // slice zustand
  scoring.ts        // funciones puras
  components/       // UI específica
  assets/           // poses target, audio
  README.md         // reglas, controles, debug
```

Cada juego implementa la interfaz:

```ts
interface GameModule {
  id: string;
  name: string;
  init(ctx: GameContext): void;
  tick(dt: number, pose: Pose): void;
  render(): JSX.Element;
  cleanup(): void;
}
```
