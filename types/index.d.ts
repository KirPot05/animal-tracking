import { Request } from "express";
import { Types } from "mongoose";

type CustomRequest = Request & {
  userId?: string;
  role?: string;
};
