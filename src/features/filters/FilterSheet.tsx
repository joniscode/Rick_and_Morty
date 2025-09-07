import { useEffect, useRef } from "react";
import BackIcon from "../../assets/icons/Arrow.png";

type Props = {
  onClose: () => void;
  group: "all" | "starred" | "others";
  setGroup: (v: "all" | "starred" | "others") => void;
  specie: "all" | "Human" | "Alien";
  setSpecie: (v: "all" | "Human" | "Alien") => void;
  onApply: () => void;
};

export default function FilterSheet({ onClose, group, setGroup, specie, setSpecie, onApply }: Props) {
  const firstFocus = useRef<HTMLButtonElement>(null);
  useEffect(() => { firstFocus.current?.focus(); }, []);

  return (
    <div className="sheet lg:hidden" role="dialog" aria-label="Filters">
      <div className="sheet-header">
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl  bg-white"
          onClick={onClose}
          aria-label="Volver"
        >
          <img src={BackIcon} alt="Volver" className="h-4 w-4" />
        </button>

        <div className="sheet-title">Filtros</div>

        <span aria-hidden="true" className="inline-block h-9 w-9" />
      </div>

      <div className="sheet-body space-y-6">
  <div>
        <div className="mb-2 text-xs font-semibold text-slate-500">Personajes</div>

        <div className="grid grid-cols-3 gap-3" role="group" aria-label="Characters filter">
          <button
            className={`chip chip-lg w-full ${group === "all" ? "chip-active" : "chip-ghost"}`}
            onClick={() => setGroup("all")}
          >
            Todos
          </button>

          <button
            className={`chip chip-lg w-full ${group === "starred" ? "chip-active" : "chip-ghost"}`}
            onClick={() => setGroup("starred")}
          >
            Personaje
          </button>

          <button
            className={`chip chip-lg w-full ${group === "others" ? "chip-active" : "chip-ghost"}`}
            onClick={() => setGroup("others")}
          >
            Otros
          </button>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold text-slate-500">Especie</div>

        <div className="grid grid-cols-3 gap-3" role="group" aria-label="Specie filter">
          <button
            className={`chip chip-lg w-full ${specie === "all" ? "chip-active" : "chip-ghost"}`}
            onClick={() => setSpecie("all")}
          >
            Todos
          </button>

          <button
            className={`chip chip-lg w-full ${specie === "Human" ? "chip-active" : "chip-ghost"}`}
            onClick={() => setSpecie("Human")}
          >
            Humanos
          </button>

          <button
            className={`chip chip-lg w-full ${specie === "Alien" ? "chip-active" : "chip-ghost"}`}
            onClick={() => setSpecie("Alien")}
          >
            Alien
          </button>
        </div>
      </div>
    </div>

      {/* Footer */}
      <div className="sheet-footer">
        <button className="btn btn-block btn-primary" onClick={onApply}>Filtrar</button>
      </div>
    </div>
  );
}
