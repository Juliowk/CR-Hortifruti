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
      if (!httpRequest.params.id) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Id not provided",
        };
      }

      if (!httpRequest.body) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Body not provided",
        };
      }

      const { name, price } = httpRequest.body;

      bodySchema.parse(httpRequest.body);

      await this.repository.update(httpRequest.params.id, { name, price });

      return {
        statusCode: HttpStatusCode.OK,
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
