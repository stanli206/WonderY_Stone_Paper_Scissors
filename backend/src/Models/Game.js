import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Game = sequelize.define(
  "Game",
  {
    player1Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player2Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rounds: {
      type: DataTypes.JSONB,   
      allowNull: false,
    },
    finalWinner: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Game;
