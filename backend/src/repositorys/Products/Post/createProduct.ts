import {
  IcreateRepository,
  IParams,
} from "../../../controllers/Products/Post/protocols.js";
import { MongoConnect } from "../../../database/Mongo.js";
import Product from "../../../models/Product.js";

export class CreateProductRepository implements IcreateRepository {
  async create(params: IParams): Promise<Product> {
    const { insertedId } = await MongoConnect.db
      .collection("products")
      .insertOne(params);
    const product = await MongoConnect.db
      .collection<Product>("products")
      .findOne({ _id: insertedId });

    if (!product) {
      throw new Error("Error creating product");
    }

    return product;
  }
}
