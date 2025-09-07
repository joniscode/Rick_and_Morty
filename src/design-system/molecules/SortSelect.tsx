import type { SortOrder } from "../../features/characters/hooks/useCharacter";

type Props = {
  value: SortOrder;
  onChange: (v: SortOrder) => void;
};

export default function SortSelect({ value, onChange }: Props) {
  const id = "sort-select";
  return (
    <div className="inline-flex items-center gap-2">
      <label htmlFor={id} className="text-sm text-gray-700">Sort</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
        className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </div>
  );
}
