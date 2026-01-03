import express from "express";
import cors from "cors";
import gameRoutes from "./Routes/game.routes.js";

const app = express();

// app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin:
      "http://wondery-stone-paper-scissors-ui.s3-website.eu-north-1.amazonaws.com", //http://localhost:5173
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/games", gameRoutes);

export default app;
