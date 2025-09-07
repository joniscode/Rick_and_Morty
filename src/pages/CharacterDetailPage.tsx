// CharacterDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCharacter } from "../features/characters/hooks/useCharacter";
import { useFavorites } from "../features/favorites/FavoritesContext";

import ArrowIcon from "../assets/icons/Arrow.png";

const tStatus: Record<string, string> = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
};

const tGender: Record<string, string> = {
  Male: "Masculino",
  Female: "Femenino",
  Genderless: "Sin género",
  unknown: "Desconocido",
};

function translateStatus(value?: string) {
  if (!value) return "";
  return tStatus[value] ?? value;
}

function translateGender(value?: string) {
  if (!value) return "";
  return tGender[value] ?? value;
}

const IconArrowBack = () => (
  <img src={ArrowIcon} alt="Volver" className="h-4 w-4" />
);

const IconHeart: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth={1.8}
    fill={filled ? "currentColor" : "none"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { character, loading, error } = useCharacter({ id: id! });

  const { isFavorite, toggle } = useFavorites();
  const isFav = id ? isFavorite(id) : false;

  if (loading) {
    return (
      <main className="p-4 md:p-6">
        <div className="h-[60vh] flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600">
            <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-sm">Cargando…</span>
          </div>
        </div>
      </main>
    );
  }

  if (error || !character) {
    return (
      <main className="p-4 md:p-6">
        <p className="text-red-600">No fue posible cargar el personaje.</p>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-6">
      <Helmet>
        <title>{character.name} — Rick & Morty</title>
      </Helmet>

      <div className="fixed right-4 top-4 z-20">
  <button
    type="button"
    onClick={() => navigate(-1)}
    aria-label="Volver"
    className="p-0 m-0 bg-transparent border-none"
  >
    <IconArrowBack />
  </button>
</div>

      <header className="mb-6">
        <div className="relative inline-block">
          <img
            src={character.image}
            alt={character.name}
            className="h-24 w-24 rounded-full object-cover ring-2 ring-white shadow-md"
          />

          <button
            type="button"
            aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
            aria-pressed={isFav}
            onClick={() => toggle(character.id)}
            className={[
              "absolute -right-2 bottom-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 transition-colors",
              isFav ? "text-green-600 ring-green-500" : "text-slate-500 ring-black/5",
            ].join(" ")}
          >
            <IconHeart filled={isFav} />
          </button>
        </div>

        <h1 className="mt-3 text-2xl font-semibold text-slate-900">{character.name}</h1>
        <div className="mt-1 text-slate-500">
          {character.species} · {translateStatus(character.status)}
        </div>
      </header>

      <section className="divide-y divide-gray-200">
        <div className="py-4">
          <div className="font-semibold text-slate-700">Especie</div>
          <div className="text-slate-600">{character.species}</div>
        </div>

        <div className="py-4">
          <div className="font-semibold text-slate-700">Estado</div>
          <div className="text-slate-600">{translateStatus(character.status)}</div>
        </div>

        <div className="py-4">
          <div className="font-semibold text-slate-700">Género</div>
          <div className="text-slate-600">{translateGender(character.gender)}</div>
        </div>

        {character.origin?.name && (
          <div className="py-4">
            <div className="font-semibold text-slate-700">Origen</div>
            <div className="text-slate-600">{character.origin.name}</div>
          </div>
        )}

        {character.location?.name && (
          <div className="py-4">
            <div className="font-semibold text-slate-700">Ubicación</div>
            <div className="text-slate-600">{character.location.name}</div>
          </div>
        )}
      </section>
    </main>
  );
}
