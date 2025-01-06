import { z } from "zod";
import {
  bodySchema,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols.js";
import { IUpdateParams, IUpdateRepository } from "./protocols.js";

export class UpdateController implements IController {
  constructor(private readonly repository: IUpdateRepository) {}

  async handle(
    httpRequest: HttpRequest<IUpdateParams>
  ): Promise<HttpResponse<string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id not provided",
        };
      }

      if (!body) {
        return {
          statusCode: 400,
          body: "Body not provided",
        };
      }

      const { name, price } = body;

      bodySchema.parse(body);

      await this.repository.update(id, { name, price });

      return {
        statusCode: 200,
        body: "Updated successfully",
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((e) => `${e.message}`)
          .join(" | ");

        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: `${errorMessages}`,
        };
      }
      
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Error: ${error}`,
      };
    }
  }
}
