import { useState } from "react";
import axios from "axios";

const choices = [
  { name: "stone", emoji: "🪨" },
  { name: "paper", emoji: "📄" },
  { name: "scissors", emoji: "✂️" },
];

export default function Game() {
  const [player1Name, setP1] = useState("");
  const [player2Name, setP2] = useState("");
  const [rounds, setRounds] = useState([]);
  const [message, setMessage] = useState("");

  const playRound = (choice) => {
    if (rounds.length >= 6) return;

    const p2Choice = choices[Math.floor(Math.random() * 3)].name;

    setRounds([
      ...rounds,
      {
        player1Choice: choice,
        player2Choice: p2Choice,
      },
    ]);

    setMessage(`You played ${choice.toUpperCase()}`);
  };

  const submitGame = async () => {
    await axios.post("http://16.171.148.112:5000/api/games", {
      player1Name,
      player2Name,
      rounds,
    });

    alert("🏆 Game Saved!");
    setRounds([]);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-center mb-2 tracking-widest">
          🎮 STONE PAPER SCISSORS
        </h1>

        <p className="text-center text-sm text-slate-400 mb-6">
          Round {rounds.length} / 6
        </p>

        {/* PLAYER NAMES */}
        <div className="flex gap-3 mb-6">
          <input
            placeholder="Player 1"
            value={player1Name}
            onChange={(e) => setP1(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-center"
          />
          <input
            placeholder="Player 2"
            value={player2Name}
            onChange={(e) => setP2(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-center"
          />
        </div>

        {/* GAME BUTTONS */}
        <div className="flex justify-center gap-4 mb-6">
          {choices.map((c) => (
            <button
              key={c.name}
              onClick={() => playRound(c.name)}
              className="w-20 h-20 text-4xl rounded-full
              bg-gradient-to-br from-indigo-600 to-purple-700
              hover:scale-110 transition-transform
              shadow-lg active:scale-95"
            >
              {c.emoji}
            </button>
          ))}
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-green-400 mb-4">{message}</p>
        )}

        {/* FINISH */}
        {rounds.length === 6 && (
          <button
            onClick={submitGame}
            className="w-full py-3 rounded-xl font-bold
            bg-gradient-to-r from-emerald-500 to-green-600
            hover:opacity-90"
          >
            🏁 FINISH GAME
          </button>
        )}
      </div>
    </div>
  );
}
