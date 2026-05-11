# Avatar Catalog — PoseArena

> Catálogo de 30+ avatares humanoides para usar como personajes jugables. Todos rigeados (skeleton) y compatibles con Babylon.js 7 (formato `.babylon`, `.glb` o `.gltf`).

## Cómo se usa este documento

1. Cada avatar tiene: **fuente, URL, licencia, formato, # bones, índices del rig (head, shoulders, elbows, hips, knees, ankles), notas de escala/posición**.
2. Los avatares marcados ⭐ son **prioritarios para v1**: ya rigeados, licencia permisiva, malla limpia.
3. Para integrar uno nuevo: descargar a `public/avatars/<nombre>/`, añadir entrada en `src/features/avatar/registry.ts`, mapear bones según la tabla.
4. **Nunca** hardcodear índices de bones en lógica de juego — siempre vía `registry`.

## Convención de mapeo de bones

PoseArena necesita estos joints mapeados a bones del esqueleto:

```ts
type BoneMap = {
  head: number;
  rightShoulder: number;
  rightArm: number;       // upper arm / elbow joint
  rightForeArm: number;
  rightHand: number;
  leftShoulder: number;
  leftArm: number;
  leftForeArm: number;
  leftHand: number;
  hips: number;
  rightUpLeg: number;     // hip
  rightLeg: number;       // knee
  rightFoot: number;
  leftUpLeg: number;
  leftLeg: number;
  leftFoot: number;
  spine?: number;
};
```

Para descubrir índices: cargar el `.glb` en https://sandbox.babylonjs.com y abrir el inspector → Skeleton.

---

## ⭐ Tier 1 — Listos para v1 (CC0/MIT, rig estándar humano)

### 1. ⭐ Dude *(existente)*
- **Fuente:** Babylon.js Assets (legacy)
- **Local:** `public/Scenes/Dude/Dude.babylon`
- **Licencia:** Apache 2.0 (Babylon.js Assets)
- **Bones:** ~57 (Mixamo-like). Mapeo actual ya en `graphics.js`.
- **Notas:** Mapeo legacy inexacto; revisar caderas.

### 2. ⭐ HVGirl
- **Fuente:** Babylon.js Assets
- **URL:** `https://assets.babylonjs.com/meshes/HVGirl.glb`
- **Licencia:** Apache 2.0
- **Formato:** `.glb` (low-poly animado)
- **Notas:** Rig humanoide, escala small (~1u). Buen avatar de demo.

### 3. ⭐ Xbot (Mixamo)
- **Fuente:** Babylon.js Assets (Mixamo X Bot)
- **URL:** `https://assets.babylonjs.com/meshes/Xbot.glb`
- **Licencia:** Mixamo (gratuita para uso comercial)
- **Bones:** Mixamo standard rig (~65 bones). `mixamorig:Hips` raíz.
- **Notas:** **El mejor pick para v1.** Rig estándar Mixamo perfectamente etiquetado.

### 4. ⭐ Mannequin (dummy3)
- **Fuente:** Babylon.js Assets
- **URL:** `https://assets.babylonjs.com/meshes/dummy3.babylon`
- **Licencia:** Apache 2.0
- **Notas:** Maniquí gris ideal para debug del rig.

### 5. ⭐ Mannequin (dummy2)
- **URL:** `https://assets.babylonjs.com/meshes/dummy2.babylon`
- **Licencia:** Apache 2.0
- **Notas:** Variante alternativa del maniquí.

### 6. ⭐ Yeti (small)
- **URL:** `https://assets.babylonjs.com/meshes/YetiSmall.glb`
- **Licencia:** Apache 2.0
- **Notas:** Personaje cómico, rig humanoide.

### 7. ⭐ Yeti (full)
- **Fuente:** `https://github.com/BabylonJS/Assets/tree/master/meshes/Yeti`
- **Licencia:** Apache 2.0

### 8. ⭐ Alien
- **URL:** `https://assets.babylonjs.com/meshes/alien.glb`
- **Licencia:** Apache 2.0
- **Notas:** Bonus: incluye `alien.bvh` con animaciones.

### 9. ⭐ Elf
- **Fuente:** `https://github.com/BabylonJS/Assets/tree/master/meshes/Elf`
- **Licencia:** Apache 2.0

### 10. ⭐ Mario *(existente)*
- **Local:** `public/Scenes/Mario/mario.babylon`
- **Licencia:** ⚠️ **Nintendo IP — solo uso local/educativo. NO desplegar público.**
- **Acción:** quitar de la lista pública en producción.

### 11. ⭐ Vincent *(existente)*
- **Local:** `public/Scenes/Vincent/Vincent.babylon`
- **Licencia:** Blender Foundation (CC-BY)

### 12. ⭐ OldMan *(existente)*
- **Local:** `public/Scenes/OldMan/oldman.babylon`
- **Licencia:** desconocida — verificar antes de producción.

### 13. ⭐ Sinon *(existente)*
- **Local:** `public/Scenes/Sinon/Sinon.babylon`
- **Licencia:** ⚠️ posible IP de Sword Art Online — **solo demo local**.

---

## Tier 2 — Khronos glTF Sample Assets (CC0)

Repositorio: https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models

### 14. CesiumMan
- **URL:** `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMan/glTF-Binary/CesiumMan.glb`
- **Licencia:** CC-BY 4.0
- **Notas:** Animación de caminar incluida. Rig simple (~19 bones).

