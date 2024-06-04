import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const { genSalt, hash, compare } = bcrypt;
const { sign } = jsonwebtoken;

export async function encryptPassword(password: string) {
  const salt = await genSalt(10);
  const secPassword = await hash(password, salt);
  return secPassword;
}

export async function isCorrectPassword(
  userPassword: string,
  orgPassword: string
) {
  const passwordMatches = await compare(userPassword, orgPassword);
  return passwordMatches;
}

export async function getAuthToken(data: any) {
  const token = sign(data, JWT_SECRET);
  return token;
}
