import Product from "../../../models/Product";

export interface IParams {
    name: string;
}

export interface IcreateRepository {
    create(params:IParams): Promise<Product>
}