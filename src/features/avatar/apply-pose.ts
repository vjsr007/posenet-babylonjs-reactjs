import type { NormalizedPose } from "@/types/pose";
import type { Skeleton } from "@babylonjs/core/Bones/skeleton";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import { type BoneSlotMap, autoMapBones } from "./bone-map";

/**
 * v1 stub: aplica orientaciones simples a brazos y piernas usando los keypoints
 * normalizados. Suficiente para feedback visual; IK completa irá en v2.
 */
export class PoseApplier {
  private bones: BoneSlotMap;
  private restCache = new Map<keyof BoneSlotMap, Quaternion>();

  constructor(skeleton: Skeleton) {
    this.bones = autoMapBones(skeleton);
    for (const [slot, bone] of Object.entries(this.bones)) {
      if (!bone) continue;
      this.restCache.set(
        slot as keyof BoneSlotMap,
        bone.rotationQuaternion?.clone() ?? Quaternion.Identity(),
      );
    }
  }

  apply(pose: NormalizedPose): void {
    const map = new Map(pose.keypoints.map((k) => [k.name, k]));
    this.aimBone("leftArm", map.get("left_shoulder"), map.get("left_elbow"));
    this.aimBone("leftForeArm", map.get("left_elbow"), map.get("left_wrist"));
    this.aimBone("rightArm", map.get("right_shoulder"), map.get("right_elbow"));
    this.aimBone("rightForeArm", map.get("right_elbow"), map.get("right_wrist"));
    this.aimBone("leftUpLeg", map.get("left_hip"), map.get("left_knee"));
    this.aimBone("leftLeg", map.get("left_knee"), map.get("left_ankle"));
    this.aimBone("rightUpLeg", map.get("right_hip"), map.get("right_knee"));
    this.aimBone("rightLeg", map.get("right_knee"), map.get("right_ankle"));
  }

  private aimBone(
    slot: keyof BoneSlotMap,
    from: { x: number; y: number } | undefined,
    to: { x: number; y: number } | undefined,
  ): void {
    const bone = this.bones[slot];
    if (!bone || !from || !to) return;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    if (dx === 0 && dy === 0) return;
    const angle = Math.atan2(-dy, dx) - Math.PI / 2;
    const target = Quaternion.RotationAxis(Vector3.Forward(), angle);
    if (!bone.rotationQuaternion) bone.rotationQuaternion = Quaternion.Identity();
    Quaternion.SlerpToRef(bone.rotationQuaternion, target, 0.3, bone.rotationQuaternion);
  }

  resetToRest(): void {
    for (const [slot, bone] of Object.entries(this.bones)) {
      if (!bone) continue;
      const rest = this.restCache.get(slot as keyof BoneSlotMap);
      if (rest) bone.rotationQuaternion = rest.clone();
    }
  }
}
