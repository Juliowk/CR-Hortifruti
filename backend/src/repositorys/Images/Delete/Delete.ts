import { ObjectId } from "mongodb";
import fs from "fs/promises";

import { IDeleteImageRepository } from "../../../controllers/Images/Delete/protocols.js";
import { MongoConnect } from "../../../database/Mongo.js";

export class DeleteImageRepository implements IDeleteImageRepository {
  async deleteImage(id: string): Promise<void> {
    const image = await MongoConnect.db
      .collection("images")
      .findOne({ _id: new ObjectId(id) });

    if (!image || !image.path)
      throw new Error(`Image not found or filePath missing`);

    try {
      await fs.unlink(image.path);
    } catch (error) {
      console.error(`Erro ao deletar arquivo local: ${error}`);
    }

    await MongoConnect.db
      .collection("images")
      .deleteOne({ _id: new ObjectId(id) });
  }
}
