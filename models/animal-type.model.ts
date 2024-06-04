import { Schema, model } from "mongoose";

export type AnimalType = {
  name: string;
};

const animalTypeSchema = new Schema<AnimalType>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model("animalType", animalTypeSchema);
