import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { MongoConnect } from "../database/Mongo.js";
import { ObjectId } from "mongodb";
import User from "../models/User.js";

type JwtPayload = {
  id: ObjectId;
};

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization = req.headers.authorization ?? null;
    if (!authorization) throw new Error("Unauthorized - authorization");

    const token = authorization.split(" ")[1];
    if (!token) throw new Error("Unauthorized - Token");

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;
    if (!id) throw new Error("Unauthorized - Id not found");

    const user = await MongoConnect.db
      .collection<User>("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) throw new Error("Unauthorized - User not found");

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json(error.message);
    }
  }
};
