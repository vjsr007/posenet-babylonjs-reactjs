import { useEffect, useRef } from "react";
import { usePoseStore } from "./usePoseStore";

/**
 * Hook que arranca cámara + worker MoveNet y empuja poses al store.
 *
 * El worker corre en su propio thread; este hook solo orquesta.
 */
export function usePoseDetection(videoRef: React.RefObject<HTMLVideoElement | null>): void {
  const workerRef = useRef<Worker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const setPose = usePoseStore((s) => s.setPose);
  const setReady = usePoseStore((s) => s.setReady);

  useEffect(() => {
    let cancelled = false;

    async function start(): Promise<void> {
      const video = videoRef.current;
      if (!video) return;

      // 1. webcam
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
          audio: false,
        });
      } catch {
        return;
      }
      if (cancelled) return;
      video.srcObject = streamRef.current;
      await video.play();

      // 2. worker
      const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
      workerRef.current = worker;
      worker.addEventListener("message", (e: MessageEvent) => {
        const msg = e.data as { type: string; pose?: import("@/types/pose").Pose };
        if (msg.type === "ready") setReady(true);
        if (msg.type === "pose" && msg.pose) setPose(msg.pose);
      });
      worker.postMessage({ type: "init" });

      // 3. loop de captura
      const tick = (): void => {
        if (cancelled || !workerRef.current) return;
        if (video.readyState >= 2) {
          createImageBitmap(video)
            .then((bitmap) => {
              workerRef.current?.postMessage({ type: "frame", bitmap, ts: performance.now() }, [
                bitmap,
              ]);
            })
            .catch(() => {});
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    void start();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      workerRef.current?.postMessage({ type: "stop" });
      workerRef.current?.terminate();
      workerRef.current = null;
      const tracks = streamRef.current?.getTracks();
      if (tracks) for (const t of tracks) t.stop();
      streamRef.current = null;
      setReady(false);
    };
  }, [videoRef, setPose, setReady]);
}
