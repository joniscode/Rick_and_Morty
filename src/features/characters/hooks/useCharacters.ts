import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { CHARACTERS_QUERY } from "../../../api/queries";
import type { CharactersResponse, Character } from "../../../types/character";

export type SortOrder = "az" | "za";

const norm = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

const firstWord = (s: string) => norm(s).split(/\s+/)[0];

export function useCharacters({
  page,
  search,
  sort,
  status,
  species,
  gender,
  origin,
  location,
}: {
  page: number;
  search?: string;
  sort?: SortOrder;
  status?: string;
  species?: string;
  gender?: string;
}) {
  const { data, loading, error } = useQuery<CharactersResponse>(
    CHARACTERS_QUERY,
    {
      variables: {
        page,
        filter: {
          name: search || undefined,
          status: status || undefined,
          species: species || undefined,
          gender: gender || undefined,
        },
      },
    }
  );

  const results = data?.characters?.results ?? [];

  const sorted: Character[] = useMemo(() => {
    const list = [...results];

    const q = norm(search || "");

    const alpha = (a: Character, b: Character) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" });

    if (q) {
      const scoreOf = (name: string) => {
        const n = norm(name);
        const fw = firstWord(name);
        if (fw.startsWith(q)) return 0;
        if (n.startsWith(q)) return 1;
        if (n.includes(q)) return 2;
        return 3;
      };

      list.sort((a, b) => {
        const sa = scoreOf(a.name);
        const sb = scoreOf(b.name);
        if (sa !== sb) return sa - sb; 
        const cmp = alpha(a, b);
        return sort === "za" ? -cmp : cmp;
      });

      return list;
    }

    list.sort(alpha);
    if (sort === "za") list.reverse();
    return list;
  }, [results, search, sort]);

  const pageInfo = data?.characters?.info;

  return { characters: sorted, loading, error, pageInfo };
}
