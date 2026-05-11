/**
 * Worker de detección de pose con MoveNet (TF.js).
 *
 * Recibe ImageBitmap del main thread, devuelve keypoints.
 * Mantiene backpressure: descarta frames si está procesando.
 */

import "@tensorflow/tfjs-backend-webgl";
import { KEYPOINT_NAMES, type Keypoint, type Pose } from "@/types/pose";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";

type WorkerInMsg =
  | { type: "init" }
  | { type: "frame"; bitmap: ImageBitmap; ts: number }
  | { type: "stop" };

type WorkerOutMsg =
  | { type: "ready" }
  | { type: "pose"; pose: Pose }
  | { type: "error"; message: string };

let detector: poseDetection.PoseDetector | null = null;
let busy = false;
let lastTs = 0;

async function init(): Promise<void> {
  await tf.setBackend("webgl");
  await tf.ready();
  detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  });
  postMessage({ type: "ready" } satisfies WorkerOutMsg);
}

async function detect(bitmap: ImageBitmap, ts: number): Promise<void> {
  if (!detector) return;
  if (busy) {
    bitmap.close();
    return;
  }
  busy = true;
  try {
    const poses = await detector.estimatePoses(bitmap, { flipHorizontal: false });
    bitmap.close();
    const first = poses[0];
    if (!first) return;

    const keypoints: Keypoint[] = first.keypoints.map((kp, i) => ({
      name: (kp.name as Keypoint["name"]) ?? KEYPOINT_NAMES[i] ?? "nose",
      x: kp.x,
      y: kp.y,
      score: kp.score ?? 0,
    }));

    const fps = lastTs ? 1000 / (ts - lastTs) : 0;
    lastTs = ts;
    postMessage({ type: "pose", pose: { keypoints, ts, fps } } satisfies WorkerOutMsg);
  } catch (err) {
    postMessage({
      type: "error",
      message: err instanceof Error ? err.message : "unknown",
    } satisfies WorkerOutMsg);
  } finally {
    busy = false;
  }
}

self.addEventListener("message", (e: MessageEvent<WorkerInMsg>) => {
  const msg = e.data;
  if (msg.type === "init") {
    void init();
  } else if (msg.type === "frame") {
    void detect(msg.bitmap, msg.ts);
  } else if (msg.type === "stop") {
    detector?.dispose();
    detector = null;
  }
});
