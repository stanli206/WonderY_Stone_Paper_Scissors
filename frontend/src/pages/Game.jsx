import { useEffect, useState } from "react";
import axios from "axios";

const choices = [
  { name: "stone", emoji: "🪨" },
  { name: "paper", emoji: "📄" },
  { name: "scissors", emoji: "✂️" },
];

const decideWinner = (p1, p2, p1Name, p2Name) => {
  if (p1 === p2) return "Tie";

  if (
    (p1 === "stone" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "stone")
  ) {
    return p1Name;
  }
  return p2Name;
};

export default function Game() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const [p1Choice, setP1Choice] = useState("");
  const [p2Choice, setP2Choice] = useState("");

  const [rounds, setRounds] = useState([]);
  const [finalWinner, setFinalWinner] = useState("");

  useEffect(() => {
    if (p1Choice && p2Choice && rounds.length < 6) {
      const winner = decideWinner(p1Choice, p2Choice, player1Name, player2Name);

      setRounds((prev) => [
        ...prev,
        {
          player1Choice: p1Choice,
          player2Choice: p2Choice,
          winner,
        },
      ]);

      setP1Choice("");
      setP2Choice("");
    }
  }, [p1Choice, p2Choice]);

  const calculateScore = () => {
    let p1 = 0,
      p2 = 0;

    rounds.forEach((r) => {
      if (r.winner === player1Name) p1++;
      if (r.winner === player2Name) p2++;
    });

    return { p1, p2 };
  };

  const publishResult = async () => {
    const { p1, p2 } = calculateScore();

    let winner = "Tie";
    if (p1 > p2) winner = player1Name;
    if (p2 > p1) winner = player2Name;

    setFinalWinner(winner);

    await axios.post(
      "http://wondery-backend-alb-763939103.eu-north-1.elb.amazonaws.com/api/games",
      {
        player1Name,
        player2Name,
        rounds,
      }
    );
  };
  //https://d3ilpfd9bcjuxp.cloudfront.net/api/games

  const restartGame = () => {
    setRounds([]);
    setFinalWinner("");
    setP1Choice("");
    setP2Choice("");
  };

  const { p1, p2 } = calculateScore();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/90 p-8 rounded-2xl w-full max-w-xl text-white">
        <h1 className="text-3xl font-bold text-center mb-4">
          🎮 Stone Paper Scissors (2 Player)
        </h1>

        {/* Player Names */}
        {rounds.length === 0 && (
          <div className="flex gap-3 mb-4">
            <input
              placeholder="Player 1 Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className="flex-1 bg-slate-800 p-2 rounded text-center"
            />
            <input
              placeholder="Player 2 Name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className="flex-1 bg-slate-800 p-2 rounded text-center"
            />
          </div>
        )}

        {/* Round Counter */}
        <p className="text-center mb-2">Round {rounds.length} / 6</p>

        {/* Scoreboard */}
        <div className="text-center mb-4 font-semibold">
          {player1Name} : {p1} | {player2Name} : {p2}
        </div>

        {/* Player 1 */}
        <div className="mb-3">
          <p className="text-center mb-2">{player1Name}'s Choice</p>
          <div className="flex justify-center gap-3">
            {choices.map((c) => (
              <button
                key={c.name}
                onClick={() => setP1Choice(c.name)}
                disabled={!!p1Choice}
                className={`w-14 h-14 text-2xl rounded-full ${
                  p1Choice === c.name ? "bg-green-600" : "bg-indigo-600"
                }`}
              >
                {c.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="mb-4">
          <p className="text-center mb-2">{player2Name}'s Choice</p>
          <div className="flex justify-center gap-3">
            {choices.map((c) => (
              <button
                key={c.name}
                onClick={() => setP2Choice(c.name)}
                disabled={!p1Choice || !!p2Choice}
                className={`w-14 h-14 text-2xl rounded-full ${
                  p2Choice === c.name ? "bg-green-600" : "bg-purple-600"
                }`}
              >
                {c.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Round Results */}
        <div className="bg-slate-800 rounded p-4 mb-4">
          <h2 className="font-bold mb-2">Round Results</h2>
          {rounds.map((r, i) => (
            <p key={i} className="text-sm">
              Round {i + 1}: {player1Name} ({r.player1Choice}) vs {player2Name}{" "}
              ({r.player2Choice}) → <strong>{r.winner}</strong>
            </p>
          ))}
        </div>

        {/* Final */}
        {rounds.length === 6 && (
          <div className="text-center space-y-3">
            <button
              onClick={publishResult}
              className="bg-green-600 px-6 py-2 rounded font-bold"
            >
              Publish Result
            </button>

            {finalWinner && (
              <>
                <p className="text-xl font-bold">
                  🏆 Final Winner: {finalWinner}
                </p>
                <button
                  onClick={restartGame}
                  className="bg-red-600 px-6 py-2 rounded font-bold"
                >
                  🔄 Restart Game
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
