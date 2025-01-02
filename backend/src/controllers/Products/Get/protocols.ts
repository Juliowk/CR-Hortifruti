import Product from "../../../models/Product";

export interface IGetProductsRepository {
  getProducts(): Promise<Product[]>;
}