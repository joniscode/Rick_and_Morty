import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useCharacter } from "@/features/characters/hooks/useCharacter";
import type { Character } from "@/types/character";
import BackIcon from "@/assets/icons/Arrow.png";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const { character, loading, error } = useCharacter({ id: id! }); 

  if (loading) return <div className="p-6">Cargando…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error.message}</div>;
  if (!character) return <div className="p-6">No encontrado</div>;

  const c = character as Character;

  return (
    <main className="min-h-dvh p-4 md:p-6">
      <Helmet><title>{c.name} — Rick & Morty</title></Helmet>

      <button
        className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-xl  bg-white"
        onClick={goBack}
        aria-label="Volver"
      >


    



        <img src={BackIcon} alt="" className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-3 mb-6">
        <img src={c.image} alt={c.name} className="h-20 w-20 rounded-full object-cover" />
        <h1 className="text-2xl font-bold text-gradient-brand">{c.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="font-semibold text-slate-700">Specie</div>
          <div className="text-slate-600">{c.species}</div>
        </div>
        <div>
          <div className="font-semibold text-slate-700">Status</div>
          <div className="text-slate-600">{c.status}</div>
        </div>
        <div>
          <div className="font-semibold text-slate-700">Gender</div>
          <div className="text-slate-600">{c.gender}</div>
        </div>
        <div>
          <div className="font-semibold text-slate-700">Origin</div>
          <div className="text-slate-600">{c.origin?.name ?? "Unknown"}</div>
        </div>
        <div>
          <div className="font-semibold text-slate-700">Location</div>
          <div className="text-slate-600">{c.location?.name ?? "Unknown"}</div>
        </div>
      </div>
    </main>
  );
}
