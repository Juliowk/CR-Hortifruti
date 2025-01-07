import {
  IImage,
  ISaveImageRepository,
} from "../../controllers/Images/Save/protocols.js";
import { MongoConnect } from "../../database/Mongo.js";

export class SaveImageRepository implements ISaveImageRepository {
  async saveImage(imageData: IImage): Promise<void> {
    await MongoConnect.db.collection("images").insertOne( imageData );
  }
}
