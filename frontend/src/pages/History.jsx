import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://16.171.148.112:5000/api/games")
      .then((res) => setGames(res.data));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Game History</h1>

      {games.map((game) => (
        <div key={game._id} className="border rounded p-4">
          <p>
            <strong>{game.player1Name}</strong> vs{" "}
            <strong>{game.player2Name}</strong>
          </p>
          <p className="font-bold">Winner: {game.finalWinner}</p>
        </div>
      ))}
    </div>
  );
}
