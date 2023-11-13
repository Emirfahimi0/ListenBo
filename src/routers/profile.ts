import { Router } from "express";
import { isAuthenticated, verifyAuth } from "../middleware/auth";
import {
	getPublicPlaylist,
	getPublicProfile,
	getPublicUploads,
	getRecommendProfile,
	getUploads,
	updateFollower,
} from "../controller";

export const profileRouter = Router();

profileRouter.post("/update-follower/:profileId", verifyAuth, updateFollower);
profileRouter.get("/uploads", verifyAuth, getUploads);
profileRouter.get("/uploads/:profileId", getPublicUploads);
profileRouter.get("/info/:profileId", getPublicProfile);
profileRouter.get("/playlist/:profileId", getPublicPlaylist);
profileRouter.get("/recommended", isAuthenticated, getRecommendProfile);
