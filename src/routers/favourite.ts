import { Router } from "express";
import { fileParser, isVerified, verifyAuth } from "../middleware/auth";
import { audioValidation } from "../utils";
import { validator } from "../middleware/validator";
import { getFavourites, getIsFavourite, toggleFavorite } from "../controller";

export const favouriteRouter = Router();

favouriteRouter.post("/", verifyAuth, isVerified, toggleFavorite);
favouriteRouter.get("/", verifyAuth, getFavourites);
favouriteRouter.get("/is-fav", verifyAuth, getIsFavourite);
