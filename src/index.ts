import express from "express";
import "dotenv/config";
import "./db";
import { authRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
const PORT = process.env.PORT || 8989;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

/* 

* The plan and features 
* upload audio files
* listen to single audio file
* add to favorites
* create new playlist
* remove playlist (public/private)
* remove audios
*
*/
