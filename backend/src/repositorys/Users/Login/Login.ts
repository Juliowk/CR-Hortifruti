import {
  ILoginRepository,
  UserReturnLogin,
} from "../../../controllers/Users/Login/protocols.js";
import { MongoConnect } from "../../../database/Mongo.js";

export class LoginRepository implements ILoginRepository {
  async returnUser(name: string): Promise<UserReturnLogin> {
    const user = await MongoConnect.db
      .collection<UserReturnLogin>("users")
      .findOne({ name: name });

    if (!user) throw new Error("User not found.");

    const validatedUser = {
      id: user._id,
      name: user.name,
      password: user.password,
    };
    
    return validatedUser;
  }
  async verifyUser(name: string): Promise<boolean> {
    const user = await MongoConnect.db
      .collection<UserReturnLogin>("users")
      .findOne({ name: name });

    if (!user) return false;

    return true;
  }
}
