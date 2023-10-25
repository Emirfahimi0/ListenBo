import mongoose from "mongoose";
import { MONGO_URI } from "../utils";

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Successfully connected");
  })
  .catch((err) => {
    console.log("db connection error:", err);
  });
