import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterDetailPage from "./pages/CharacterDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
