import express from "express";
import "dotenv/config";
import "./db";

const app = express();

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
