import { Model, Schema, model, models } from "mongoose";

const autoPlaylistSchema = new Schema<IAutoPlaylistDocument>(
	{
		title: {
			type: String,
			required: true,
		},
		items: [{ type: Schema.Types.ObjectId, required: true, ref: "Audio" }],
	},
	{ timestamps: true },
);

export const autoPlaylistModel: Model<IAutoPlaylistDocument> =
	models.AutoPlaylist || model("AutoPlaylist", autoPlaylistSchema);
