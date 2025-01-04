import { ObjectId } from "mongodb";
import {
  IUpdateParams,
  IUpdateRepository,
} from "../../../controllers/Products/Update/protocols";
import { MongoConnect } from "../../../database/Mongo";

export class UpdateRepository implements IUpdateRepository {
  async update(id: string, params: IUpdateParams): Promise<void> {
    try {
      const updated = await MongoConnect.db
        .collection("products")
        .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

      if (updated.modifiedCount === 0)
        throw new Error("No document was updated.");
      
    } catch (error) {
      throw new  Error(`Database update failed: ${error.message}`);
    }
  }
}
