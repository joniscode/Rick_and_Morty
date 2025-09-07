import { useQuery } from "@apollo/client";
import { CHARACTER_QUERY } from "../../../api/queries";
import type { Character } from "../../../types/character";

type CharacterResponse = {
  character: Character | null;
};

export function useCharacter({ id }: { id?: string }) {
  const enabled = !!id && /^\d+$/.test(id);

  const { data, loading, error } = useQuery<CharacterResponse>(
    CHARACTER_QUERY,
    {
      variables: enabled ? { id: String(id) } : undefined,
      skip: !enabled,                 
      fetchPolicy: "cache-first",
    }
  );

  if (!enabled) {
    return { character: null, loading: false, error: undefined as any };
  }

  return {
    character: data?.character ?? null,
    loading,
    error,
  };
}

export default useCharacter;
