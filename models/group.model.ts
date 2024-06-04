import { Schema, model, Types } from "mongoose";

export type Group = {
  userId: Types.ObjectId;
  name: string;
  allowedDist: number;
};

const groupSchema = new Schema<Group>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },

    name: { type: String, required: true },

    allowedDist: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model("group", groupSchema);
