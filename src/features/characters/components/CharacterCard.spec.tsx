import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "./CharacterCard";
import { FavoritesProvider } from "../../favorites/FavoritesContext";
import { SoftDeleteProvider } from "../../softdelete/SoftDeleteContext";
import { MemoryRouter } from "react-router-dom";

const wrap = (ui: React.ReactNode) => (
  <MemoryRouter>
    <FavoritesProvider>
      <SoftDeleteProvider>{ui}</SoftDeleteProvider>
    </FavoritesProvider>
  </MemoryRouter>
);

const c = { id: "1", name: "Rick", image: "/rick.png", status: "Alive", species: "Human", gender: "Male" };

test("toggle de favorito cambia aria-pressed", () => {
  render(wrap(<CharacterCard c={c as any} />));
  const favBtn = screen.getByLabelText("Agregar a favoritos");
  expect(favBtn).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(favBtn);
  expect(favBtn).toHaveAttribute("aria-pressed", "true");
});

test("ocultar y restaurar personaje", () => {
  render(wrap(<CharacterCard c={c as any} />));
  const hideBtn = screen.getByLabelText("Ocultar personaje");
  fireEvent.click(hideBtn);
  // ahora debe existir botón de restaurar
  expect(screen.getByLabelText("Restaurar personaje")).toBeInTheDocument();
});
