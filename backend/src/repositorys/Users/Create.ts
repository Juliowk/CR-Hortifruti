import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import {
  ICreateUserRepository,
  IParamsCreateUser,
  UserReturn,
} from "../../controllers/Users/create/protocol.js";
import { MongoConnect } from "../../database/Mongo.js";
import User from "../../models/User.js";

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(params: IParamsCreateUser): Promise<UserReturn> {
    const encryptedPassword = bcrypt.hash(params.password, 10);

    const userParams = {
      ...params,
      password: encryptedPassword,
    };

    const { insertedId } = await MongoConnect.db
      .collection("users")
      .insertOne(userParams);

    const user = await MongoConnect.db
      .collection<User>("users")
      .findOne({ _id: new ObjectId(insertedId) });

    if (!user) throw new Error("User not created");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResult } = user;

    return userResult;
  }
}
