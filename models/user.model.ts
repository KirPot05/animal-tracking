import { Schema, model } from "mongoose";

export type User = {
  email: string;
  userName: string;
  password: string;
  expoPushToken: string;
  verified: boolean;
};

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, uniqe: true },

    userName: { type: String, uniqe: true },

    password: { type: String, required: true },

    expoPushToken: {
      type: String,
      default: "",
    },

    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("user", userSchema);
