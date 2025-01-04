import Product from "../../../models/Product.js";

export interface IGetProductsRepository {
  getProducts(): Promise<Product[]>;
}