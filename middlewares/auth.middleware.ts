import jwt from "jsonwebtoken";
import { failed_response } from "../utils/response";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";

type CustomRequest = Request & {
  userId: string;
};

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Fetching the authentication token from headers
  const token = req.header("Authorization")?.split(" ")[1];

  if (token === null || token === "" || token === undefined) {
    return res
      .status(403)
      .json(failed_response("Please authenticate using valid token"));
  }

  try {
    // User verification
    const userId = jwt.verify(token, JWT_SECRET) as string;
    // console.log(data);
    if (userId === undefined) {
      return res.status(403).json(failed_response("Unauthorized access"));
    }

    req.userId = userId;

    next();
  } catch (error) {
    return res
      .status(401)
      .json(
        failed_response(
          "Sorry but you are not authorized to access this resource",
          error
        )
      );
  }
};

export default authMiddleware;
