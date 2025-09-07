import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import InputSearch from "../design-system/molecules/InputSearch";
import { useCharacters } from "../features/characters/hooks/useCharacters";
import ListItem from "../design-system/molecules/ListItem";
import { useFavorites } from "../features/favorites/FavoritesContext";
import { useSoftDelete } from "../features/softdelete/SoftDeleteContext";
import FilterSheet from "../features/filters/FilterSheet";
import FilterPopover from "../features/filters/FilterPopover";
import Loader from "../design-system/atoms/Loader";
import EmptyDetail from "../../public/Rick_Morty.jpeg";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort] = useState<"az" | "za">("az");
  const [status] = useState<string>("");
  const [gender] = useState<string>("");

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [group, setGroup] = useState<"all" | "starred" | "others">("all");
  const [specieChip, setSpecieChip] = useState<"all" | "Human" | "Alien">("all");

  const { ids, isFavorite, toggle } = useFavorites();
  const { hidden } = useSoftDelete();

  const { characters, loading, error, pageInfo } = useCharacters({
    page,
    search,
    sort,
    species: specieChip === "all" ? undefined : specieChip,
    status,
    gender,
  });

  const visible = characters.filter((c) => !hidden.has(c.id));
  const starred = visible.filter((c) => ids.has(c.id));
  const others = visible.filter((c) => !ids.has(c.id));
  const listToShow =
    group === "starred" ? starred : group === "others" ? others : visible;

  const selected = selectedId ? visible.find((c) => c.id === selectedId) ?? null : null;

  const filtersApplied = useMemo(() => {
    let n = 0;
    if (group !== "all") n++;
    if (specieChip !== "all") n++;
    if (search.trim()) n++;
    return n;
  }, [group, specieChip, search]);

  const handleOpenFilters = () => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) setPopoverOpen((o) => !o);
    else setSheetOpen(true);
  };

  const handleClickItem = (id: string) => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) setSelectedId(id);
    else window.location.href = `/character/${id}`;
  };

  return (
    <main className="min-h-dvh p-4 md:p-6">
      <Helmet>
        <title>Rick & Morty</title>
      </Helmet>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        {/* ===================== Columna izquierda ===================== */}
        <div>
          <h1 className="mb-3 text-xl font-semibold text-slate-900 text-gradient-brand" >
            Lista Rick y Morty
          </h1>

          <div className="relative mb-2">
            <InputSearch
              value={search}
              onChange={(v) => {
                setPage(1);
                setSearch(v);
              }}
              onOpenFilters={handleOpenFilters}
              placeholder="Buscar o filtrar resultados"
            />

            {popoverOpen && (
              <div
                className="fixed inset-0 z-30 hidden bg-slate-900/30 lg:block"
                onClick={() => setPopoverOpen(false)}
                aria-hidden="true"
              />
            )}

            <FilterPopover
              open={popoverOpen}
              onClose={() => setPopoverOpen(false)}
              group={group}
              setGroup={setGroup}
              specie={specieChip}
              setSpecie={setSpecieChip}
              onApply={() => setPopoverOpen(false)}
            />
          </div>

          {(filtersApplied > 0 || search) && (
            <div className="mt-2 flex items-center gap-2 lg:hidden">
              <span className="badge badge-muted">{listToShow.length} Resultados</span>
              {filtersApplied > 0 && (
                <span className="badge bg-green-50 text-green-700">
                  {filtersApplied} Filtros
                </span>
              )}
            </div>
          )}

          <section className="mt-6 space-y-2">
            <div className="text-[11px] font-semibold tracking-widest text-slate-500">
              PERSONAJES FAVORITOS ({starred.length})
            </div>
            <div className="divider"></div>

            {loading && characters.length === 0 && (
              <div className="py-4">
                <Loader />
              </div>
            )}

            {!loading && starred.length === 0 && (
              <p className="text-xs text-slate-500">Aún no tienes favoritos.</p>
            )}

            <div className="space-y-0">
              {starred.map((c) => (
                <ListItem
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  subtitle={c.species}
                  image={c.image}
                  isFavorite={isFavorite(c.id)}
                  onToggleFavorite={() => toggle(c.id)}
                  onClick={() => handleClickItem(c.id)}
                />
              ))}
            </div>
          </section>

          <section className="mt-6 space-y-2">
            <div className="text-[11px] font-semibold tracking-widest text-slate-500">
              PERSONAJES ({others.length})
            </div>
            <div className="divider"></div>

            {loading && (
              <div className="py-4">
                <Loader />
              </div>
            )}

            {!loading && error && (
              <p className="text-sm text-red-600">Error al cargar: {error.message}</p>
            )}

            <div className="space-y-0">
              {others.map((c) => (
                <ListItem
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  subtitle={c.species}
                  image={c.image}
                  isFavorite={isFavorite(c.id)}
                  onToggleFavorite={() => toggle(c.id)}
                  onClick={() => handleClickItem(c.id)}
                />
              ))}
            </div>

            {!loading && !error && (
              <nav
                aria-label="Paginación"
                className="flex items-center justify-center gap-3 pt-5"
              >
                <button
                  className="btn btn-ghost"
                  disabled={!pageInfo?.prev}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </button>
                <span className="text-sm text-slate-600">Página {page}</span>
                <button
                  className="btn btn-ghost"
                  disabled={!pageInfo?.next}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Siguiente
                </button>
              </nav>
            )}
          </section>
        </div>

        {/* ===================== Columna derecha (detalle) ===================== */}
        <div className="hidden lg:block">
          {selected ? (
            <>
              <div className="mb-6 flex items-center gap-3">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <h2 className="text-2xl font-semibold text-slate-900">
                  {selected.name}
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="py-4">
                  <div className="font-semibold text-slate-700">Specie</div>
                  <div className="text-slate-600">{selected.species}</div>
                </div>
                <div className="py-4">
                  <div className="font-semibold text-slate-700">Status</div>
                  <div className="text-slate-600">{selected.status}</div>
                </div>
                <div className="py-4">
                  <div className="font-semibold text-slate-700">Gender</div>
                  <div className="text-slate-600">{selected.gender}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-[720px] items-center justify-center">
              <img
                src={EmptyDetail}
                alt="Selecciona un personaje"
                className="
                  h-120 w-120 
                  ml-20 
                  rounded-2xl         
                  shadow-xl           
                  shadow-purple-200/40 
                  transform
                  transition
                  duration-500
                  hover:-translate-y-2 
                  hover:shadow-2xl
                  hover:shadow-purple-300/50
                  opacity-90
                "
              />
              <h3 className="flex  items-center justify-center mb-3 text-xl font-semibold text-slate-900 text-gradient-brand">Selecciona tu personaje </h3>
            </div>
          )}
        </div>
      </div>

      {sheetOpen && (
        <FilterSheet
          onClose={() => setSheetOpen(false)}
          group={group}
          setGroup={setGroup}
          specie={specieChip}
          setSpecie={setSpecieChip}
          onApply={() => setSheetOpen(false)}
        />
      )}
    </main>
  );
}
