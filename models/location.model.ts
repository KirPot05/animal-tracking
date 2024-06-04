import { Schema, model, Types } from "mongoose";

export type Location = {
  animalId: Types.ObjectId;
  lat: number;
  lng: number;
};

const locationSchema = new Schema<Location>(
  {
    animalId: { type: Schema.Types.ObjectId, ref: "animal", required: true },

    lat: { type: Number, required: true },

    lng: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model("location", locationSchema);
