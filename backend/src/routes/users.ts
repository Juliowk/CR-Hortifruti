import { Router } from "express";

import { CreateUserRepository } from "../repositorys/Users/Create/Create.js";
import { CreateUserController } from "../controllers/Users/create/createUser.js";

const routerUser = Router();

routerUser.post("/", async (req, res) => {
  const repository = new CreateUserRepository();
  const controller = new CreateUserController(repository);
  const { statusCode, body } = await controller.handle(req);
  res.status(statusCode).json(body);
});

export default routerUser;
