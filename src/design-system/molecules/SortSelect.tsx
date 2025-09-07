import { useId } from "react";
import { SortOrder } from "@/types/sorting";

type Props = {
  value: SortOrder;
  onChange: (v: SortOrder) => void;
  className?: string;
};

export default function SortSelect({ value, onChange, className }: Props) {
  const id = useId();
  return (
    <label htmlFor={id} className={`flex items-center gap-2 ${className ?? ""}`}>
      <span className="text-xs text-slate-600">Orden</span>
      <select
        id={id}
        className="select select-sm"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
      >
        <option value={SortOrder.AZ}>A → Z</option>
        <option value={SortOrder.ZA}>Z → A</option>
      </select>
    </label>
  );
}
