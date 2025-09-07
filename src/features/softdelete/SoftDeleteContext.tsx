import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type SoftDeleteCtx = {
  hidden: Set<string>;
  hide: (id: string) => void;
  unhide: (id: string) => void;
};

const SoftDeleteContext = createContext<SoftDeleteCtx | undefined>(undefined);

export function SoftDeleteProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const hide = (id: string) => setHidden((prev) => new Set(prev).add(id));
  const unhide = (id: string) =>
    setHidden((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  return (
    <SoftDeleteContext.Provider value={{ hidden, hide, unhide }}>
      {children}
    </SoftDeleteContext.Provider>
  );
}

export function useSoftDelete() {
  const ctx = useContext(SoftDeleteContext);
  if (!ctx) throw new Error("useSoftDelete must be used within SoftDeleteProvider");
  return ctx;
}
