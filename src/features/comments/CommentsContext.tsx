import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getItem, setItem } from "../../services/local/localStorage";

type Comment = { id: string; text: string; createdAt: string };
type CommentsByChar = Record<string, Comment[]>;

type Ctx = {
  getComments: (charId: string) => Comment[];
  addComment: (charId: string, text: string) => void;
};

const CommentsCtx = createContext<Ctx | null>(null);
const KEY = "characterComments";

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<CommentsByChar>({});

  useEffect(() => {
    setComments(getItem(KEY, {}));
  }, []);

  const getComments = (charId: string) => comments[charId] || [];

  const addComment = (charId: string, text: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };
    const next = { ...comments, [charId]: [...(comments[charId] || []), newComment] };
    setComments(next);
    setItem(KEY, next);
  };

  return (
    <CommentsCtx.Provider value={{ getComments, addComment }}>
      {children}
    </CommentsCtx.Provider>
  );
}

export function useComments() {
  const ctx = useContext(CommentsCtx);
  if (!ctx) throw new Error("useComments must be used within CommentsProvider");
  return ctx;
}
