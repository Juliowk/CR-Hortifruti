import Product from "../../../models/Product.js";

export interface IParams {
  name: string;
  price: number;
}

export interface IcreateRepository {
  create(params: IParams): Promise<Product>;
}
