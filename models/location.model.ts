import { Schema, model, Types } from "mongoose";

export type Location = {
  animalId: Types.ObjectId;
  lat: number;
  lng: number;
  isDisplayed?: boolean;
};

const locationSchema = new Schema<Location>(
  {
    animalId: { type: Schema.Types.ObjectId, ref: "animal", required: true },

    lat: { type: Number, required: true },

    lng: { type: Number, required: true },

    isDisplayed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("location", locationSchema);
