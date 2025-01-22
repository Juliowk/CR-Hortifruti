import { Router } from "express";

import { CreateUserRepository } from "../repositorys/Users/Create/Create.js";
import { CreateUserController } from "../controllers/Users/Create/createUser.js";

import { GetUsersController } from "../controllers/Users/Get/getUsers.js";
import { GetUsersRepository } from "../repositorys/Users/Get/Get.js";

import { LoginRepository } from "../repositorys/Users/Login/Login.js";
import { LoginController } from "../controllers/Users/Login/Login.js";

import { AuthMiddleware } from "../middlewares/Auth.js";

const routerUser = Router();

routerUser.post("/", AuthMiddleware, async (req, res) => {
  const repository = new CreateUserRepository();
  const controller = new CreateUserController(repository);
  const { statusCode, body } = await controller.handle(req);
  res.status(statusCode).json(body);
});

routerUser.get("/", AuthMiddleware, async (req, res) => {
  const repository = new GetUsersRepository();
  const controller = new GetUsersController(repository);
  const { statusCode, body } = await controller.handle();
  res.status(statusCode).json(body);
});

routerUser.post("/login", async (req, res) => {
  const repository = new LoginRepository();
  const controller = new LoginController(repository);
  const { statusCode, body } = await controller.handle(req);
  res.status(statusCode).json(body);
});

export default routerUser;
