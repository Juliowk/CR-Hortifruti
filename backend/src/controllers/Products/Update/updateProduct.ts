import { HttpRequest, HttpResponse, IController } from "../../protocols.js";
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

      const { name } = body;

      if (!name) {
        return {
          statusCode: 400,
          body: "Name not provided",
        };
      }

      await this.repository.update(id, { name });

      return {
        statusCode: 200,
        body: "Updated successfully",
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }
}
