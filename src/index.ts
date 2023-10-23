import express from "express";

const app = express();

const PORT = 8989;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
