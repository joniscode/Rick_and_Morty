import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { getItem, setItem } from "../../services/local/localStorage";

type Ctx = {
  hidden: Set<string>;
  isHidden: (id: string) => boolean;
  hide: (id: string) => void;
  restore: (id: string) => void;
  restoreAll: () => void;
};

const KEY = "hiddenCharacterIds";
const SoftDeleteCtx = createContext<Ctx | null>(null);

export function SoftDeleteProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getItem<string[]>(KEY, []));
  }, []);

  const value = useMemo<Ctx>(() => {
    const set = new Set(ids);
    return {
      hidden: set,
      isHidden: (id) => set.has(id),
      hide: (id) => {
        if (set.has(id)) return;
        const next = [...set, id];
        setIds(next);
        setItem(KEY, next);
      },
      restore: (id) => {
        if (!set.has(id)) return;
        const next = [...Array.from(set).filter(x => x !== id)];
        setIds(next);
        setItem(KEY, next);
      },
      restoreAll: () => {
        setIds([]);
        setItem(KEY, []);
      }
    };
  }, [ids]);

  return <SoftDeleteCtx.Provider value={value}>{children}</SoftDeleteCtx.Provider>;
}

export function useSoftDelete() {
  const ctx = useContext(SoftDeleteCtx);
  if (!ctx) throw new Error("useSoftDelete must be used within SoftDeleteProvider");
  return ctx;
}
