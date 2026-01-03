export default function RoundCard({ round, index }) {
  return (
    <div className="border rounded p-3">
      <p className="font-semibold">Round {index + 1}</p>
      <p>P1: {round.player1Choice}</p>
      <p>P2: {round.player2Choice}</p>
      <p className="font-bold">Winner: {round.winner}</p>
    </div>
  );
}
