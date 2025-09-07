import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useCharacter } from "../features/characters/hooks/useCharacter";
import type { Character } from "../types/character";
import { useFavorites } from "../features/favorites/FavoritesContext";
import IconHeart from "../design-system/atoms/IconHeart";
import BackIcon from "../assets/icons/Arrow.png";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { character, loading, error } = useCharacter({ id: id! });
  const { isFavorite, toggle } = useFavorites();

  if (loading) return <div className="p-6">Cargando…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error.message}</div>;
  if (!character) return <div className="p-6">No encontrado</div>;

  const c = character as Character;
  const fav = isFavorite(c.id);

  return (
    <main className="min-h-dvh p-4 md:p-6">
      <Helmet>
        <title>{c.name} — Rick & Morty</title>
      </Helmet>

      <button
        className="inline-flex h-8 w-8 items-center justify-center  bg-white ring-slate-200 hover:bg-slate-50 mb-4"
        onClick={goBack}
        aria-label="Volver"
      >
        <img src={BackIcon} alt="Volver" className="h-4 w-4" />
      </button>

      <header className="mb-6 flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={c.image}
            alt={c.name}
            className="h-24 w-24 rounded-full object-cover"
          />

          <button
            type="button"
            aria-pressed={fav}
            aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
            onClick={() => toggle(c.id)}
            className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-slate-200 hover:bg-white"
          >
            <IconHeart filled={fav} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gradient-brand">{c.name}</h1>
      </header>

      <section className="divide-y divide-gray-200">
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
          <div>
            <div className="font-semibold text-slate-700">Especie</div>
            <div className="text-slate-600">{c.species}</div>
          </div>
          <div>
            <div className="font-semibold text-slate-700">Estado</div>
            <div className="text-slate-600">{c.status}</div>
          </div>
          <div>
            <div className="font-semibold text-slate-700">Género</div>
            <div className="text-slate-600">{c.gender}</div>
          </div>
          <div>
            <div className="font-semibold text-slate-700">Origen</div>
            <div className="text-slate-600">{c.origin?.name ?? "Desconocido"}</div>
          </div>
          <div>
            <div className="font-semibold text-slate-700">Ubicación</div>
            <div className="text-slate-600">{c.location?.name ?? "Desconocida"}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
