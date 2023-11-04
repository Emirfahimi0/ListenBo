import { Model, Schema, models } from "mongoose";
import { CATEGORIES } from "../constant";

const AudioSchema = new Schema<IAudioDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      ref: "User",
    },
    file: {
      type: String,
      url: String,
      publicId: String,
      required: true,
    },
    poster: {
      type: String,
      url: String,
      publicId: String,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: {
      type: String,
      enum: CATEGORIES,
      default: "Others",
    },
  },
  { timestamps: true }
);

export const audioModel: Model<IAudioDocument> =
  models.Audio || new Model("Audio", AudioSchema);
