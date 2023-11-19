import cron from "node-cron";
import { audioModel, autoPlaylistModel } from "../models";

export const generateAutoPlaylist = async () => {
	const result = await audioModel.aggregate([
		{ $sort: { likes: -1 } },
		{ $sample: { size: 20 } },
		{ $group: { _id: "$category", audios: { $push: "$$ROOT._id" } } },
	]);

	result.map(async (item) => {
		await autoPlaylistModel.updateOne({ title: item._id }, { $set: { items: item.audios } }, { upsert: true });
	});
};

cron.schedule("0 0 0 * * *", async () => {
	//Run on every 24 hours
	await generateAutoPlaylist();
});
