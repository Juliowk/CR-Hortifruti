import { IImage } from "../../protocols.js";

export interface ISaveImageRepository {
  saveImage(imageData: IImage): Promise<string>;
}
