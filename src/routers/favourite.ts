import { Router } from "express";
import { isVerified, verifyAuth } from "../middleware/auth";

import { getFavourites, getIsFavourite, toggleFavorite } from "../controller";

export const favouriteRouter = Router();

favouriteRouter.post("/", verifyAuth, isVerified, toggleFavorite);
favouriteRouter.get("/", verifyAuth, getFavourites);
favouriteRouter.get("/is-fav", verifyAuth, getIsFavourite);
