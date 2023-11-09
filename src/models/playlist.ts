import { Model, Schema, model, models } from "mongoose";
import { PLAYLIST_VISIBILITIES } from "../constant";

const playlistSchema = new Schema<IPlaylistDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    items: [{ type: Schema.Types.ObjectId, required: true, ref: "Audio" }],
    visibility: {
      type: String,
      enum: PLAYLIST_VISIBILITIES,
      default: "Public",
    },
  },
  { timestamps: true }
);

export const playlistModel: Model<IPlaylistDocument> =
  models.Playlist || model("Playlist", playlistSchema);
