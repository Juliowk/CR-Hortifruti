import { IGetImageRepository } from "../../controllers/Images/Get/protocols.js";
import { IImage } from "../../controllers/protocols.js";
import { MongoConnect } from "../../database/Mongo.js";

export class GetImageRepository implements IGetImageRepository {
  async getImage(): Promise<IImage[]> {
    const images = await MongoConnect.db
      .collection<IImage>("images")
      .find({})
      .toArray();
    return images;
  }
}
