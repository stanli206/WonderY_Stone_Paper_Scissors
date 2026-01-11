// import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import sequelize from "./src/config/db.js";

const PORT = process.env.PORT || 5001;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("PostgreSQL connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed", err);
  }
})();
