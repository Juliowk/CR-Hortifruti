import { z } from "zod";

import Product from "../../../models/Product.js";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols.js";
import { IcreateRepository, IParams } from "./protocols.js";

const bodySchema = z.object({
  name: z.string().min(3, "O nome do produto deve ter no minimo 3 caracteres!"),
  price: z.number().min(0.1, "O preço deve ser maior que zero"),
});

export class CreateProductController implements IController {
  constructor(private readonly repository: IcreateRepository) {}

  async handle(
    httpRequest: HttpRequest<IParams>
  ): Promise<HttpResponse<Product | string>> {
    try {
      bodySchema.parse(httpRequest.body);
      const product = await this.repository.create(httpRequest.body!);

      return {
        statusCode: HttpStatusCode.CREATED,
        body: product,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((e) => `${e.message}`)
          .join(" | ");

        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: errorMessages,
        };
      }

      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Unable to add product ${error}`,
      };
    }
  }
}
