import { IGetProductsRepository } from "../../../controllers/Products/Get/protocols.js";
import { MongoConnect } from "../../../database/Mongo.js";
import Product from "../../../models/Product.js";

export class GetProductsrepository implements IGetProductsRepository {
  async getProducts(): Promise<Product[]> {
    const products = await MongoConnect.db
      .collection<Product>("products")
      .find({})
      .toArray();
    return products;
  }
}
