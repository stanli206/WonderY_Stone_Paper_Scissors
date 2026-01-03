import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB connected");
});

app.listen(port, () => {
  console.log("Server running on port 5000");
});
