import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/Game";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-black text-white flex gap-6">
        <Link to="/">Game</Link>
        <Link to="/history">Game History</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
