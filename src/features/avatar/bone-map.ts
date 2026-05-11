import type { BoneMap } from "@/types/avatar";
import type { Bone } from "@babylonjs/core/Bones/bone";
import type { Skeleton } from "@babylonjs/core/Bones/skeleton";

/**
 * Heurística de auto-mapeo de bones por nombre. Cubre Mixamo, glTF (CesiumMan, Soldier),
 * y nombres genéricos. Devuelve `null` por slot si no encuentra match razonable.
 */
type BoneSlot = keyof BoneMap;

const PATTERNS: Record<BoneSlot, RegExp[]> = {
  head: [/head/i],
  spine: [/spine|chest|torso/i],
  hips: [/hips|pelvis|root/i],
  rightShoulder: [/right.*(shoulder|clavicle)|r[._-]?shoulder|rshldr/i],
  leftShoulder: [/left.*(shoulder|clavicle)|l[._-]?shoulder|lshldr/i],
  rightArm: [/right.*(arm|upperarm)|r[._-]?(arm|upperarm)|rarm/i],
  leftArm: [/left.*(arm|upperarm)|l[._-]?(arm|upperarm)|larm/i],
  rightForeArm: [/right.*(forearm|lowerarm|elbow)|rforearm/i],
  leftForeArm: [/left.*(forearm|lowerarm|elbow)|lforearm/i],
  rightHand: [/right.*(hand|wrist)|rhand/i],
  leftHand: [/left.*(hand|wrist)|lhand/i],
  rightUpLeg: [/right.*(upleg|thigh|hip)|rupleg/i],
  leftUpLeg: [/left.*(upleg|thigh|hip)|lupleg/i],
  rightLeg: [/right.*(leg|shin|knee|calf)|rleg/i],
  leftLeg: [/left.*(leg|shin|knee|calf)|lleg/i],
  rightFoot: [/right.*(foot|ankle)|rfoot/i],
  leftFoot: [/left.*(foot|ankle)|lfoot/i],
};

export type BoneSlotMap = Partial<Record<BoneSlot, Bone>>;

export function autoMapBones(skeleton: Skeleton): BoneSlotMap {
  const out: BoneSlotMap = {};
  for (const slot of Object.keys(PATTERNS) as BoneSlot[]) {
    const regexes = PATTERNS[slot];
    const match = skeleton.bones.find((b) => regexes.some((r) => r.test(b.name)));
    if (match) out[slot] = match;
  }
  return out;
}

export function findBone(skeleton: Skeleton, name: string): Bone | null {
  return skeleton.bones.find((b) => b.name === name) ?? null;
}
