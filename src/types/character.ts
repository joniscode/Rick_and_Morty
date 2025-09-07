export type Character = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
};

export type CharactersResponse = {
  characters: {
    info: { next: number | null; prev: number | null; pages: number; count: number };
    results: Character[];
  };
};
