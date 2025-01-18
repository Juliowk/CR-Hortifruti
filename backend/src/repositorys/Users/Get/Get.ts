import { IGetUsersRepository } from "../../../controllers/Users/Get/protocols.js";
import { MongoConnect } from "../../../database/Mongo.js";
import User from "../../../models/User.js";

export class GetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoConnect.db.collection<User>("users").find().toArray();
    return users;
  }
}
