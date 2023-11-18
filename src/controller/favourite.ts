import { RequestHandler } from "express";
import { ObjectId, isValidObjectId } from "mongoose";
import { audioModel, favouriteModel } from "../models";

export const toggleFavorite: RequestHandler = async (req, res) => {
	const audioId = req.query.audioId as string;
	let status: "added" | "removed";

	if (isValidObjectId(audioId) === false) return res.status(422).json({ error: "Audio id is invalid!" });

	const audio = await audioModel.findById(audioId);
	if (audio === null) return res.status(404).json({ error: "Resources not found!" });

	const isExist = await favouriteModel.findOne({
		owner: req.user.id,
		items: audioId,
	});

	if (isExist !== null) {
		await favouriteModel.updateOne(
			{ owner: req.user.id },
			{
				$pull: { items: audioId },
			},
		);

		status = "removed";
	} else {
		const favorite = await favouriteModel.findOne({ owner: req.user.id });
		if (favorite !== null) {
			await favouriteModel.updateOne(
				{ owner: req.user.id },
				{
					$addToSet: { items: audioId },
				},
			);
		} else {
			await favouriteModel.create({ owner: req.user.id, items: [audioId] });
		}

		status = "added";
	}

	if (status === "added")
		await audioModel.findByIdAndUpdate(audioId, {
			$addToSet: { likes: req.user.id },
		});

	if (status === "removed")
		await audioModel.findByIdAndUpdate(audioId, {
			$pull: { likes: req.user.id },
		});

	res.json({ status });
};

export const getFavourites: RequestHandler = async (req, res) => {
	const userId = req.user.id;

	const { pageNo = "0", limit = "20" } = req.params as TPaginationQuery;

	const favourites = await favouriteModel.aggregate([
		{ $match: { $owner: userId } },
		{ $project: { audioIds: { $slice: ["$items", parseInt(limit) * parseInt(pageNo), parseInt(limit)] } } },
		{ $unwind: "$audioIds" },
		{ $lookup: { from: "audios", localField: "audioIds", foreignField: "_id", as: "audioInfo" } },
		{ $unwind: "$audioInfo" },
		{ $lookup: { from: "users", localField: "audioInfo.owner", foreignField: "_id", as: "ownerInfo" } },
		{ $unwind: "$ownerInfo" },
		{
			$project: {
				_id: 0,
				about: "$audioInfo.about",
				category: "$audioInfo.category",
				file: "$audioInfo.file.url",
				id: "$audioInfo",
				owner: { name: "$ownerInfo.name", id: "$ownerInfo._id" },
				poster: "$audioInfo.poster.url",
				title: "$audioInfo.title",
			},
		},
	]);

	res.json({ audios: favourites });
};

export const getIsFavourite: RequestHandler = async (req, res) => {
	const audioId = req.query.audioId;

	if (isValidObjectId(audioId) === false) return res.status(422).json({ error: "Invalid audio id!" });

	const isFavourite = await favouriteModel.findOne({
		ownerId: req.user.id,
		items: audioId,
	});
	res.json({ result: isFavourite !== null ? true : false });
};
