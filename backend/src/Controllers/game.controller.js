import Game from "../Models/game.model.js";
import { decideWinner } from "../utils/decideWinner.js";

export const createGame = async (req, res) => {
  const { player1Name, player2Name, rounds } = req.body;

  let p1Score = 0;
  let p2Score = 0;

  const roundResults = rounds.map((r) => {
    const result = decideWinner(r.player1Choice, r.player2Choice);

    if (result === "player1") p1Score++;
    if (result === "player2") p2Score++;

    return {
      ...r,
      winner: result
    };
  });

  let finalWinner = "tie";
  if (p1Score > p2Score) finalWinner = player1Name;
  if (p2Score > p1Score) finalWinner = player2Name;

  const game = await Game.create({
    player1Name,
    player2Name,
    rounds: roundResults,
    finalWinner
  });

  res.status(201).json(game);
};

export const getAllGames = async (req, res) => {
  const games = await Game.find().sort({ createdAt: -1 });
  res.json(games);
};
