import { Schema, model, Types } from "mongoose";

export type Breach = {
  animalId: Types.ObjectId;
  dist: number;
};

const breachSchema = new Schema<Breach>(
  {
    animalId: { type: Schema.Types.ObjectId, ref: "animal", required: true },

    dist: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model("breach", breachSchema);
