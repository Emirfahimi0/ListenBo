import { Model, Schema, model, models } from "mongoose";

const favouriteSchema = new Schema<IFavouriteDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [{ type: Schema.Types.ObjectId, ref: "Audio" }],
  },
  { timestamps: true }
);

export const favouriteModel: Model<IFavouriteDocument> =
  models.Favourite || model("Favourite", favouriteSchema);
