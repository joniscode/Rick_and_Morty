type PopProps = {
  open: boolean;
  onClose: () => void;
  group: "all" | "starred" | "others";
  setGroup: (v: "all" | "starred" | "others") => void;
  specie: "all" | "Human" | "Alien";
  setSpecie: (v: "all" | "Human" | "Alien") => void;
  onApply: () => void;
};

export default function FilterPopover({
  open, onClose, group, setGroup, specie, setSpecie, onApply,
}: PopProps) {
  if (!open) return null;

  return (
    <div
      className="absolute left-0 top-12 z-40 w-[340px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl lg:block hidden"
      role="dialog" aria-label="Filters"
    >
      <div className="mb-4">
        <div className="mb-2 text-xs font-semibold text-slate-500">Personajes</div>
        <div className="grid grid-cols-3 gap-3">
          <button className={`chip chip-lg w-full ${group === "all" ? "chip-active" : "chip-ghost"}`} onClick={() => setGroup("all")}>All</button>
          <button className={`chip chip-lg w-full ${group === "starred" ? "chip-active" : "chip-ghost"}`} onClick={() => setGroup("starred")}>Starred</button>
          <button className={`chip chip-lg w-full ${group === "others" ? "chip-active" : "chip-ghost"}`} onClick={() => setGroup("others")}>Others</button>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-xs font-semibold text-slate-500">Especie</div>
        <div className="grid grid-cols-3 gap-3">
          <button className={`chip chip-lg w-full ${specie === "all" ? "chip-active" : "chip-ghost"}`} onClick={() => setSpecie("all")}>Jonis</button>
          <button className={`chip chip-lg w-full ${specie === "Human" ? "chip-active" : "chip-ghost"}`} onClick={() => setSpecie("Human")}>Human</button>
          <button className={`chip chip-lg w-full ${specie === "Alien" ? "chip-active" : "chip-ghost"}`} onClick={() => setSpecie("Alien")}>Alien</button>
        </div>
      </div>

      <button className="btn btn-ghost btn-block" onClick={() => { onApply(); onClose(); }}>
        Filter
      </button>
    </div>
  );
}
