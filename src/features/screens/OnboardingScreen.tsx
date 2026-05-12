import { Icon } from "@/components/Icon";
import { PoseFigure } from "@/components/PoseFigure";
import { useState } from "react";

interface OnboardingScreenProps {
  onDone: () => void;
}

export function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, var(--pink-soft) 0%, var(--holo-4) 60%, var(--holo-2) 100%)",
          gap: 32,
          padding: "0 48px",
          textAlign: "center",
        }}
      >
        <div className="eyebrow" style={{ color: "var(--pink-deep)" }}>
          Bienvenida / Bienvenidx
        </div>
        <h1
          className="serif"
          style={{ fontSize: 72, fontStyle: "italic", margin: 0, lineHeight: 1 }}
        >
          Dress to Impress
        </h1>
        <p style={{ maxWidth: 500, color: "var(--ink-2)", fontSize: 16 }}>
          Usa tu cuerpo como mando. Imita poses, sigue el ritmo, sobrevive al beat. Tu webcam nunca
          sale del navegador.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
          }}
        >
          {[
            "Pose detection en tiempo real",
            "5 modos de juego",
            "Closet y skins coleccionables",
            "Privacidad total — 0 datos enviados",
          ].map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--ink-2)",
              }}
            >
              <Icon name="check" size={14} />
              <span>{f}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-pink" type="button" onClick={() => setStep(1)}>
            Empezar
          </button>
          <button className="btn btn-ghost" type="button" onClick={onDone}>
            Ver demo
          </button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          gap: 24,
          padding: "0 48px",
          textAlign: "center",
        }}
      >
        <Icon name="camera" size={42} />
        <h2 className="serif" style={{ fontSize: 40, fontStyle: "italic", margin: 0 }}>
          Permiso de cámara
        </h2>
        <p style={{ maxWidth: 440, color: "var(--ink-2)" }}>
          Necesitamos acceso a tu webcam para detectar tu pose. El video
          <strong> nunca sale de tu navegador</strong>.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-pink" type="button" onClick={() => setStep(2)}>
            Permitir cámara
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => setStep(2)}>
            Saltar
          </button>
        </div>
      </div>
    );
  }

  // step 2 — calibration preview
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        gap: 24,
        padding: "0 48px",
        textAlign: "center",
      }}
    >
      <div className="eyebrow">Paso 3 de 3</div>
      <h2 className="serif" style={{ fontSize: 40, fontStyle: "italic", margin: 0 }}>
        Calibración
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          width: "100%",
          maxWidth: 640,
        }}
      >
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            Antes de empezar
          </div>
          {[
            "Aléjate ~2 metros de la cámara",
            "Asegúrate de que todo tu cuerpo sea visible",
            "Buena iluminación frontal",
            "Ropa contrastante con el fondo",
          ].map((tip) => (
            <div
              key={tip}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 8,
                fontSize: 13,
                alignItems: "flex-start",
              }}
            >
              <Icon name="check" size={12} />
              <span>{tip}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "var(--bg-2)",
            borderRadius: 16,
            position: "relative",
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PoseFigure pose="hips" size={80} color="var(--pink)" />
          {/* calibration dots */}
          {[
            { top: "15%", left: "50%" },
            { top: "40%", left: "25%" },
            { top: "40%", left: "75%" },
            { top: "75%", left: "35%" },
            { top: "75%", left: "65%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="calib-dot"
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--pink)",
                opacity: 0.7,
                transform: "translate(-50%, -50%)",
                ...pos,
              }}
            />
          ))}
        </div>
      </div>
      <button className="btn btn-pink" type="button" onClick={onDone}>
        ¡Listo, a jugar!
      </button>
    </div>
  );
}
