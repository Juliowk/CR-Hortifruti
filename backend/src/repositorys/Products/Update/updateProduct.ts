import { ObjectId } from "mongodb";
import {
  IUpdateParams,
  IUpdateRepository,
} from "../../../controllers/Products/Update/protocols.js";
import { MongoConnect } from "../../../database/Mongo.js";

export class UpdateRepository implements IUpdateRepository {
  async update(id: string, params: IUpdateParams): Promise<void> {
    try {
      const product = await MongoConnect.db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });

      if (!product) throw new Error("Product not registered");

      const updated = await MongoConnect.db
        .collection("products")
        .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

      if (updated.modifiedCount === 0)
        throw new Error("No document was updated.");

    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
