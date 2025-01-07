import { IImage } from "../../protocols.js";

export interface IGetImageRepository {
    getImage(): Promise<IImage[]>
}