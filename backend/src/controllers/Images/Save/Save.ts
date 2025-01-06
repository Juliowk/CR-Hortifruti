import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IController,
} from "../../protocols.js";
import { IImage, ISaveImageRepository } from "./protocols.js";

export class SaveImageController implements IController {
  constructor(private readonly repository: ISaveImageRepository) {}
  async handle(
    httpRequest: HttpRequest<IImage>
  ): Promise<HttpResponse<string>> {
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
      await this.repository.saveImage({ filename, path });

      return {
        statusCode: HttpStatusCode.OK,
        body: "Image saved successfully!",
      };

    } catch (error) {
      return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: `Erro: ${error}`,
      };
    }
  }
}
