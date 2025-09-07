import { gql } from "@apollo/client";

export const CHARACTER_CARD_FIELDS = gql`
  fragment CharacterCardFields on Character {
    id
    name
    image
    status
    species
    gender
  }
`;

export const CHARACTERS_QUERY = gql`
  ${CHARACTER_CARD_FIELDS}
  query Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        next
        prev
        pages
        count
      }
      results {
        ...CharacterCardFields
      }
    }
  }
`;

export const CHARACTER_QUERY = gql`
  ${CHARACTER_CARD_FIELDS}
  query Character($id: ID!) {
    character(id: $id) {
      ...CharacterCardFields
      origin { name }
      location { name }
    }
  }
`;

export type CharactersVars = {
  page?: number;
  filter?: {
    name?: string;
    status?: "alive" | "dead" | "unknown";
    species?: string;
    type?: string;
    gender?: "Female" | "Male" | "Genderless" | "unknown";
  };
};

export type CharacterVars = {
  id: string;
};
