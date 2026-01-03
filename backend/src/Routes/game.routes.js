import express from "express";
import { createGame, getAllGames } from "../Controllers/game.controller.js";

const router = express.Router();

router.post("/", createGame);
router.get("/", getAllGames);

export default router;
