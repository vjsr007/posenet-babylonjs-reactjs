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
  const setError = usePoseStore((s) => s.setError);

  useEffect(() => {
    let cancelled = false;

    async function start(): Promise<void> {
      const video = videoRef.current;
      if (!video) return;

      setError(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Tu navegador no permite acceder a la cámara (necesita HTTPS o localhost).");
        return;
      }

      // 1. webcam — intenta constraints ideales; si fallan por OverconstrainedError, reintenta sin ellos
      let stream: MediaStream | null = null;
      const tryGet = (constraints: MediaStreamConstraints) =>
        navigator.mediaDevices.getUserMedia(constraints);
      try {
        try {
          stream = await tryGet({
            video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
            audio: false,
          });
        } catch (err) {
          const name = err instanceof Error ? err.name : "Error";
          if (name === "OverconstrainedError" || name === "ConstraintNotSatisfiedError") {
            stream = await tryGet({ video: true, audio: false });
          } else {
            throw err;
          }
        }
      } catch (err) {
        const name = err instanceof Error ? err.name : "Error";
        let msg: string;
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          msg =
            "Permiso de cámara denegado. Haz clic en el icono del candado de la barra de direcciones y permite la cámara, luego recarga.";
        } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
          msg = "No se detecta ninguna cámara conectada.";
        } else if (
          name === "NotReadableError" ||
          name === "TrackStartError" ||
          name === "AbortError"
        ) {
          msg =
            "La cámara está en uso por otra aplicación (Zoom, Teams, Meet, OBS…). Ciérrala y recarga.";
        } else if (name === "SecurityError") {
          msg = "El navegador bloqueó la cámara por seguridad. Usa http://localhost o HTTPS.";
        } else {
          msg = `No se pudo iniciar la cámara: ${name}`;
        }
        setError(msg);
        return;
      }
      if (cancelled || !stream) {
        // El efecto se desmontó (StrictMode) mientras esperábamos el stream → libéralo.
        if (stream) for (const t of stream.getTracks()) t.stop();
        return;
      }
      streamRef.current = stream;
      video.srcObject = stream;
      try {
        await video.play();
      } catch (err) {
        setError(`No se pudo reproducir el video: ${err instanceof Error ? err.message : "error"}`);
        return;
      }
      if (cancelled) return;

      // 2. worker
      const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
      workerRef.current = worker;
      worker.addEventListener("message", (e: MessageEvent) => {
        const msg = e.data as {
          type: string;
          pose?: import("@/types/pose").Pose;
          message?: string;
        };
        if (msg.type === "ready") setReady(true);
        if (msg.type === "pose" && msg.pose) setPose(msg.pose);
        if (msg.type === "error" && msg.message) setError(`MoveNet: ${msg.message}`);
      });
      worker.addEventListener("error", (e: ErrorEvent) => {
        setError(`Worker MoveNet falló: ${e.message}`);
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
  }, [videoRef, setPose, setReady, setError]);
}
