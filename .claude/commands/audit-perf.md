---
description: Audit performance of a file (re-renders + bundle)
---

Para el archivo **$ARGUMENTS**:

1. Invoca el subagente `rerender-auditor`.
2. Invoca el subagente `bundle-optimizer`.
3. Consolida hallazgos en una tabla: `[problema | severidad | fix propuesto]`.
4. Aplica fixes seguros automáticamente; lista los que requieren mi aprobación.
