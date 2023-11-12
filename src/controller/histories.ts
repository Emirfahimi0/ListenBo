import { RequestHandler } from "express";
import { historyModel } from "../models";

export const updateHistory: RequestHandler = async (req, res) => {
	const { audio, progress, date } = req.body;
	const history: IHistoryContent = { audio, progress, date };

	const oldHistory = await historyModel.findOne({ owner: req.user.id });

	if (oldHistory === null) {
		await historyModel.create({
			owner: req.user.id,
			last: history,
			all: [history],
		});
		return res.json({ success: true });
	}

	const today = new Date();
	const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

	// Aggregation pipeline
	const histories = await historyModel.aggregate([
		{ $match: { owner: req.user.id } },
		{ $unwind: "$all" }, //flatten all history
		{
			$match: {
				"all.date": {
					$gte: startOfDay,
					$lt: endOfDay,
				},
			},
		},
		{
			$project: {
				_id: 0,
				audioId: "$all.audio",
			},
		},
	]);

	const sameDayHistory = histories.find(({ audioId }) => audioId.toString() === audio);

	if (sameDayHistory !== undefined) {
		await historyModel.findOneAndUpdate(
			{
				owner: req.user.id,
				"all.audio": audio,
			},
			{
				$set: {
					"all.$.progress": progress,
					"all.$.date": date,
				},
			},
		);
	} else {
		await historyModel.findByIdAndUpdate(oldHistory._id, {
			$push: { all: { $each: [history], $position: 0 } },
			$set: { last: history },
		});
	}
	res.json({ success: true });
};

export const removeHistory: RequestHandler = async (req, res) => {
	const removeAll = req.query.all === "yes";

	if (removeAll) {
		await historyModel.findOneAndDelete({ owner: req.user.id });
		return res.json({ success: true });
	}

	const histories = req.query.histories as string;
	const ids: string[] = JSON.parse(histories);

	await historyModel.findOneAndUpdate({ owner: req.user.id }, { $pull: { $all: { _id: ids } } });

	res.json({ success: true });
};

export const getAllHistories: RequestHandler = async (req, res) => {
	const { limit = "20", pageNo = "0" } = req.query as TPaginationQuery;

	const parseLimit = parseInt(limit) * parseInt(pageNo);

	const histories = await historyModel.aggregate([
		{ $match: { owner: req.user.id } },
		{ $project: { allHistories: { $slice: ["$all", parseLimit, parseInt(limit)] } } },
		{ $unwind: "$allHistories" },
		{
			$lookup: {
				from: "audios",
				localField: "allHistories.audio",
				foreignField: "_id",
				as: "audioInfo",
			},
		}, //https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/
		{
			$unwind: "$audioInfo",
		},
		{
			$project: {
				_id: 0,
				id: "$allHistories._id",
				audioId: "$audioInfo._id",
				date: "$allHistories.date",
				title: "$audioInfo.title",
			},
		},
		{
			$group: {
				_id: {
					$dateToString: { format: "%Y-%m-%d", date: "$date" },
				},
				audios: {
					$push: "$$ROOT", // make it an array from previous stage
				},
			},
		},
		{
			$project: {
				_id: 0,
				id: "$id",
				date: "$_id",
				audios: "$$ROOT.audios",
			},
		},
		{ $sort: { date: -1 } },
	]);

	res.json({ histories });
};
