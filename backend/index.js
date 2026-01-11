// import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./src/app.js";
import sequelize from "./src/config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // table auto create
    console.log("PostgreSQL connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed", err);
  }
})();

