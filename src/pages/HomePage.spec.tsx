import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { Providers } from "../app/Providers";
import { MemoryRouter } from "react-router-dom";

const wrap = (ui: React.ReactNode) => (
  <MemoryRouter>
    <Providers>{ui}</Providers>
  </MemoryRouter>
);

test("lista y filtra por nombre", async () => {
  render(wrap(<HomePage />));
  expect(await screen.findByText(/Rick and Morty — Characters/i)).toBeInTheDocument();

  expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
  expect(await screen.findByText("Morty Smith")).toBeInTheDocument();

  const input = screen.getByRole("searchbox", { name: /search/i });
  fireEvent.change(input, { target: { value: "Rick" } });

  await waitFor(() => {
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.queryByText("Morty Smith")).not.toBeInTheDocument();
  });
});
