import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols.js";
import { IDeleteRespository } from "./protocols.js";

export class DeleteProductController implements IController {
  constructor(private readonly repository: IDeleteRespository) {}
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<void | string>> {
    try {
      if (!httpRequest.params.id) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: "Id not provided.",
        };
      }
      await this.repository.delete(httpRequest.params.id);
      return {
        statusCode: HttpStatusCode.OK,
        body: "Deleted successfully.",
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: "An error occurred while deleting." + error,
      };
    }
  }
}
