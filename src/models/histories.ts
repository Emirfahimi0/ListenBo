import { Model, Schema, model, models } from 'mongoose';

const historiesSchema = new Schema<IHistoriesDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    all: [
      {
        audio: { type: Schema.Types.ObjectId, ref: 'Audio' },
        progess: Number,
        date: { type: Date, required: true },
      },
    ],
    last: {
      audio: { type: Schema.Types.ObjectId, ref: 'Audio' },
      progess: Number,
      date: { type: Date, required: true },
    },
  },
  { timestamps: true },
);

export const historyModel: Model<IHistoriesDocument> = models.History || model('History', historiesSchema);
