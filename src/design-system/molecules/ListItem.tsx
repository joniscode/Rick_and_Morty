import Avatar from "../atoms/Avatar";
import IconHeart from "../atoms/IconHeart";

type Props = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  active?: boolean;
  isFavorite: boolean;
  onClick?: () => void;
  onToggleFavorite?: () => void;
};

export default function ListItem({
  name,
  subtitle,
  image,
  active = false,
  isFavorite,
  onClick,
  onToggleFavorite,
}: Props) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-3 px-0 py-3  /* <- más alto y sin padding izquierdo extra */
                  ${active ? "bg-primary-100" : ""} border-b border-gray-200`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar src={image} alt={name} size="sm" className="shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold leading-tight text-slate-900">
            {name}
          </p>
          <p className="mt-0.5 truncate text-[13px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.();
        }}
        className="p-1"
      >
        <IconHeart filled={isFavorite} />
      </button>
    </div>
  );
}
