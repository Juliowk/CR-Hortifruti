import { ISaveImageRepository } from "../../controllers/Images/Save/protocols.js";
import { IImage } from "../../controllers/protocols.js";
import { MongoConnect } from "../../database/Mongo.js";

export class SaveImageRepository implements ISaveImageRepository {
  async saveImage(imageData: IImage): Promise<string> {
    const { insertedId } = await MongoConnect.db
      .collection("images")
      .insertOne(imageData);

    const imageObj = await MongoConnect.db
      .collection<IImage>("images")
      .findOne({ _id: insertedId });

    if (!imageObj) throw new Error("Image not saved");

    return imageObj.filename;
  }
}
