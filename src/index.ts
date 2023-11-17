import express from "express";
import "dotenv/config";
import "express-async-errors";
import "./db";
import { audioRouter, authRouter, favouriteRouter, historiesRouter, playlistRouter, profileRouter } from "./routers";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));

app.use("/auth", authRouter);
app.use("/audio", audioRouter);
app.use("/favourite", favouriteRouter);
app.use("/playlist", playlistRouter);
app.use("/profile", profileRouter);
app.use("/history", historiesRouter);

app.use(errorHandler);

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
