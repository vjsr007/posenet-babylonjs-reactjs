---
description: Add a new avatar to the registry from a URL
---

Avatar URL: **$ARGUMENTS**

1. **Verifica licencia** del origen. Si no es CC0/Apache 2.0/CC-BY, **detente y pregúntame**.
2. Descarga (o referencia por URL) el modelo a `public/avatars/<id>/`.
3. Indica al usuario que valide bones en https://sandbox.babylonjs.com y te dé los índices.
4. Añade entrada a `src/features/avatar/registry.ts` con tipo `BoneMap`.
5. Actualiza `docs/AVATARS.md` con nueva fila (nombre, fuente, licencia, formato, notas).
