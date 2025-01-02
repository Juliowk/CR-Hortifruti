import Product from "../../../models/Product";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols";
import { IcreateRepository, IParams } from "./protocols";

export class CreateProductController implements IController {
  constructor(private readonly repository: IcreateRepository) {}

  async handle(
    httpRequest: HttpRequest<IParams>
  ): Promise<HttpResponse<Product | string>> {
    try {
      const { name } = httpRequest.body!;

      if (!name || typeof name !== "string") {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Invalid or missing 'name' parameter",
        };
      }

      const product = await this.repository.create(httpRequest.body!);

      return {
        statusCode: HttpStatusCode.CREATED,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: "Unable to add product" + error,
      };
    }
  }
}
