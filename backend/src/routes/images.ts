import { Router } from "express";
import upload from "../config/multer.js";
import { SaveImageRepository } from "../repositorys/Images/Save.js";
import { SaveImageController } from "../controllers/Images/Save/Save.js";

const routerUploads = Router();

routerUploads.post("/", upload.single("image"), async (req, res) => {
  const repository = new SaveImageRepository();
  const controller = new SaveImageController(repository);

  const httpRequest = { file: req.file };

  const { statusCode, body } = await controller.handle(httpRequest);

  res.status(statusCode).json({ body });
});

export default routerUploads;
