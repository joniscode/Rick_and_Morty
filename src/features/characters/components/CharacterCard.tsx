import Avatar from "../../../design-system/atoms/Avatar";
import IconHeart from "../../../design-system/atoms/IconHeart";
import IconHide from "../../../design-system/atoms/IconHide";
import { useFavorites } from "../../favorites/FavoritesContext";
import { useSoftDelete } from "../../softdelete/SoftDeleteContext";
import type { Character } from "../../../types/character";
import { Link } from "react-router-dom";

export default function CharacterCard({ c }: { c: Character }) {
  const { isFavorite, toggle } = useFavorites();
  const { isHidden, hide, restore } = useSoftDelete();
  const fav = isFavorite(c.id);
  const hidden = isHidden(c.id);

  return (
    <article
      className={`card p-4 flex items-center gap-4 ${hidden ? "opacity-60 grayscale" : ""}`}
      aria-labelledby={`ch-${c.id}-title`}
    >
      <Avatar src={c.image} alt={`Portrait of ${c.name}`} size="lg" />
      <div className="flex-1 min-w-0">
        <h3 id={`ch-${c.id}-title`} className="text-base font-semibold truncate">
          <Link to={`/character/${c.id}`} className="hover:underline focus:underline">
            {c.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 truncate">
          {c.species} · {c.status}
        </p>
      </div>

      {/* Favorito */}
      <button
        type="button"
        aria-pressed={fav}
        aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={() => toggle(c.id)}
        className="icon-btn"
      >
        <IconHeart filled={fav} title={fav ? "Quitar de favoritos" : "Agregar a favoritos"} />
      </button>

      {/* Soft delete */}
      {hidden ? (
        <button
          type="button"
          aria-label="Restaurar personaje"
          className="icon-btn"
          onClick={() => restore(c.id)}
        >
          <IconHide title="Restaurar" />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Ocultar personaje"
          className="icon-btn"
          onClick={() => hide(c.id)}
        >
          <IconHide title="Ocultar" />
        </button>
      )}
    </article>
  );
}
