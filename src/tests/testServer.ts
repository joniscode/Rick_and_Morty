import { setupServer } from "msw/node";
import { graphql } from "msw";

const charactersData = [
  { id: "1", name: "Rick Sanchez", image: "/rick.png", status: "Alive", species: "Human", gender: "Male" },
  { id: "2", name: "Morty Smith", image: "/morty.png", status: "Alive", species: "Human", gender: "Male" },
];

export const server = setupServer(
  // Lista
  graphql.query("Characters", (req, res, ctx) => {
    return res(
      ctx.data({
        characters: {
          info: { next: null, prev: null, pages: 1, count: 2 },
          results: charactersData,
        },
      })
    );
  }),
  // Detalle
  graphql.query("Character", (req, res, ctx) => {
    const id = (req.variables as any).id;
    const found = charactersData.find((c) => c.id === id);
    return res(ctx.data({ character: found ?? null }));
  })
);
