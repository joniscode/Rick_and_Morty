import { render, screen, fireEvent } from "@testing-library/react";
import CharacterDetailPage from "./CharacterDetailPage";
import { Providers } from "../app/Providers";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const wrap = (initialEntries = ["/character/1"]) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Providers>
      <Routes>
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </Providers>
  </MemoryRouter>
);

test("renderiza y permite agregar comentario", async () => {
  render(wrap());
  // MSW retorna Rick como id 1
  expect(await screen.findByText(/Rick/i)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/Escribe un comentario/i);
  fireEvent.change(input, { target: { value: "¡Genial!" } });
  fireEvent.click(screen.getByRole("button", { name: /Agregar/i }));

  expect(await screen.findByText("¡Genial!")).toBeInTheDocument();
});
