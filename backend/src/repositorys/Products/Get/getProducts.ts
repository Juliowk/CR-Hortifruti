import { IGetProductsRepository } from "../../../controllers/Products/Get/protocols";
import { MongoConnect } from "../../../database/Mongo";
import Product from "../../../models/Product";

export class GetProductsrepository implements IGetProductsRepository {
  async getProducts(): Promise<Product[]> {
    const products = await MongoConnect.db
      .collection<Product>("products")
      .find({})
      .toArray();
    return products;
  }
}
