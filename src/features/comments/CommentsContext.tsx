import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Comment = { characterId: string; text: string; date: string };
type CommentsState = Map<string, Comment[]>;

type CommentsCtx = {
  comments: CommentsState;
  addComment: (characterId: string, text: string) => void;
};

const CommentsContext = createContext<CommentsCtx | undefined>(undefined);

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<CommentsState>(new Map());

  const addComment = (characterId: string, text: string) => {
    setComments((prev) => {
      const next = new Map(prev);
      const arr = next.get(characterId) ?? [];
      arr.push({ characterId, text, date: new Date().toISOString() });
      next.set(characterId, arr);
      return next;
    });
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be used within CommentsProvider");
  return ctx;
}
