import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/core/Loading/loadingScreen";

export interface SceneHandle {
  engine: Engine;
  scene: Scene;
  camera: ArcRotateCamera;
  dispose: () => void;
}

/**
 * Crea engine + scene Babylon 7 con cámara orbital, luz hemisférica y resize listener.
 */
export function createScene(canvas: HTMLCanvasElement): SceneHandle {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: false,
    stencil: true,
    antialias: true,
  });
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.043, 0.05, 0.071, 1);

  const camera = new ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2.4,
    3.5,
    new Vector3(0, 1, 0),
    scene,
  );
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 1.5;
  camera.upperRadiusLimit = 8;
  camera.wheelPrecision = 50;

  new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  engine.runRenderLoop(() => scene.render());

  const onResize = (): void => engine.resize();
  window.addEventListener("resize", onResize);

  return {
    engine,
    scene,
    camera,
    dispose: () => {
      window.removeEventListener("resize", onResize);
      engine.dispose();
    },
  };
}
