import "@testing-library/jest-dom";
import { server } from "./testServer";

// MSW: arrancar/parar server
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
