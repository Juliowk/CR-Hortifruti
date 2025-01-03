import { HttpResponse, HttpStatusCode, IController } from "../../protocols";
import { IGetProductsRepository } from "./protocols";

export class GetProductsController implements IController {
  constructor(private readonly repository: IGetProductsRepository) {}

  async handle(): Promise<HttpResponse<unknown | string>> {
    try {
      const users = await this.repository.getProducts();
      return {
        statusCode: HttpStatusCode.OK,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: "Error returning products" + error,
      };
    }
  }
}
