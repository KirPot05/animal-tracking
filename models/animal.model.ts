import { Schema, model, Types } from "mongoose";

export type Animal = {
  userId: Types.ObjectId;
  name: string;
  animalTypeId: Types.ObjectId;
  groupId: Types.ObjectId;
  active: boolean;
  loc_data?: {
    lat: number;
    lng: number;
  };
};

const animalSchema = new Schema<Animal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },

    name: { type: String, required: true },

    animalTypeId: {
      type: Schema.Types.ObjectId,
      ref: "animalType",
      required: true,
    },

    groupId: { type: Schema.Types.ObjectId, ref: "group" },
    active: { type: Boolean, default: true },

    loc_data: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

export default model("animal", animalSchema);
