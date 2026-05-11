# Game: Pose Match (v1)

**One-liner:** Imita la pose objetivo en pantalla durante una ventana de tiempo.

## Mecánica

1. Calibración inicial T-pose (3s).
2. 5 rondas de 4–5s cada una.
3. Mostrar pose objetivo (silueta SVG) + cámara con keypoints opcionales.
4. Cada frame: calcular `cosineSimilarity` entre pose normalizada del jugador y objetivo.
5. Mejor similitud de la ronda → tier (PERFECT/GREAT/GOOD/MISS) → puntos.
6. Pantalla de resultado con score total.

## Scoring (ver `src/lib/scoring.ts`)

- PERFECT (≥0.95): 1000 pts
- GREAT (≥0.85): 700 pts
- GOOD (≥0.70): 400 pts
- MISS: 0 pts

## Roadmap v1.x

- [ ] Curva de dificultad (ronda 1 con threshold relajado)
- [ ] Música + ticks de tiempo
- [ ] Avatar 3D imitando al jugador en panel lateral
- [ ] Bonus por mantener la pose (frame promedio > X)
- [ ] Captura de poses propias desde herramienta dev
