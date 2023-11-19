import { Model, Schema, model, models } from "mongoose";
import { CATEGORIES } from "../constant";

const AudioSchema = new Schema<IAudioDocument>(
	{
		title: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		about: {
			type: String,
			required: true,
		},
		file: {
			type: Object,
			url: String,
			publicId: String,
			required: true,
		},
		poster: {
			type: Object,
			url: String,
			publicId: String,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		category: {
			type: String,
			enum: CATEGORIES,
			default: "Others",
		},
	},
	{ timestamps: true },
);

export const audioModel: Model<IAudioDocument> = models.Audio || model("Audio", AudioSchema);
