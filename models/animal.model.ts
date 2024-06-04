import { Schema, model, Types } from "mongoose";

export type Animal = {
  userId: Types.ObjectId;
  name: string;
  animalTypeId: Types.ObjectId;
  groupId: Types.ObjectId;
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
  },
  { timestamps: true }
);

export default model("animal", animalSchema);
