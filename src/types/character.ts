export type Character = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin?: { name: string } | null;
  location?: { name: string } | null;
};

export type CharactersResponse = {
  characters: {
    info: { next: number | null; prev: number | null; pages: number; count: number };
    results: Character[];
  };
};
