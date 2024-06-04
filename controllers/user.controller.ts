import { Request, Response } from "express";
import UserModel, { User } from "../models/user.model";
import { failed_response, success_response } from "../utils/response";
import { z } from "zod";
import {
  encryptPassword,
  generateRandomUsername,
  getAuthToken,
  isCorrectPassword,
} from "../utils/password";

export async function userLogin(req: Request, res: Response) {
  const credentials = z.object({
    email: z.string().min(1, "Email is a required parameter").email(),
    password: z
      .string()
      .min(6, "Enter a valid password with atleast six characters"),
  });

  let result = {};

  try {
    const creds = credentials.parse(req.body);

    const user = await UserModel.findOne({ email: creds.email });
    if (user === null) {
      result = failed_response("User not found");
      return res.status(404).json(result);
    }

    const passwordMatches = await isCorrectPassword(
      creds.password,
      user.password
    );

    if (!passwordMatches) {
      result = failed_response("Enter a valid password");
      return res.status(403).json(result);
    }

    const authToken = await getAuthToken(user.id);
    result = success_response("Login successful", {
      authToken,
    });

    return res.status(200).json(result);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: "Error in user login" });
  }
}

export async function createUser(req: Request, res: Response) {
  const userFields = z.object({
    name: z.string().min(3, "Name is a required"),
    email: z.string().min(1, "Email is a required parameter").email(),
    password: z
      .string()
      .min(6, "Enter a valid password with atleast six characters"),
  });

  let result = {};

  try {
    const creds = userFields.parse(req.body);

    let user = await UserModel.findOne({ email: creds.email });
    if (user !== null) {
      result = failed_response("User already exists");
      return res.status(403).json(result);
    }

    const encryptedPassword = await encryptPassword(creds.password);

    let userName = creds.name.split(" ").join("_");

    let isValidUserName = await UserModel.findOne({ userName });

    while (isValidUserName != null) {
      userName = creds.name.split(" ").join("_") + generateRandomUsername(5);
      isValidUserName = await UserModel.findOne({ userName });
    }

    const userDetails: z.infer<typeof userFields> & { userName: string } = {
      name: creds.name,
      email: creds.email,
      password: encryptedPassword,
      userName,
    };

    user = await UserModel.create(userDetails);

    const authToken = await getAuthToken(user.id);
    result = success_response("User created successfully", authToken);

    return res.status(200).json(result);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: "Error in creating user" });
  }
}
