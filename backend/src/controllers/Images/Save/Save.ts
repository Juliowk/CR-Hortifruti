import { ObjectId } from "mongodb";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
  IImage,
} from "../../protocols.js";
import { ISaveImageRepository } from "./protocols.js";

export class SaveImageController implements IController {
  constructor(private readonly repository: ISaveImageRepository) {}
  async handle(
    httpRequest: HttpRequest<IImage>
  ): Promise<HttpResponse<string | ObjectId>> {
    try {
      if (!httpRequest.file) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: `Request error: file not sent or invalid.`,
        };
      }

      const { filename, path } = httpRequest.file;

      if (!filename || !path) {
        return {
          statusCode: HttpStatusCode.BAD_REQUEST,
          body: `Request error`,
        };
      }

      const fileName = await this.repository.saveImage({ filename, path });

      return {
        statusCode: HttpStatusCode.OK,
        body: fileName,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Erro: ${error}`,
      };
    }
  }
}
