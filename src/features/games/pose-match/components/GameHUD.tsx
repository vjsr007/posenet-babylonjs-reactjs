import type { Ref } from "react";

interface Props {
  similarityRef: Ref<HTMLSpanElement>;
  tierRef: Ref<HTMLSpanElement>;
  timeRef: Ref<HTMLSpanElement>;
}

/**
 * HUD imperativo. Renderiza una vez; las actualizaciones se hacen vía
 * `ref.current.textContent` desde el rAF loop.
 */
export function GameHUD({ similarityRef, tierRef, timeRef }: Props): JSX.Element {
  return (
    <div className="absolute top-2 right-2 flex flex-col items-end gap-1 font-mono text-sm bg-black/60 rounded-md px-3 py-2">
      <div>
        ⏱ <span ref={timeRef}>0.0</span>s
      </div>
      <div>
        match <span ref={similarityRef}>0</span>%
      </div>
      <div>
        tier{" "}
        <span ref={tierRef} className="text-arena-accent2">
          --
        </span>
      </div>
    </div>
  );
}
