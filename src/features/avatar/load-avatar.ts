import type { Skeleton } from "@babylonjs/core/Bones/skeleton";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import type { Scene } from "@babylonjs/core/scene";
import "@babylonjs/loaders/glTF";

export interface AvatarHandle {
  meshes: AbstractMesh[];
  skeleton: Skeleton | null;
  dispose: () => void;
}

/**
 * Carga un avatar (.glb/.gltf/.babylon) en la escena.
 * El URL puede ser absoluto (CDN) o relativo (`/avatars/<id>/file.glb`).
 */
export async function loadAvatar(scene: Scene, url: string): Promise<AvatarHandle> {
  const lastSlash = url.lastIndexOf("/") + 1;
  const rootUrl = url.slice(0, lastSlash);
  const fileName = url.slice(lastSlash);

  const result = await SceneLoader.ImportMeshAsync("", rootUrl, fileName, scene);

  const skeleton = result.skeletons[0] ?? null;

  return {
    meshes: result.meshes,
    skeleton,
    dispose: () => {
      for (const m of result.meshes) m.dispose();
      for (const s of result.skeletons) s.dispose();
      for (const g of result.animationGroups) g.dispose();
    },
  };
}
