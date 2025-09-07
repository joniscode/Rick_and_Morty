import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import { getItem, setItem } from "../../services/local/localStorage";

type Ctx = {
  ids: Set<string>;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
};

const FavoritesCtx = createContext<Ctx | null>(null);
const KEY = "favoriteCharacterIds";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [idsState, setIdsState] = useState<string[]>([]);

  useEffect(() => {
    setIdsState(getItem<string[]>(KEY, []));
  }, []);

  const value = useMemo<Ctx>(() => {
    const set = new Set(idsState);
    return {
      ids: set,
      isFavorite: (id: string) => set.has(id),
      toggle: (id: string) => {
        const next = new Set(set);
        next.has(id) ? next.delete(id) : next.add(id);
        const arr = Array.from(next);
        setIdsState(arr);
        setItem(KEY, arr);
      }
    };
  }, [idsState]);

  return <FavoritesCtx.Provider value={value}>{children}</FavoritesCtx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesCtx);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
