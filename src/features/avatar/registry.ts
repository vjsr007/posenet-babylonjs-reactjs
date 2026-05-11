import type { AvatarDescriptor } from "@/types/avatar";

/**
 * Registry de avatares.
 *
 * Cada entrada referencia un modelo descargable. `boneMap` debe validarse
 * cargando el archivo en https://sandbox.babylonjs.com → inspector → Skeleton.
 *
 * NUNCA marcar `publicSafe: true` sin verificar licencia.
 * Ver `docs/AVATARS.md` para el catálogo completo.
 */
export const AVATAR_REGISTRY: AvatarDescriptor[] = [
  {
    id: "xbot",
    name: "X-Bot (Mixamo)",
    url: "https://assets.babylonjs.com/meshes/Xbot.glb",
    format: "glb",
    license: "Mixamo (uso libre comercial)",
    author: "Mixamo / Adobe",
    publicSafe: true,
  },
  {
    id: "hvgirl",
    name: "HVGirl",
    url: "https://assets.babylonjs.com/meshes/HVGirl.glb",
    format: "glb",
    license: "Apache-2.0",
    author: "BabylonJS",
    publicSafe: true,
  },
  {
    id: "yeti-small",
    name: "Yeti (small)",
    url: "https://assets.babylonjs.com/meshes/YetiSmall.glb",
    format: "glb",
    license: "Apache-2.0",
    author: "BabylonJS",
    publicSafe: true,
  },
  {
    id: "alien",
    name: "Alien",
    url: "https://assets.babylonjs.com/meshes/alien.glb",
    format: "glb",
    license: "Apache-2.0",
    author: "BabylonJS",
    publicSafe: true,
  },
  {
    id: "dummy3",
    name: "Mannequin",
    url: "https://assets.babylonjs.com/meshes/dummy3.babylon",
    format: "babylon",
    license: "Apache-2.0",
    author: "BabylonJS",
    publicSafe: true,
  },
  {
    id: "cesium-man",
    name: "Cesium Man",
    url: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMan/glTF-Binary/CesiumMan.glb",
    format: "glb",
    license: "CC-BY-4.0",
    author: "Cesium",
    publicSafe: true,
  },
  {
    id: "soldier",
    name: "Soldier",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb",
    format: "glb",
    license: "CC-BY-4.0",
    author: "three.js",
    publicSafe: true,
  },
  {
    id: "robot-expressive",
    name: "Robot Expressive",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/RobotExpressive/RobotExpressive.glb",
    format: "glb",
    license: "CC0",
    author: "Tomás Laulhé",
    publicSafe: true,
  },
];

export function findAvatar(id: string): AvatarDescriptor | undefined {
  return AVATAR_REGISTRY.find((a) => a.id === id);
}

export function publicSafeAvatars(): AvatarDescriptor[] {
  return AVATAR_REGISTRY.filter((a) => a.publicSafe);
}
