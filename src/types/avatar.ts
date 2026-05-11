/**
 * Mapa de bones por avatar. Conecta keypoints (MoveNet) a índices de bones del esqueleto Babylon.
 */
export interface BoneMap {
  head: number;
  rightShoulder: number;
  rightArm: number;
  rightForeArm: number;
  rightHand: number;
  leftShoulder: number;
  leftArm: number;
  leftForeArm: number;
  leftHand: number;
  hips: number;
  rightUpLeg: number;
  rightLeg: number;
  rightFoot: number;
  leftUpLeg: number;
  leftLeg: number;
  leftFoot: number;
  spine?: number;
}

export interface AvatarDescriptor {
  id: string;
  name: string;
  url: string;
  /** Tipo de archivo: glb/gltf/babylon */
  format: "glb" | "gltf" | "babylon";
  /** Licencia legible (CC0, Apache-2.0, CC-BY-4.0...). */
  license: string;
  /** Si es atribución obligatoria, autor */
  author?: string;
  /** Solo seguro para deploy público si esto es true */
  publicSafe: boolean;
  /** Mapeo bones — debe validarse en sandbox.babylonjs.com */
  boneMap?: BoneMap;
  thumbnail?: string;
}
