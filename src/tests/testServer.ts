import { setupServer } from "msw/node";
import { graphql, HttpResponse } from "msw";

export const server = setupServer(
  graphql.query("Characters", ({ variables }) => {
    const { page, filter } = (variables ?? {}) as { page?: number; filter?: { name?: string } };
    return HttpResponse.json({
      data: {
        characters: {
          info: { count: 2, pages: 1, next: null, prev: null },
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              image: "",
              status: "Alive",
              species: "Human",
              gender: "Male",
              origin: { name: "Earth" },
              location: { name: "Citadel of Ricks" },
            },
            {
              id: "2",
              name: "Morty Smith",
              image: "",
              status: "Alive",
              species: "Human",
              gender: "Male",
              origin: { name: "Earth" },
              location: { name: "Earth (C-137)" },
            },
          ],
        },
      },
    });
  }),

  graphql.query("Character", ({ variables }) => {
    const { id } = (variables ?? {}) as { id: string };
    return HttpResponse.json({
      data: {
        character: {
          id,
          name: "Rick Sanchez",
          image: "",
          status: "Alive",
          species: "Human",
          gender: "Male",
          origin: { name: "Earth" },
          location: { name: "Citadel of Ricks" },
        },
      },
    });
  })
);
