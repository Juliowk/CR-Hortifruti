import { HttpResponse, HttpStatusCode, IController, IImage } from "../../protocols.js";
import { IGetImageRepository } from "./protocols.js";

export class GetImageController implements IController {
    constructor(private readonly repository: IGetImageRepository){}
    async handle(): Promise<HttpResponse<IImage[] | string>> {
        try {
            const images = await this.repository.getImage();
            if (!images) throw new Error("Error retrieving images");
            return {
              statusCode: HttpStatusCode.OK,
              body: images,
            };
        } catch (error) {
            return {
              statusCode: HttpStatusCode.SERVER_ERROR,
              body: `Erro: ${error}`
            }
        }
    }

}