### 15. RiggedFigure
- **URL:** `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/RiggedFigure/glTF-Binary/RiggedFigure.glb`
- **Licencia:** CC-BY 4.0
- **Notas:** Figura de prueba con rig humanoide básico.

### 16. RiggedSimple
- **URL:** `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/RiggedSimple/glTF-Binary/RiggedSimple.glb`
- **Licencia:** CC-BY 4.0
- **Notas:** Solo brazo — útil solo para debug, no juego completo.

### 17. BrainStem
- **URL:** `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BrainStem/glTF-Binary/BrainStem.glb`
- **Licencia:** CC-BY 4.0

### 18. Fox
- **URL:** `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Fox/glTF-Binary/Fox.glb`
- **Licencia:** CC0
- **Notas:** Cuadrúpedo — usar como mascota/visual, no como avatar de pose.

---

## Tier 3 — Quaternius (CC0, ideal para variedad masiva)

**Pack completo:** https://quaternius.com/packs/ultimatemodularcharacters.html  
**Licencia:** CC0 — uso libre comercial sin atribución.  
Cada uno descargable en `.glb`. **Rig idéntico entre todos** (Mixamo-style) → mapeo único.

### 19. Quaternius — Adventurer
### 20. Quaternius — Knight
### 21. Quaternius — Mage
### 22. Quaternius — Rogue
### 23. Quaternius — Barbarian
### 24. Quaternius — Witch
### 25. Quaternius — King
### 26. Quaternius — Engineer

> **Acción:** descargar el ZIP del pack, copiar 8 personajes a `public/avatars/quaternius/`. Como comparten rig, basta un `BoneMap` para todos.

---

## Tier 4 — three.js / comunidad (Mixamo-rigged)

Estos son convertibles directamente a Babylon (`.glb` → `SceneLoader.ImportMeshAsync`).

### 27. Soldier (three.js examples)
- **URL:** `https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb`
- **Licencia:** CC-BY (creative commons)
- **Notas:** Rig Mixamo, 3 animaciones (idle/walk/run).

### 28. RobotExpressive
- **URL:** `https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/RobotExpressive.glb`
- **Licencia:** CC0 (Tomás Laulhé / Don McCurdy modificado)
- **Notas:** Robot estilizado con expresiones faciales y animaciones.

### 29. Michelle (Mixamo via three.js)
- **URL:** `https://threejs.org/examples/models/gltf/Michelle.glb`
- **Licencia:** Mixamo (gratuita)
- **Notas:** Personaje femenino con animación de baile.

### 30. Stormtrooper (three.js examples)
- **URL:** `https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Stormtrooper/stormtrooper.glb`
- **Licencia:** CC-BY 4.0 (no uso comercial Disney)
- **Notas:** ⚠️ Solo para demo local.

---

## Tier 5 — Personalizables y avanzados

### 31. Ready Player Me
- **URL:** https://readyplayer.me/ → cada usuario genera su avatar y obtiene un URL `.glb`
- **Licencia:** ToS de RPM (uso permitido en apps).
- **Integración:** input de URL en el menú → cargar dinámicamente. **Killer feature** para v2.

### 32. VRoid Hub
- **URL:** https://hub.vroid.com (formato `.vrm`)
- **Notas:** Requiere conversor `.vrm` → `.glb` (e.g. `@pixiv/three-vrm` adaptado).

### 33. Mixamo (catálogo gigante)
- **URL:** https://www.mixamo.com (login gratis con Adobe)
- **Notas:** ~100 personajes + miles de animaciones. Bajar como `.fbx` → convertir a `.glb` con Blender o `FBX2glTF`.

### 34. Sketchfab CC0 humanos
- **URL:** https://sketchfab.com/3d-models?features=downloadable&licenses=322a749bcfa841b29dff1e8a1bb74b0b&q=character+rigged
- **Notas:** Filtrar por CC0 + downloadable + rigged.

---

## Resumen — qué cargar primero

| Prioridad | Avatar | Por qué |
|---|---|---|
| 1 | **Xbot** | Rig Mixamo limpio, Apache 2.0, ya en CDN Babylon |
| 2 | **HVGirl** | Animado, contraste visual con Xbot |
| 3 | **Quaternius pack (8 personajes)** | CC0, gran variedad, mismo rig |
| 4 | **CesiumMan** | Estándar glTF, validar que el pipeline funciona con Khronos assets |
| 5 | **Dude (existente)** | Compatibilidad con código legacy |
| 6 | **Ready Player Me** | UGC para v2 — diferenciador |

**Total inmediato realizable:** ~14 avatares CC0/Apache (suficiente para grilla de selección).  
**Total potencial con Mixamo + Sketchfab + RPM:** ilimitado.

---

## Acciones para el agente de implementación

- [ ] Crear `public/avatars/` con subcarpetas por avatar.
- [ ] Crear `src/features/avatar/registry.ts` con la lista tipada.
- [ ] Componente `<AvatarPicker />` que consume el registry y muestra grilla con thumbnail.
- [ ] Worker o lazy import: cargar `.glb` solo cuando el usuario lo selecciona.
- [ ] Para cada avatar Tier 1: validar `BoneMap` cargando en https://sandbox.babylonjs.com.
- [ ] **Antes de desplegar público:** quitar Mario, Sinon, Stormtrooper, OldMan (IP/licencia incierta).
