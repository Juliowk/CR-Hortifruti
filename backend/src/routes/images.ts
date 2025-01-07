import { Router } from "express";
import upload from "../config/multer.js";
import { SaveImageRepository } from "../repositorys/Images/Save.js";
import { SaveImageController } from "../controllers/Images/Save/Save.js";
import { GetImageRepository } from "../repositorys/Images/Get.js";
import { GetImageController } from "../controllers/Images/Get/Get.js";
import { DeleteImageRepository } from "../repositorys/Images/Delete/Delete.js";
import { DeleteImageController } from "../controllers/Images/Delete/Delete.js";

const routerUploads = Router();

routerUploads.post("/", upload.single("image"), async (req, res) => {
  const repository = new SaveImageRepository();
  const controller = new SaveImageController(repository);

  const httpRequest = { file: req.file };

  const { statusCode, body } = await controller.handle(httpRequest);

  res.status(statusCode).json({ body });
});

routerUploads.get("/", async (req, res) => {
  const repository = new GetImageRepository();
  const controller = new GetImageController(repository);
  const { statusCode, body } = await controller.handle();
  res.status(statusCode).json(body);
});

routerUploads.delete("/:id", async (req, res) => {
  const repository = new DeleteImageRepository();
  const controller = new DeleteImageController(repository);
  const { statusCode, body } = await controller.handle(req);

  res.status(statusCode).json(body);
});

export default routerUploads;
