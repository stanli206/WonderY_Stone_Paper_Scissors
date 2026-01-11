import Game from "../Models/Game.js";
import { decideWinner } from "../utils/decideWinner.js";

export const createGame = async (req, res) => {
  const { player1Name, player2Name, rounds } = req.body;

  let p1 = 0,
    p2 = 0;

  const resultRounds = rounds.map((r) => {
    const win = decideWinner(r.player1Choice, r.player2Choice);
    if (win === "player1") p1++;
    if (win === "player2") p2++;
    return { ...r, winner: win };
  });

  let finalWinner = "tie";
  if (p1 > p2) finalWinner = player1Name;
  if (p2 > p1) finalWinner = player2Name;

  const game = await Game.create({
    player1Name,
    player2Name,
    rounds: resultRounds,
    finalWinner,
  });

  res.status(201).json(game);
};

export const getAllGames = async (req, res) => {
  const games = await Game.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(games);
};
