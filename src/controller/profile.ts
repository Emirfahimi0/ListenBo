import { RequestHandler } from "express";
import { PipelineStage, Types, isValidObjectId } from "mongoose";
import { audioModel, autoPlaylistModel, historyModel, playlistModel, userModel } from "../models";
import moment from "moment";
import { handleUserPreviousHistory } from "../utils";

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
		const category = await handleUserPreviousHistory(req);
		if (category.length) {
			matchOptions = { $match: { category: { $in: category } } };
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

export const getAutoGeneratedPlaylist: RequestHandler = async (req, res) => {
	const title = "Mix 20";
	const [result] = await historyModel.aggregate([
		{ $match: { owner: req.user.id } },
		{ $unwind: "$all" },
		{ $group: { _id: "$all.audio", items: { $addToSet: "$all.audio" } } },
		{ $sample: { size: 20 } },
		{ $group: { _id: null, items: { $push: "$_id" } } },
	]);

	if (result) {
		await playlistModel.updateOne(
			{ owner: req.user.id, title },
			{ $set: { title, items: result.items, visibility: "auto" } },
			{ upsert: true },
		);
	}

	const category = await handleUserPreviousHistory(req);
	let matchOptions: PipelineStage.Match = { $match: { _id: { $exists: true } } };

	if (category.length) {
		matchOptions = { $match: { title: { $in: category } } };
	}

	const agpl = await autoPlaylistModel.aggregate([
		matchOptions,
		{ $sample: { size: 4 } },
		{ $project: { _id: 0, id: "$_id", title: "$title", itemsCount: { $size: "$items" } } },
	]);

	const playlist = await playlistModel.findOne({ owner: req.user.id, title });

	const finalResult = agpl.concat({ id: playlist?._id, title: playlist!.title, itemsCount: playlist!.items.length });

	res.json({ playlist: finalResult });
};

export const getFollowersProfile: RequestHandler = async (req, res) => {
	const { limit = "20", pageNo = "0" } = req.query as TPaginationQuery;
	const [result] = await userModel.aggregate([
		{ $match: { _id: req.user.id } },
		{ $project: { followers: { $slice: ["$followers", parseInt(pageNo) * parseInt(limit), parseInt(limit)] } } },
		{ $unwind: "$followers" },
		{ $lookup: { from: "users", localField: "followers", foreignField: "_id", as: "userInfo" } },
		{ $unwind: "$userInfo" },
		{
			$group: {
				_id: null,
				followers: {
					$push: { id: "$userInfo._id", name: "$userInfo.name", avatar: "$userInfo.avatarFile.url" },
				},
			},
		},
	]);
	if (result === null) return res.json({ followers: [] });

	res.json({ followers: result.followers });
};
export const getFollowingsProfile: RequestHandler = async (req, res) => {
	const { limit = "20", pageNo = "0" } = req.query as TPaginationQuery;
	const [result] = await userModel.aggregate([
		{ $match: { _id: req.user.id } },
		{ $project: { followings: { $slice: ["$followings", parseInt(pageNo) * parseInt(limit), parseInt(limit)] } } },
		{ $unwind: "$followings" },
		{ $lookup: { from: "users", localField: "followings", foreignField: "_id", as: "userInfo" } },
		{ $unwind: "$userInfo" },
		{
			$group: {
				_id: null,
				followings: {
					$push: { id: "$userInfo._id", name: "$userInfo.name", avatar: "$userInfo.avatarFile.url" },
				},
			},
		},
	]);
	if (result === null) return res.json({ followings: [] });

	res.json({ followings: result.followings });
};

export const getFollowersProfilePublic: RequestHandler = async (req, res) => {
	const { limit = "20", pageNo = "0" } = req.query as TPaginationQuery;
	const { profileId } = req.params;

	if (isValidObjectId(profileId) === false) return res.status(422).json({ error: "Invalid profile ID!" });
	const [result] = await userModel.aggregate([
		{ $match: { _id: new Types.ObjectId(profileId) } },
		{ $project: { followers: { $slice: ["$followers", parseInt(pageNo) * parseInt(limit), parseInt(limit)] } } },
		{ $unwind: "$followers" },
		{ $lookup: { from: "users", localField: "followers", foreignField: "_id", as: "userInfo" } },
		{ $unwind: "$userInfo" },
		{
			$group: {
				_id: null,
				followers: {
					$push: { id: "$userInfo._id", name: "$userInfo.name", avatar: "$userInfo.avatarFile.url" },
				},
			},
		},
	]);
	if (result === null) return res.json({ followers: [] });

	res.json({ followers: result.followers });
};
