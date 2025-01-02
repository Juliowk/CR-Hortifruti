import { ObjectId } from "mongodb";
import { IDeleteRespository } from "../../../controllers/Products/Delete/protocols";
import { MongoConnect } from "../../../database/Mongo";

export class DeleteProductRepository implements IDeleteRespository {
  async delete(id: string): Promise<void> {
    const product = await MongoConnect.db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not found.");
    }

    const { deletedCount } = await MongoConnect.db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
        throw new Error("Product not deleted.");
    }
  }
}
