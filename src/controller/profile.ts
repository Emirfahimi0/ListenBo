import { RequestHandler } from "express";
import { PipelineStage, isValidObjectId } from "mongoose";
import { audioModel, historyModel, playlistModel, userModel } from "../models";
import moment from "moment";

export const updateFollower: RequestHandler = async (req, res) => {
	const { profileId } = req.params;
	let status: "Added" | "Removed";

	if (isValidObjectId(profileId) === false) return res.status(422).json({ error: "Invalid profile id!" });

	const user = await userModel.findById(profileId);

	if (user === null) return res.status(404).json({ error: "Profile not found" });

	const isFollower = await userModel.findOne({
		_id: profileId,
		followers: req.user.id,
	});

	if (isFollower !== null) {
		await userModel.updateOne(
			{
				_id: profileId,
			},
			{ $pull: { followers: req.user.id } },
		);
		status = "Removed";
	} else {
		await userModel.updateOne(
			{
				_id: profileId,
			},
			{ $addToSet: { followers: req.user.id } },
		);
		status = "Added";
	}

	if (status === "Added") await userModel.updateOne({ _id: req.user.id }, { $addToSet: { followings: profileId } });

	if (status === "Removed") await userModel.updateOne({ _id: req.user.id }, { $pull: { followings: profileId } });

	res.json({ status });
};

export const getUploads: RequestHandler = async (req, res) => {
	const { pageNo = "0", limit = "20" } = req.query as TPaginationQuery;

	const data = await audioModel
		.find({ owner: req.user.id })
		.skip(parseInt(limit) * parseInt(pageNo))
		.limit(parseInt(limit))
		.sort("-CreatedAt");

	const audios = data.map((item) => {
		return {
			id: item.id,
			title: item.title,
			about: item.about,
			file: item.file.url,
			poster: item.poster?.url,
			date: item.createdAt,
			owner: { name: req.user.name, id: req.user.id },
		};
	});

	res.json({ audios });
};

export const getPublicUploads: RequestHandler = async (req, res) => {
	const { pageNo = "0", limit = "20" } = req.query as TPaginationQuery;
	const { profileId } = req.params;
	if (isValidObjectId(profileId) === false) return res.status(422).json({ error: "Invalid profile!" });

	const data = await audioModel
		.find({ owner: profileId })
		.skip(parseInt(limit) * parseInt(pageNo))
		.limit(parseInt(limit))
		.sort("-CreatedAt")
		.populate<IAudioDocument<{ name: string; id: string }>>("owner");

	const audios = data.map((item) => {
		return {
			id: item.id,
			title: item.title,
			about: item.about,
			file: item.file.url,
			poster: item.poster?.url,
			date: item.createdAt,
			owner: { name: item.owner.name, id: item.owner.id },
		};
	});

	res.json({ audios });
};

export const getPublicProfile: RequestHandler = async (req, res) => {
	const { profileId } = req.params;
	if (isValidObjectId(profileId) === false) return res.status(422).json({ error: "Invalid profile id!" });

	const userProfile = await userModel.findById(profileId);

	if (userProfile === null) return res.status(404).json({ error: "User not found!" });

	const profile = {
		id: userProfile.id,
		name: userProfile.name,
		followers: userProfile.followers.length,
		followings: userProfile.followings.length,
		avatar: userProfile.avatarFile?.url,
	};
	res.json({ profile });
};

export const getPublicPlaylist: RequestHandler = async (req, res) => {
	const { pageNo = "0", limit = "20" } = req.query as TPaginationQuery;

	const { profileId } = req.params;
	if (isValidObjectId(profileId) === false) return res.status(422).json({ error: "Invalid profile id!" });

	const publicPlaylist = await playlistModel
		.find({
			owner: profileId,
			visibility: "Public",
		})
		.skip(parseInt(limit) * parseInt(pageNo))
		.limit(parseInt(limit))
		.sort("-CreatedAt");

	if (publicPlaylist === null) return res.json({ playlist: [] });

	const playlist = publicPlaylist.map((eachPlaylist) => {
		return {
			id: eachPlaylist._id,
			title: eachPlaylist.title,
			itemsCount: eachPlaylist.items.length,
			visibility: eachPlaylist.visibility,
		};
	});

	res.json({ playlist });
};

export const getRecommendProfile: RequestHandler = async (req, res) => {
	const user = req.user;
	let matchOptions: PipelineStage.Match = { $match: { _id: { $exists: true } } };
	if (user !== undefined) {
		const usersPreviousHistory = await historyModel.aggregate([
			{ $match: { owner: user.id } },
			{ $unwind: "$all" },
			{ $match: { "all.date": { $gte: moment().subtract(30, "days").toDate() } } },
			{ $group: { _id: "$all.audio" } },
			{ $lookup: { from: "audios", localField: "_id", foreignField: "_id", as: "audioData" } },
			{ $unwind: "$audioData" },
			{ $group: { _id: null, category: { $addToSet: "$audioData.category" } } },
		]);
		const categories = usersPreviousHistory[0].category;
		if (categories.length) {
			matchOptions = { $match: { category: { $in: categories } } };
		}
	}

	const audios = await audioModel.aggregate([
		matchOptions,
		{ $sort: { "likes.count": -1 } },
		{ $limit: 10 },
		{
			$lookup: {
				from: "users",
				localField: "owner",
				foreignField: "_id",
				as: "owner",
			},
		},
		{ $unwind: "$owner" },
		{
			$project: {
				_id: 0,
				id: "$_id",
				title: "$title",
				category: "$category",
				about: "$about",
				file: "$file.url",
				poster: "$poster.url",
				owner: { name: "$owner.name", id: "$owner.id" },
			},
		},
	]);

	res.json({ audios });
};
