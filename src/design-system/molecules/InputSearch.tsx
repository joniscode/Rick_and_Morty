import Adjustments from "../../assets/icons/Adjustments.png"; // 👈 importa la imagen

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onOpenFilters?: () => void;
};

export default function InputSearch({
  value,
  onChange,
  placeholder = "Search or filter results",
  onOpenFilters,
}: Props) {
  const id = "search-input";
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        Buscar
      </label>
      <div className="relative">
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-gray-200 bg-slate-50 pl-10 pr-12 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary-600/40"
        />

        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-slate-900"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" fill="none" strokeWidth="2" />
          <path d="M20 20l-3-3" strokeWidth="2" />
        </svg>

        {onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            aria-label="Abrir filtros"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex h-8 w-9 items-center justify-center
                       rounded-xl  text-primary-700 shadow-sm"
          >
            <img src={Adjustments} alt="Abrir filtros" className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
