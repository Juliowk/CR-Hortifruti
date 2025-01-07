import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols.js";
import { IDeleteImageRepository } from "./protocols.js";

export class DeleteImageController implements IController { 
  constructor(private readonly repository: IDeleteImageRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<string>> {
    try {
      if (!httpRequest.params.id) throw new Error("Id not provided");
      await this.repository.deleteImage(httpRequest.params.id);
      return {
        statusCode: HttpStatusCode.OK,
        body: `Deleted successfully.`,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Internal error while deleting image ${error}`,
      };
    }
  }
}
